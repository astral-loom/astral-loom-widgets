<div align="center">
  <h1>🧩 Astral Loom Widgets</h1>
  <p><strong>Embeddable React components for Stellar dApp frontend development.</strong></p>
  
  [![Build Status](https://github.com/astral-loom/astral-loom-widgets/actions/workflows/ci.yml/badge.svg)](https://github.com/astral-loom/astral-loom-widgets/actions/workflows/ci.yml)
  [![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
</div>

---

## 📖 Overview

`astral-loom-widgets` provides embeddable UI components for Stellar dApp frontend development. These React components are pre-wired to handle Stellar network data, saving you from rebuilding basic transaction and balance displays from scratch.

### 🏗️ Architecture

Developed with modern frontend practices:
- Built in React & TypeScript.
- Explorable via Storybook.
- Drop-in UI for components like the `<BalanceCard />`.

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

## 🤝 Community & Maintainers

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
