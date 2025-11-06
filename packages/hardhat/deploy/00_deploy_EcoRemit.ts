import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys the EcoRemit contract and a MockUSDT on local/test networks.
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployEcoRemit: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment,
) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;
  const network = hre.network.name;

  let usdtTokenAddress: string;
  
  // Wallets for fees.
  // TODO: Update these to your production fee wallets before mainnet deploy!
  const platformFeeWallet = deployer;
  const carbonOffsetWallet = deployer;

  console.log(`\nDeploying EcoRemit to ${network}...`);
  console.log(`  > Deployer: ${deployer}`);

  // --- Handle USDT Token Address ---
  if (network === "avalancheLocal" || network === "avalancheFuji") {
    // On local or Fuji, deploy a Mock USDT for testing
    console.log(`  > Deploying MockUSDT for ${network}...`);
    const mockUSDT = await deploy("MockUSDT", {
      from: deployer,
      log: true,
      autoMine: true,
      args: ["Mock USDT", "mUSDT"], // Constructor args for MockUSDT
    });
    usdtTokenAddress = mockUSDT.address;
    console.log(`  > MockUSDT deployed to: ${usdtTokenAddress}`);

    // Optional: Mint some mock USDT to the deployer for testing
    const mockContract = await hre.ethers.getContract<Contract>("MockUSDT", deployer);
    // Mint 1,000,000 mUSDT (adjusting for 18 decimals)
    const initialMintAmount = hre.ethers.parseUnits("1000000", 18);
    await mockContract.mint("0x8829b4291D97f86AB592742EeF98e742E5220015", initialMintAmount);
    console.log(`  > Minted 1,000,000 mUSDT to your wallet`);

  } else if (network === "avalanche") {
    // On Avalanche Mainnet, use the official USDT.e contract address
    usdtTokenAddress = "0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7";
    console.log(`  > Using Mainnet USDT.e at: ${usdtTokenAddress}`);
    console.warn("  > WARNING: Using deployer as fee wallet. UPDATE THIS!");

  } else {
    throw new Error(`Network ${network} not configured in deploy script!`);
  }

  // --- Deploy EcoRemit Contract ---
  console.log(`\n  > Deploying EcoRemit...`);
  const constructorArgs = [
    usdtTokenAddress,
    platformFeeWallet,
    carbonOffsetWallet,
  ];

  await deploy("EcoRemit", {
    from: deployer,
    args: constructorArgs,
    log: true,
    autoMine: true,
  });

  // Get the deployed contract to interact with it after deploying.
  const ecoRemit = await hre.ethers.getContract<Contract>("EcoRemit", deployer);
  console.log(
    "\n✅ EcoRemit Deployed Successfully!"
  );
  console.log(
    `  > USDT Token: ${await ecoRemit.usdtToken()}`
  );
  console.log(
    `  > Platform Wallet: ${await ecoRemit.platformFeeWallet()}`
  );
  console.log(
    `  > Carbon Wallet: ${await ecoRemit.carbonOffsetWallet()}`
  );
};

export default deployEcoRemit;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags EcoRemit
deployEcoRemit.tags = ["EcoRemit"];