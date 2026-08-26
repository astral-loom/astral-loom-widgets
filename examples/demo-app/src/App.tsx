import { BalanceCard } from 'astral-loom-widgets'

function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Astral Loom Widgets Demo</h1>
      <BalanceCard 
        publicKey="GDQJGCOVVSEIB2OCSL3J4TCMZKQM2YMO24XVDJFGJ22IGZSCBWYAGHGD" 
        network="testnet"
        balances={[
          { assetCode: 'XLM', balance: '100.00' },
          { assetCode: 'USDC', balance: '50.00' }
        ]}
      />
    </div>
  )
}

export default App
