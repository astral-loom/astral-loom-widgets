# Astral Loom Widgets

Embeddable UI components for Stellar dApp frontend development. These React components are pre-wired to handle Stellar network data, saving you from rebuilding basic transaction and balance displays from scratch.

## Installation

```bash
npm install astral-loom-widgets react react-dom @stellar/stellar-sdk
```

## Usage

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

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).
