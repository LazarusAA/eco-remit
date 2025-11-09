# Avalanche Automata 🔄

**The no-code platform for automating on-chain actions, turning complex smart contract interactions into simple, visual workflows.**

Built on [Scaffold-ETH 2](https://scaffoldeth.io) with [Tether WDK](https://docs.wallet.tether.io/) wallet integration, running on Avalanche C-Chain. Create powerful blockchain automation workflows with a drag-and-drop interface—no coding required.

---

## ✨ Key Features

- **Visual Workflow Builder**: Drag-and-drop nodes to create complex on-chain automation
- **AI-Powered Routing**: Use Gemini AI to make intelligent decisions in your workflows
- **Gasless Transactions**: EIP-712 meta-transactions for seamless USDT transfers
- **NFT Automation**: Mint loyalty badges and NFTs automatically based on conditions
- **Secure WDK Wallet**: Encrypted seed phrase storage with IndexedDB and WebCrypto (AES-GCM)
- **Multi-Network Support**: Local development, Fuji Testnet, and Mainnet

---

## 📱 For End Users

### What is Avalanche Automata?

Avalanche Automata transforms blockchain interactions into visual workflows. Instead of writing code, you connect pre-built nodes to create automation:

1. **Trigger** your workflow with on-chain events
2. **Route** execution using AI-powered logic
3. **Execute** actions like sending USDT or minting NFTs

### Available Nodes

#### Triggers
- **On-Chain Event**: Starts your workflow when a blockchain event occurs

#### Logic
- **AI Decision**: Uses Gemini AI to analyze data and route workflow (TRUE/FALSE)

#### Actions
- **Send USDT**: Transfers USDT tokens to an address (gasless via meta-transactions)
- **Mint NFT**: Creates a loyalty badge NFT for a recipient

### Creating Your First Workflow

1. Navigate to the **Automata** page (`/automata`)
2. Drag nodes from the sidebar onto the canvas
3. Connect nodes by dragging from output handles to input handles
4. Click on nodes to configure them in the right panel
5. Use the **Test Run** button to simulate your workflow
6. Click **Demo Mode** badge to see example workflows

### Demo Mode

Click the "🚀 Demo Mode" badge in the top-right corner to load pre-configured example workflows and learn how the platform works.

---

## 🛠️ For Developers

### Tech Stack

- **Frontend**: Next.js 15 (App Router) + ReactFlow for visual workflow editor
- **Smart Contracts**: Solidity 0.8.24 with Hardhat
  - `AutomataUsdt`: EIP-712 gasless USDT transfers with meta-transactions
  - `LoyaltyBadge`: ERC721 NFTs for loyalty and achievements
  - `MockUSDT`: ERC20 token for testing (6 decimals)
- **Wallet**: Tether WDK with encrypted seed vault
- **AI**: Google Gemini 2.5 Flash for decision logic
- **Blockchain**: Avalanche C-Chain (Local/Fuji/Mainnet)

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Workflow UI  │  │  WDK Wallet  │  │ Config Panel │      │
│  │ (ReactFlow)  │  │   Manager    │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                      API Routes                              │
│  ┌──────────────┐           ┌──────────────┐               │
│  │  /api/relay  │           │/api/ai-decision               │
│  │   (Relayer)  │           │  (Gemini AI)  │               │
│  └──────────────┘           └──────────────┘               │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│              Smart Contracts (Avalanche)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │AutomataUsdt │  │ LoyaltyBadge │  │  MockUSDT    │      │
│  │  (EIP-712)   │  │   (ERC721)   │  │  (ERC20)     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

### Directory Structure

```
eco-remit/
├── packages/
│   ├── hardhat/                    # Smart contract development
│   │   ├── contracts/
│   │   │   ├── AutomataUsdt.sol    # EIP-712 gasless USDT transfers
│   │   │   ├── LoyaltyBadge.sol    # ERC721 loyalty NFTs
│   │   │   └── MockUSDT.sol        # Test USDT token
│   │   ├── deploy/                 # Deployment scripts
│   │   ├── scripts/                # Utility scripts
│   │   └── test/                   # Contract tests
│   │
│   └── nextjs/                     # Frontend application
│       ├── app/
│       │   ├── automata/           # Workflow builder UI
│       │   │   ├── components/     # Canvas, Sidebar, ConfigPanel
│       │   │   │   ├── nodes/      # Node implementations
│       │   │   │   └── edges/      # Edge types
│       │   │   └── store.ts        # Zustand state management
│       │   ├── wallet/             # WDK wallet interface
│       │   ├── api/
│       │   │   ├── relay/          # Relayer for gasless txs
│       │   │   └── ai-decision/    # Gemini AI integration
│       │   └── debug/              # Contract debugging UI
│       ├── components/
│       │   ├── WalletManager.tsx   # WDK wallet UI
│       │   └── scaffold-eth/       # Reusable Web3 components
│       ├── contexts/
│       │   └── WdkContext.tsx      # WDK provider
│       ├── hooks/scaffold-eth/     # Custom hooks
│       ├── services/
│       │   └── seedVault.ts        # Encrypted seed storage
│       └── config/
│           └── networks.ts         # Network configurations
│
├── scripts/                        # Helper bash scripts
├── docker-compose.yml              # Docker fallback for local node
└── README.md                       # This file
```

---

## 🚀 Quick Start

### Prerequisites

Before you begin, install:

- [Node.js (>= v20.18.3)](https://nodejs.org/en/download/)
- [Yarn v3](https://yarnpkg.com/getting-started/install)
- [Git](https://git-scm.com/downloads)
- **For Local Development:**
  - [Avalanche CLI](https://docs.avax.network/tooling/cli) (recommended)
  - OR [Docker](https://www.docker.com/get-started) (fallback)

#### Installing Avalanche CLI

**macOS:**
```bash
brew install ava-labs/tap/avalanche-cli
```

**Linux:**
```bash
curl -sSfL https://raw.githubusercontent.com/ava-labs/avalanche-cli/main/scripts/install.sh | sh -s
```

### 1. Install Dependencies

```bash
git clone <your-repo-url>
cd eco-remit
yarn install
```

### 2. Start Local Avalanche Node

```bash
yarn avalanche:up
```

This starts a local Avalanche C-Chain node at `http://127.0.0.1:9650/ext/bc/C/rpc` with Chain ID `1337`.

**Check node status:**
```bash
yarn avalanche:status
```

### 3. Deploy Smart Contracts

**Deploy to local network:**
```bash
yarn deploy:local
```

This deploys:
- `MockUSDT` - Test USDT token
- `AutomataUsdt` - Gasless transfer contract
- `LoyaltyBadge` - NFT contract

### 4. Set Up Environment Variables

Create `packages/nextjs/.env.local`:

```bash
# Required for AI Decision Node
GEMINI_API_KEY=your_gemini_api_key_here

# Required for Relay API (testnet/mainnet only)
RELAYER_PK=your_relayer_private_key_here
FUJI_RPC_URL=https://api.avax-test.network/ext/bc/C/rpc

# Contract addresses (auto-generated after deployment)
NEXT_PUBLIC_AUTOMATA_USDT_ADDRESS=<from_deployment_output>
NEXT_PUBLIC_LOYALTY_BADGE_ADDRESS=<from_deployment_output>

# Optional: Override defaults
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_key
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_walletconnect_id
```

**Getting a Gemini API Key:**
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API Key" or "Create API Key"
4. Copy the key to your `.env.local` file

### 5. Start Frontend

```bash
yarn start
```

Visit `http://localhost:3000`:
- Go to `/wallet` to create or import a wallet
- Go to `/automata` to start building workflows
- Go to `/debug` to interact with deployed contracts

---

## 📖 Detailed Setup Guides

### Wallet Management

#### Creating a Wallet

1. Navigate to `/wallet` page
2. Click **"Create New Wallet"**
3. **IMPORTANT**: Write down your 12-word seed phrase securely offline
4. Check "I have securely saved my seed phrase"
5. Your wallet is now active!

#### Importing a Wallet

1. Navigate to `/wallet` page
2. Click **"Import Existing Wallet"**
3. Enter your 12 or 24-word seed phrase
4. Your wallet will be restored with full balance

#### Network Switching

- Use the network dropdown in the header or wallet page
- Switch between **Local**, **Fuji Testnet**, and **Mainnet**
- Your wallet persists across networks

#### Getting Testnet AVAX

For testing on Fuji Testnet, get free AVAX tokens:

**Avalanche Faucet**
- URL: [https://core.app/tools/testnet-faucet/](https://core.app/tools/testnet-faucet/)
- Requirements: CAPTCHA

**Chainlink Faucet**
- URL: [https://faucets.chain.link/fuji](https://faucets.chain.link/fuji)
- Requirements: GitHub or Google account

**QuickNode Faucet**
- URL: [https://faucet.quicknode.com/avalanche/fuji](https://faucet.quicknode.com/avalanche/fuji)
- Requirements: 0.001 ETH on Ethereum Mainnet

> **Note**: Testnet AVAX has no monetary value and is only for testing.

---

### Smart Contract Deployment to Testnet

Follow these steps to deploy your smart contracts to Avalanche Fuji Testnet:

#### Step 1: Export Private Key from WDK Wallet

1. Start the frontend: `yarn start`
2. Navigate to `http://localhost:3000/wallet`
3. Ensure your wallet is unlocked (create one if needed)
4. Click **"Show Private Key"** button
5. Read the warning and click **"Show Private Key"** to confirm
6. **Copy the private key** that appears
   - ⚠️ **Critical**: Keep this secure and never share it
   - This gives full access to your wallet and funds

> **Why this step?** You need the private key to import your WDK wallet into Hardhat for contract deployment.

#### Step 2: Get Testnet Tokens from Faucet

1. On the `/wallet` page, copy your wallet address (displayed at the top)
2. Switch network to **Fuji Testnet** using the dropdown
3. Visit one of the faucets listed above
4. Paste your wallet address and request testnet AVAX
5. Wait for confirmation (usually a few minutes)
6. Verify you received tokens on the `/wallet` page

> **Tip**: You'll need at least 0.01 AVAX to cover gas fees.

#### Step 3: Import Account into Hardhat

```bash
yarn account:import
```

When prompted:
1. Paste your private key (from Step 1)
2. Create and confirm a password to encrypt the key
   - ⚠️ **Remember this password** - you'll need it for deployment
3. The encrypted key is saved to `packages/hardhat/.env` as `DEPLOYER_PRIVATE_KEY_ENCRYPTED`

> **Security Note**: The private key is encrypted locally. Never commit `.env` to version control.

#### Step 4: Deploy to Testnet

1. Compile contracts:
```bash
yarn compile
```

2. Deploy to Fuji:
```bash
yarn deploy:fuji
```

3. Enter the password from Step 3 when prompted
4. Wait for deployment to complete
5. Note the deployed contract addresses from the output

#### Step 5: Update Environment Variables

Copy the deployed contract addresses to `packages/nextjs/.env.local`:

```bash
NEXT_PUBLIC_AUTOMATA_USDT_ADDRESS=0x... # From deployment output
NEXT_PUBLIC_LOYALTY_BADGE_ADDRESS=0x... # From deployment output
```

Also set up your relayer (see next section).

#### Step 6: Verify Deployment

**Option A: Avalanche Testnet Explorer**
1. Copy the transaction hash from deployment output
2. Visit [https://testnet.snowtrace.io/](https://testnet.snowtrace.io/)
3. Paste the transaction hash in the search bar
4. View contract address and deployment details

**Option B: Your WDK Wallet**
1. Go to `/wallet` page
2. Switch to Fuji Testnet
3. Your balance should reflect the gas spent on deployment

---

### Configuring the Relay System

The relay system allows gasless transactions by having a backend relayer submit transactions on behalf of users.

#### Setting Up the Relayer

1. **Generate or use a separate wallet for the relayer**:
```bash
# Generate a new account for the relayer
yarn account:generate
```

2. **Fund the relayer wallet** with testnet AVAX (from faucet)

3. **Export the relayer's private key**:
```bash
yarn account:reveal-pk
```

4. **Add to `packages/nextjs/.env.local`**:
```bash
RELAYER_PK=0x... # Your relayer's private key
FUJI_RPC_URL=https://api.avax-test.network/ext/bc/C/rpc
```

#### How Gasless Transactions Work

The `AutomataUsdt` contract (`packages/hardhat/contracts/AutomataUsdt.sol`) uses **EIP-712 meta-transactions**:

1. User signs a message (off-chain) authorizing a transfer
2. Frontend sends the signature to `/api/relay`
3. Relayer verifies signature and submits transaction
4. Relayer pays gas fees
5. User's USDT is transferred without them paying gas

**User Requirements**:
- Must approve the `AutomataUsdt` contract to spend their USDT
- Must have USDT balance
- Does NOT need AVAX for gas

**Key Contract Functions**:
- `sendPaymentMeta()`: Executes gasless transfer with EIP-712 signature
- `nonces()`: Prevents replay attacks with incrementing nonces

---

### Setting Up AI Decision Node

The AI Decision node uses Google's Gemini API to analyze data and route workflows.

#### Getting Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Get API Key"** → **"Create API Key"**
4. Select or create a Google Cloud project
5. Copy the generated API key

#### Configure Environment

Add to `packages/nextjs/.env.local`:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

#### How AI Decision Works

The AI Decision node (`packages/nextjs/app/automata/components/nodes/AiDecisionNode.tsx`):

1. Accepts a prompt like: "Is the amount greater than 100?"
2. Receives workflow data (e.g., `{ "amount": 150, "to": "0x..." }`)
3. Calls `/api/ai-decision` with prompt + data
4. Gemini AI responds with "TRUE" or "FALSE"
5. Workflow routes to the corresponding path

**Prompt Tips**:
- Keep prompts as yes/no questions
- Reference data fields explicitly: "Is data.amount > 100?"
- Test with Demo Mode examples first

---

## 🧩 Smart Contracts Deep Dive

### AutomataUsdt Contract

**Location**: `packages/hardhat/contracts/AutomataUsdt.sol`

**Purpose**: Enable gasless USDT transfers using EIP-712 meta-transactions.

**Key Features**:
- **EIP-712 Signatures**: Users sign typed data off-chain
- **Nonce Management**: Prevents replay attacks (inherited from OpenZeppelin's `Nonces`)
- **Meta-Transactions**: Relayer submits transaction and pays gas
- **Security**: Signature verification ensures only authorized transfers

**Important Functions**:

```solidity
function sendPaymentMeta(
    address from,      // User authorizing transfer
    address to,        // Recipient
    uint256 amount,    // USDT amount (6 decimals)
    uint256 deadline,  // Signature expiration
    uint8 v, bytes32 r, bytes32 s  // EIP-712 signature
) public
```

**User Flow**:
1. User approves contract: `mockUSDT.approve(automataUsdtAddress, amount)`
2. User signs EIP-712 permit message off-chain
3. Relayer calls `sendPaymentMeta()` with signature
4. Contract verifies signature and executes transfer
5. User pays no gas!

### LoyaltyBadge Contract

**Location**: `packages/hardhat/contracts/LoyaltyBadge.sol`

**Purpose**: ERC721 NFTs for loyalty badges and achievements.

**Key Features**:
- Standard ERC721 implementation
- Only owner (relayer) can mint
- Pausable for emergency situations

**Important Functions**:

```solidity
function safeMint(address to, uint256 tokenId) public onlyOwner
```

**Minting Flow**:
1. Workflow triggers mint action
2. Frontend calls `/api/relay` with action "mintBadge"
3. Relayer (contract owner) calls `safeMint()`
4. NFT minted to recipient
5. Relayer pays gas

### MockUSDT Contract

**Location**: `packages/hardhat/contracts/MockUSDT.sol`

**Purpose**: ERC20 test token mimicking USDT (6 decimals).

**Features**:
- Standard ERC20 with 6 decimals
- Initial supply minted to deployer
- Used for testing gasless transfers

---

## 🔄 Workflow System

### Node Types Explained

#### On-Chain Event (Trigger)

**Purpose**: Starts workflow when a blockchain event occurs.

**Configuration**:
- Contract address to watch
- Event name to listen for
- Event parameters

**Use Case**: Trigger a workflow when someone sends you tokens.

#### AI Decision (Logic)

**Purpose**: Route workflow based on AI analysis of data.

**Configuration**:
- **Prompt**: Yes/no question for AI (e.g., "Is amount > 100?")
- **Input Data**: Data from previous nodes

**Output Handles**:
- `true`: Connects to nodes that execute if AI says TRUE
- `false`: Connects to nodes that execute if AI says FALSE

**Use Cases**:
- Route large vs. small transactions differently
- Validate data before executing expensive operations
- Dynamic decision-making based on complex conditions

#### Send USDT (Action)

**Purpose**: Transfer USDT tokens (gasless via meta-transaction).

**Configuration**:
- **Recipient**: Address to receive USDT
- **Amount**: USDT amount to send (human-readable, e.g., "100")

**Data Mapping**: Use `{{Trigger.data.to}}` to dynamically set recipient from previous node data.

**Use Case**: Send rewards or payments automatically.

#### Mint NFT (Action)

**Purpose**: Mint a loyalty badge NFT to a recipient.

**Configuration**:
- **Recipient**: Address to receive the NFT

**Data Mapping**: Use `{{Trigger.data.to}}` to dynamically set recipient.

**Use Case**: Award badges for milestones or achievements.

### Creating Your First Workflow

Let's create a workflow that:
1. Listens for an event
2. Uses AI to check if amount > 100
3. If TRUE: Mints an NFT
4. If FALSE: Sends 10 USDT

**Steps**:

1. **Add On-Chain Event Node**:
   - Drag from sidebar to canvas
   - This will be your trigger

2. **Add AI Decision Node**:
   - Drag to canvas, position below trigger
   - Connect trigger's output to AI Decision's input
   - Configure: Prompt = "Is the amount greater than 100?"

3. **Add Mint NFT Node**:
   - Drag to canvas, position to the right
   - Connect AI Decision's "true" handle to Mint NFT
   - Configure: Recipient = `{{Trigger.data.to}}`

4. **Add Send USDT Node**:
   - Drag to canvas, position below Mint NFT
   - Connect AI Decision's "false" handle to Send USDT
   - Configure: Recipient = `{{Trigger.data.to}}`, Amount = "10"

5. **Test**:
   - Click **Test Run** button
   - Enter test data: `{ "to": "0x...", "amount": 150 }`
   - Watch nodes execute in sequence!

---

## 🛠️ Available Commands

### Avalanche Node Management

| Command | Description |
|---------|-------------|
| `yarn avalanche:up` | Start local Avalanche C-Chain node |
| `yarn avalanche:down` | Stop local node |
| `yarn avalanche:status` | Check node status |
| `yarn avalanche:restart` | Restart local node |
| `yarn avalanche:clean` | Remove all node data (fresh start) |

### Contract Development

| Command | Description |
|---------|-------------|
| `yarn compile` | Compile smart contracts |
| `yarn deploy:local` | Deploy to local Avalanche |
| `yarn deploy:fuji` | Deploy to Fuji testnet (requires password) |
| `yarn deploy:mainnet` | Deploy to mainnet (requires password) |
| `yarn test` | Run contract tests |
| `yarn verify` | Verify contracts on explorer |

### Account Management

| Command | Description |
|---------|-------------|
| `yarn account:generate` | Generate new Hardhat account |
| `yarn account:import` | Import private key to Hardhat (encrypted) |
| `yarn account` | List Hardhat accounts |
| `yarn account:reveal-pk` | Show decrypted private key |

### Frontend Development

| Command | Description |
|---------|-------------|
| `yarn start` | Start Next.js dev server |
| `yarn build` | Build for production |
| `yarn format` | Format code (Prettier) |
| `yarn lint` | Lint code (ESLint) |
| `yarn vercel` | Deploy to Vercel |
| `yarn ipfs` | Deploy to IPFS via BuidlGuidl |

---

## 📋 Environment Variables Reference

### Required Variables

**For AI Decision Node:**
```bash
GEMINI_API_KEY=your_gemini_api_key
```

**For Relay System (Testnet/Mainnet):**
```bash
RELAYER_PK=0xYourRelayerPrivateKey
FUJI_RPC_URL=https://api.avax-test.network/ext/bc/C/rpc
NEXT_PUBLIC_AUTOMATA_USDT_ADDRESS=0xDeployedAutomataUsdtAddress
NEXT_PUBLIC_LOYALTY_BADGE_ADDRESS=0xDeployedLoyaltyBadgeAddress
```

### Optional Variables

**For Hardhat (packages/hardhat/.env):**
```bash
DEPLOYER_PRIVATE_KEY_ENCRYPTED=<generated_by_account_import>
ALCHEMY_API_KEY=your_alchemy_key  # Has default
ETHERSCAN_V2_API_KEY=your_etherscan_key  # Has default
```

**For Frontend (packages/nextjs/.env.local):**
```bash
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_key  # Has default
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id  # Has default
NEXT_PUBLIC_IGNORE_BUILD_ERROR=true  # For development
```

---

## 🌐 Network Configuration

Networks are configured in `packages/nextjs/config/networks.ts`:

| Network | Chain ID | RPC URL |
|---------|----------|---------|
| **Local** | 1337 | http://127.0.0.1:9650/ext/bc/C/rpc |
| **Fuji Testnet** | 43113 | https://api.avax-test.network/ext/bc/C/rpc |
| **Mainnet** | 43114 | https://api.avax.network/ext/bc/C/rpc |

**Block Explorers**:
- **Fuji**: [https://testnet.snowtrace.io/](https://testnet.snowtrace.io/)
- **Mainnet**: [https://snowtrace.io/](https://snowtrace.io/)

---

## 🔒 Security Best Practices

### Seed Phrase & Private Keys

1. **Never commit seed phrases or private keys** to version control
2. **Always use `.env.local`** for sensitive data (ignored by git)
3. **Keep `.env` files secure** and never share them
4. **Back up seed phrases offline** in a secure location
5. **Use separate wallets** for development, testing, and production

### Seed Phrase Storage

The WDK wallet implementation (`packages/nextjs/services/seedVault.ts`) uses:
- **WebCrypto AES-GCM 256-bit encryption** for seed phrases
- **Device-specific encryption key** stored in IndexedDB
- **Separate storage** for encrypted seed and encryption key
- **Auto-unlock in dev mode only** (NODE_ENV=development)
- **Explicit confirmation required** for seed phrase export

### Relayer Security

1. **Use a dedicated wallet** for the relayer (separate from personal funds)
2. **Fund relayer minimally** (only what's needed for gas)
3. **Monitor relayer balance** and refill as needed
4. **Rotate relayer keys** periodically in production
5. **Never expose RELAYER_PK** in client-side code

### Testing & Deployment

1. **Always test on local network first**
2. **Then test on Fuji testnet thoroughly**
3. **Verify contract deployments** on block explorer
4. **Audit contracts before mainnet deployment**
5. **Start with small transactions** on mainnet

---

## 🐛 Troubleshooting

### Local Node Issues

**Error: "Cannot connect to local node"**
- Run `yarn avalanche:status` to check if node is running
- Restart with `yarn avalanche:restart`
- If using Docker fallback, ensure Docker is running

**Error: "Chain ID mismatch"**
- Local node should use Chain ID 1337
- Check `scaffold.config.ts` matches your node's chain ID

### Deployment Issues

**Error: "insufficient funds for gas"**
- Get testnet AVAX from faucets (see Getting Testnet AVAX section)
- Verify you have at least 0.01 AVAX in your wallet

**Error: "Failed to decrypt private key"**
- Ensure you're using the correct password from `yarn account:import`
- If forgotten, re-import with `yarn account:import`

**Error: "Contract deployment failed"**
- Check your network connection
- Verify RPC URL is accessible
- Ensure you have sufficient gas

### Relay API Issues

**Error: "Missing environment variable: RELAYER_PK"**
- Add `RELAYER_PK` to `packages/nextjs/.env.local`
- Ensure the file is in the correct location
- Restart the dev server after adding variables

**Error: "Invalid signature" in AutomataUsdt**
- Check that the user has approved the contract
- Verify the EIP-712 domain matches the contract
- Ensure nonce is current (use `nonces()` function)

### AI Decision Issues

**Error: "Gemini API error"**
- Verify `GEMINI_API_KEY` is set in `.env.local`
- Check API key is valid at [Google AI Studio](https://aistudio.google.com/)
- Ensure you haven't exceeded rate limits

**AI returns unexpected results**
- Refine your prompt to be more specific
- Test prompts in Google AI Studio first
- Use explicit yes/no questions

### Workflow Issues

**Nodes not executing**
- Check node connections (edges) are correct
- Verify node configuration is complete
- Use browser console to check for errors
- Test with Demo Mode examples first

**Data mapping not working**
- Ensure syntax is correct: `{{NodeName.data.field}}`
- Check that previous node provides expected data
- Use test data that matches your mapping expectations

---

## 📚 Documentation & Resources

### Official Documentation

- **Scaffold-ETH 2**: [https://docs.scaffoldeth.io](https://docs.scaffoldeth.io)
- **Avalanche**: [https://docs.avax.network](https://docs.avax.network)
- **Tether WDK**: [https://docs.wallet.tether.io/](https://docs.wallet.tether.io/)
- **ReactFlow**: [https://reactflow.dev/](https://reactflow.dev/)
- **Hardhat**: [https://hardhat.org/docs](https://hardhat.org/docs)
- **Next.js**: [https://nextjs.org/docs](https://nextjs.org/docs)

### Community & Support

- **Scaffold-ETH Telegram**: [https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA](https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA)
- **Avalanche Discord**: [https://chat.avalabs.org/](https://chat.avalabs.org/)
- **BuidlGuidl**: [https://buidlguidl.com/](https://buidlguidl.com/)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `yarn test`
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Style

- Follow existing code formatting
- Run `yarn format` before committing
- Ensure `yarn lint` passes
- Write tests for new features

---

## 📄 License

This project is licensed under the MIT License - see the [LICENCE](LICENCE) file for details.

---

## 🙏 Acknowledgments

This project stands on the shoulders of amazing open source projects:

- **[Scaffold-ETH 2](https://scaffoldeth.io)** - The foundation of this platform, created by [BuidlGuidl](https://buidlguidl.com/). An incredible toolkit for Ethereum development adapted for Avalanche.
- **[Tether WDK](https://tether.to)** - The Wallet Development Kit powering all blockchain interactions.
- **[Avalanche](https://avax.network)** - The blazing fast L1 blockchain platform.
- **[ReactFlow](https://reactflow.dev/)** - The powerful library enabling our visual workflow builder.
- **[OpenZeppelin](https://openzeppelin.com/)** - Secure, audited smart contract libraries.

Special thanks to the open source community for making projects like this possible. We're grateful to BuidlGuidl for creating Scaffold-ETH 2 and fostering a culture of building in public.

---

**Built with ❤️ on Avalanche**

**Happy Building! 🚀**
