# FlareBond: A Cross-Chain Bridging Solution Leveraging Flare’s Data Protocols

FlareBond is a cutting-edge cross-chain bridge designed to facilitate seamless asset transfers between Ethereum and Flare’s Coston testnet. By integrating Flare’s enshrined data protocols, including the Flare Data Connector (FDC) and Flare Time Series Oracle (FTSO), FlareBond ensures secure, decentralized, and trustless interoperability.

## Key Features

### 1. Smart Contract Gateways

FlareBond deploys two gateway smart contracts, each operating on a respective blockchain to enable asset bridging:

- **Ethereum (Sepolia Testnet):** `0x68eDBdF3614F802D6fF34a74A3DBF4f97910754a`
- **Coston (Flare Testnet):** `0xF6b29cF96471e9bfbBb52623395759CA948f4554a`

### 2. ERC-20 Compatibility

FlareBond supports any ERC-20 token that adheres to a defined interface, enabling:

- **Minting:** Wrapped tokens are minted on the destination chain when assets are locked on the source chain.
- **Burning:** Tokens are burned on the destination chain when assets are unlocked on the source chain.

**Example Mintable Token Address on Coston:** `0xb2A0aD1146eC9843908836a2D166D5624AA32471`

### 3. Event-Driven Attestation Workflow

FlareBond utilizes an innovative, event-driven attestation system to validate and process bridging requests.

#### Workflow:

1. **Event Detection:** Gateway contracts emit events capturing sender address, receiver address, and amount burned.
2. **Node Validation:** Independently operated nodes:
   - Listen to these events.
   - Create **Attestation Requests** by interacting with Flare APIs.
   - Pass the Attestation Request to the StateConnector contract for consensus-based verification.
3. **Merkle Proof Submission:** Upon successful attestation, nodes generate Merkle proofs and submit them to the gateway contract on the destination chain.
4. **Minting Tokens:** The gateway contract validates the proof and mints wrapped tokens to the receiver’s wallet.

### 4. Decentralized Node Operations

FlareBond ensures decentralization by allowing independent nodes to handle attestation generation and proof submission. In future iterations, we plan to incentivize node operators with user-paid bridging fees, ensuring robust network participation and reliability.

### 5. Enhanced Security

- **Data Integrity:** Leveraging Flare’s StateConnector ensures that all input data is cryptographically verified.
- **Penetration Protection:** Only approved tokens can be bridged, utilizing a robust mint-and-burn mechanism to eliminate attack vectors.

## Technological Integration

FlareBond integrates Flare’s advanced protocols for maximum security and efficiency:

1. **Flare Data Connector (FDC):** Ensures the accuracy and trustworthiness of cross-chain data through decentralized attestation mechanisms.
2. **Flare Time Series Oracle (FTSO):** Provides secure and decentralized data feeds, enabling accurate transaction computations.

## Vision for Scalability

Future enhancements include:

- **Incentivized Node Operations:** Implementing fee-based rewards for node operators to scale the network.
- **Additional Chain Support:** Expanding compatibility to other EVM and non-EVM chains.
- **Enhanced Usability:** Creating user-friendly interfaces for simplified bridging requests and real-time tracking.

---

### Get Started

Visit our [GitHub Repository](#) to access the codebase, documentation, and detailed setup instructions.
