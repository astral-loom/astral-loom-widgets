<div align="center">
  <h1>🧩 Astral Loom Widgets</h1>
  <p><strong>Embeddable React components for Stellar dApp frontend development.</strong></p>
  
  [![npm version](https://img.shields.io/npm/v/astral-loom-widgets.svg)](https://www.npmjs.com/package/astral-loom-widgets)
  [![CI](https://github.com/astral-loom/astral-loom-widgets/actions/workflows/ci.yml/badge.svg)](https://github.com/astral-loom/astral-loom-widgets/actions/workflows/ci.yml)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  
  **[Live Demo](https://astral-loom-widgets.vercel.app)**
  
  🌐 Website: https://astral-loom-site.vercel.app
</div>

## Demo

![astral-loom-widgets demo](./demo.png)

(A live interactive demo is also available: [https://astral-loom-widgets.vercel.app](https://astral-loom-widgets.vercel.app))

---

## 📖 Overview

`astral-loom-widgets` provides embeddable UI components for Stellar dApp frontend development. These React components are pre-wired to handle Stellar network data, saving you from rebuilding basic transaction and balance displays from scratch.

### 🏗️ Architecture

Developed with modern frontend practices:
- Built in React & TypeScript.
- Explorable via Storybook.
- Drop-in UI for components like the `<BalanceCard />`.

### 🌍 Ecosystem Architecture

`astral-loom-widgets` is the UI component layer of the Astral Loom ecosystem.

```mermaid
flowchart TD
    %% Base Layer
    Stellar[Stellar Network]
    Horizon[Horizon API]
    Soroban[Soroban RPC]
    
    Stellar --- Horizon
    Stellar --- Soroban
    
    %% Official SDK
    SDK(("@stellar/stellar-sdk"))
    Horizon --> SDK
    Soroban --> SDK

    %% Astral Loom Layer
    subgraph Astral Loom Ecosystem
        Kit[astral-loom-kit<br/>Core TypeScript SDK]
        CLI[astral-loom-cli<br/>CLI Tooling]
        Widgets[astral-loom-widgets<br/>React UI Components]
    end

    SDK --> Kit
    
    %% Dependencies within the ecosystem
    Kit --> CLI
    Kit --> Widgets

    %% Wallets
    Wallets[Wallet Extensions<br/>Freighter, Albedo, xBull]
    Wallets -.->|WalletAdapter| Kit

    %% End Users
    Backend[Backend / dApp Devs] --> Kit
    Ops[DevOps / Power Users] --> CLI
    Frontend[Frontend / React Devs] --> Widgets
    
    classDef official fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#000
    classDef loom fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#000
    classDef users fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#000
    
    class SDK official
    class Kit,CLI,Widgets loom
    class Backend,Ops,Frontend users
```

---

## 🚀 Quick Start

### 1. Installation

Install using npm or yarn:

```bash
npm install astral-loom-widgets react react-dom @stellar/stellar-sdk
```

### 2. Usage

Import and use the pre-built components directly in your app:

```tsx
import { BalanceCard } from 'astral-loom-widgets';

function App() {
  return (
    <BalanceCard 
      publicKey="GA...YOUR_ACCOUNT"
      network="testnet"
      balances={[
        { assetCode: 'XLM', balance: '100.00' },
        { assetCode: 'USDC', balance: '50.00' }
      ]}
    />
  );
}
```

---

## 💡 Examples

Check out the [examples/demo-app/](examples/demo-app/) directory for a complete Vite + React demo application showcasing the `<BalanceCard />` component in action.

See [site/](site/) for the project landing page.

---

## 🤝 Community & Maintainers

We are committed to fostering a welcoming environment. Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before participating. If you discover a vulnerability, please review our [Security Policy](SECURITY.md) for reporting instructions.

Join the discussion and get support:
* **Community Link**: [Stellar Developer Discord](https://discord.gg/5aprtMSyR)

| Maintainer | Role |
|------------|------|
| Temmy2026 | Core Developer |

---

## 🛠️ Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to get started.

### 🧑‍💻 Contributors

[![Contributors](https://contrib.rocks/image?repo=astral-loom/astral-loom-widgets)](https://github.com/astral-loom/astral-loom-widgets/graphs/contributors)
