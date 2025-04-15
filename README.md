# CrowdMint: A Blockchain-Based Crowdfunding Platform

CrowdMint is a decentralized crowdfunding platform that uses blockchain technology to provide a transparent and secure environment for fundraising campaigns. By utilizing smart contracts, CrowdMint ensures that all transactions are immutable and trustless, eliminating the need for intermediaries.​
## ✨ Features

- ✅ Decentralized Campaign Management: Users can create and manage crowdfunding campaigns directly on the blockchain.
- 💰 Secure Transactions: All contributions are securely processed on the blockchain, ensuring transparency and immutability.
- 💻 User-Friendly Interface: A responsive frontend built with modern web technologies for seamless user interaction
- 🔐 Smart Contract Integration: Automated handling of funds and campaign logic through Solidity-based smart contracts.

## 🚀 Tech Stack

- **Frontend**: React, Tailwind CSS
- **Blockchain**: Solidity, Hardhat
- **Ethereum Interaction**: Web3.js
- **Wallet Integration**: MetaMask

## 🛠 Setup Instructions

### Prerequisites

- Node.js
- Git
- MetaMask (for interacting with the app)
- Hardhat (for local development)

### Project Structure 

```bash 
CrowdMint/
├── client/              # React frontend
├── contracts/           # Solidity smart contracts
├── scripts/             # Deployment scripts
├── test/                # Contract tests
└── hardhat.config.js    # Hardhat config
```

### 🧪 Installation & Development

```bash
# 1. Clone the repository
git clone https://github.com/NaveenShaji742/CrowdMint-A-Blockchain-Based-Crowdfunding-Platform.git
cd CrowdMint-A-Blockchain-Based-Crowdfunding-Platform

# 2. Start Hardhat local blockchain
npx hardhat node
```
### 🛠Deploying Contracts 

```bash
# In a new terminal tab
npx hardhat compile

# Deploy the contract to local network
npx hardhat run scripts/deploy.js --network localhost

```
### 💻Initialization of Frontend 

```bash
# In a new terminal tab
cd client
npm install
npm start
```
### Future Enhancements

- Image upload for campaign verification
- Campaign history database
