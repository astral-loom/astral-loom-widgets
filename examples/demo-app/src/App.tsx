import { BalanceCard } from 'astral-loom-widgets'

function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Astral Loom Widgets Demo</h1>
      <BalanceCard 
        publicKey="GDQJGCOVVSEIB2OCSL3J4TCMZKQM2YMO24XVDJFGJ22IGZSCBWYAGHGD" 
        network="testnet" 
      />
    </div>
  )
}

export default App
