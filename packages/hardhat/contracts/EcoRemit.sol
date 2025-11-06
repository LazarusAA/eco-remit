//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// For USDT (ERC20) interactions
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// For administrative controls (e.g., updating fees)
import "@openzeppelin/contracts/access/Ownable.sol";
// To prevent re-entrancy attacks on the sendRemittance function
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
// For local testing and debugging
import "hardhat/console.sol";

/**
 * @title EcoRemit
 * @author Lazarus
 * @notice A secure and gas-efficient smart contract for processing sustainable remittances.
 * @dev This contract facilitates peer-to-peer payments using USDT (or any ERC20)
 * while automatically splitting off platform and carbon offset fees.
 * It inherits from Ownable for admin controls and ReentrancyGuard for security.
 */
contract EcoRemit is Ownable, ReentrancyGuard {
    // --- State Variables ---

    /// @notice The ERC20 token contract used for remittances (e.g., USDT).
    IERC20 public immutable usdtToken;

    /// @notice The wallet address that receives platform fees.
    address public platformFeeWallet;

    /// @notice The wallet address that receives carbon offset fees.
    address public carbonOffsetWallet;

    /// @notice The platform fee in basis points (e.g., 100 = 1.00%).
    uint256 public platformFeePercent;

    /// @notice The carbon offset fee in basis points (e.g., 50 = 0.50%).
    uint256 public carbonOffsetFeePercent;

    /// @notice The denominator for all fee calculations (100.00%).
    uint256 public constant FEE_BASIS = 10000;

    // --- Events ---

    /**
     * @notice Emitted when a remittance is successfully processed and distributed.
     * @param from The user (msg.sender) who initiated the remittance.
     * @param to The final recipient of the funds.
     * @param amountSent The net amount sent to the recipient.
     * @param platformFee The fee amount sent to the platform wallet.
     * @param carbonOffsetFee The fee amount sent to the carbon offset wallet.
     */
    event RemittanceSent(
        address indexed from,
        address indexed to,
        uint256 amountSent,
        uint256 platformFee,
        uint256 carbonOffsetFee
    );

    /**
     * @notice Emitted when fee percentages are updated by the owner.
     * @param newPlatformFeePercent The new platform fee in basis points.
     * @param newCarbonOffsetFeePercent The new carbon offset fee in basis points.
     */
    event FeesUpdated(
        uint256 newPlatformFeePercent,
        uint256 newCarbonOffsetFeePercent
    );

    /**
     * @notice Emitted when fee collection wallets are updated by the owner.
     * @param newPlatformFeeWallet The new address for the platform wallet.
     * @param newCarbonOffsetWallet The new address for the carbon offset wallet.
     */
    event WalletsUpdated(
        address newPlatformFeeWallet,
        address newCarbonOffsetWallet
    );

    // --- Constructor ---

    /**
     * @notice Initializes the contract with token and wallet addresses, and sets default fees.
     * @param _usdtTokenAddress The address of the USDT (or equivalent) ERC20 token contract.
     * @param _platformFeeWallet The address to receive platform fees.
     * @param _carbonOffsetWallet The address to receive carbon offset fees.
     */
    constructor(
        address _usdtTokenAddress,
        address _platformFeeWallet,
        address _carbonOffsetWallet
    ) Ownable(msg.sender) {
        // Input validation
        require(
            _usdtTokenAddress != address(0),
            "EcoRemit: USDT address cannot be zero"
        );
        require(
            _platformFeeWallet != address(0),
            "EcoRemit: Platform wallet cannot be zero"
        );
        require(
            _carbonOffsetWallet != address(0),
            "EcoRemit: Offset wallet cannot be zero"
        );

        // Set immutable token address
        usdtToken = IERC20(_usdtTokenAddress);

        // Set fee wallets
        platformFeeWallet = _platformFeeWallet;
        carbonOffsetWallet = _carbonOffsetWallet;

        // Set default fees
        platformFeePercent = 100; // 1.00%
        carbonOffsetFeePercent = 50; // 0.50%

        // Emit events for initial state
        emit WalletsUpdated(_platformFeeWallet, _carbonOffsetWallet);
        emit FeesUpdated(platformFeePercent, carbonOffsetFeePercent);
    }

    // --- Core Logic ---

    /**
     * @notice Processes a remittance payment from a user (msg.sender) to a recipient.
     * @dev The caller (msg.sender) MUST have approved this contract to spend
     * at least the (amount + fees) in USDT tokens *before* calling this function.
     * The `_amount` parameter is the net value the recipient will receive.
     * This function is protected against re-entrancy attacks.
     * @param _recipient The address of the final remittance recipient.
     * @param _amount The net amount of USDT the recipient should receive.
     */
    function sendRemittance(
        address _recipient,
        uint256 _amount
    ) public nonReentrant {
        // 1. Validate inputs
        require(
            _recipient != address(0),
            "EcoRemit: Recipient cannot be zero address"
        );
        require(_amount > 0, "EcoRemit: Amount must be greater than zero");

        // 2. Calculate fees based on the net amount
        (uint256 platformFee, uint256 carbonOffsetFee) = _calculateFees(
            _amount
        );

        // 3. Calculate the total amount to charge the user
        uint256 totalCharge = _amount + platformFee + carbonOffsetFee;
        
        console.log("EcoRemit: Sending %s USDT", totalCharge);
        console.log("  -> To Recipient: %s USDT", _amount);
        console.log("  -> To Platform: %s USDT", platformFee);
        console.log("  -> To Offset: %s USDT", carbonOffsetFee);

        // 4. Pull the total USDT from the user (msg.sender) to this contract
        // This requires the user to have approved the contract first.
        bool success = usdtToken.transferFrom(
            msg.sender,
            address(this),
            totalCharge
        );
        require(
            success,
            "EcoRemit: USDT transferFrom failed. Check allowance."
        );

        // 5. Distribute the funds from this contract
        // Since the contract now holds the tokens, we use `transfer`.

        // Send to recipient
        bool recipientSuccess = usdtToken.transfer(_recipient, _amount);
        require(recipientSuccess, "EcoRemit: Transfer to recipient failed");

        // Send to platform
        bool platformSuccess = usdtToken.transfer(
            platformFeeWallet,
            platformFee
        );
        require(recipientSuccess, "EcoRemit: Transfer to platform wallet failed");

        // Send to carbon offset
        bool offsetSuccess = usdtToken.transfer(
            carbonOffsetWallet,
            carbonOffsetFee
        );
        require(offsetSuccess, "EcoRemit: Transfer to offset wallet failed");

        // 6. Emit the event
        emit RemittanceSent(
            msg.sender,
            _recipient,
            _amount,
            platformFee,
            carbonOffsetFee
        );
    }

    // --- Helper Functions ---

    /**
     * @notice Internal helper function to calculate fees.
     * @param _amount The base amount to calculate fees from.
     * @return platformFee The calculated platform fee.
     * @return carbonOffsetFee The calculated carbon offset fee.
     */
    function _calculateFees(
        uint256 _amount
    ) internal view returns (uint256, uint256) {
        uint256 platformFee = (_amount * platformFeePercent) / FEE_BASIS;
        uint256 carbonOffsetFee = (_amount * carbonOffsetFeePercent) / FEE_BASIS;
        return (platformFee, carbonOffsetFee);
    }

    // --- Admin Functions ---

    /**
     * @notice Updates the fee percentages for platform and carbon offsets.
     * @dev Only the owner can call this function.
     * @param _newPlatformFeePercent The new platform fee in basis points.
     * @param _newCarbonOffsetFeePercent The new carbon offset fee in basis points.
     */
    function setFeePercentages(
        uint256 _newPlatformFeePercent,
        uint256 _newCarbonOffsetFeePercent
    ) public onlyOwner {
        // Safety check: e.g., ensure total fees don't exceed 20% (2000 basis points)
        require(
            _newPlatformFeePercent + _newCarbonOffsetFeePercent <= 2000,
            "EcoRemit: Total fees cannot exceed 20%"
        );

        platformFeePercent = _newPlatformFeePercent;
        carbonOffsetFeePercent = _newCarbonOffsetFeePercent;

        emit FeesUpdated(_newPlatformFeePercent, _newCarbonOffsetFeePercent);
    }

    /**
     * @notice Updates the wallet addresses for fee collection.
     * @dev Only the owner can call this function.
     * @param _newPlatformWallet The new address for the platform fee wallet.
     * @param _newCarbonOffsetWallet The new address for the carbon offset fee wallet.
     */
    function setFeeWallets(
        address _newPlatformWallet,
        address _newCarbonOffsetWallet
    ) public onlyOwner {
        require(
            _newPlatformWallet != address(0),
            "EcoRemit: Platform wallet cannot be zero"
        );
        require(
            _newCarbonOffsetWallet != address(0),
            "EcoRemit: Offset wallet cannot be zero"
        );

        platformFeeWallet = _newPlatformWallet;
        carbonOffsetWallet = _newCarbonOffsetWallet;

        emit WalletsUpdated(_newPlatformWallet, _newCarbonOffsetWallet);
    }

    /**
     * @notice Allows the owner to withdraw any native AVAX (ETH)
     * accidentally sent to this contract.
     */
    function withdrawAVAX() public onlyOwner {
        (bool success, ) = owner().call{value: address(this).balance}("");
        require(success, "EcoRemit: Failed to withdraw native currency");
    }

    /**
     * @notice Allows the owner to rescue any ERC20 tokens
     * accidentally sent to this contract's address.
     * @dev Do NOT use this for the primary `usdtToken` unless in an emergency.
     * @param _tokenAddress The address of the ERC20 token to rescue.
     */
    function withdrawTokens(IERC20 _tokenAddress) public onlyOwner {
        uint256 balance = _tokenAddress.balanceOf(address(this));
        require(balance > 0, "EcoRemit: No tokens to withdraw");

        bool success = _tokenAddress.transfer(owner(), balance);
        require(success, "EcoRemit: Failed to withdraw tokens");
    }
}