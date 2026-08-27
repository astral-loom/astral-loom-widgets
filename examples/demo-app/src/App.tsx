import { useState, useEffect } from 'react'
import { BalanceCard } from 'astral-loom-widgets'
import './App.css'

const DEMO_PUBLIC_KEY = 'GDQSBJVACLYWVUCWIKHNEMWUOMCS5N44OBGKH4BFZKE53NDENXFAECST'

interface Balance {
  assetCode: string
  balance: string
}

function App() {
  const [balances, setBalances] = useState<Balance[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBalances() {
      try {
        const res = await fetch(
          `https://horizon-testnet.stellar.org/accounts/${DEMO_PUBLIC_KEY}`
        )
        if (!res.ok) throw new Error(`Horizon returned ${res.status}`)
        const data = await res.json()

        const parsed: Balance[] = data.balances.map(
          (b: {
            asset_type: string
            asset_code?: string
            balance: string
          }) => ({
            assetCode:
              b.asset_type === 'native' ? 'XLM' : b.asset_code ?? '???',
            balance: parseFloat(b.balance).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 7,
            }),
          })
        )
        setBalances(parsed)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load balances'
        )
      } finally {
        setLoading(false)
      }
    }
    fetchBalances()
  }, [])

  const shortKey = `${DEMO_PUBLIC_KEY.slice(0, 6)}...${DEMO_PUBLIC_KEY.slice(-4)}`

  return (
    <div className="page">
      <header className="header">
        <div className="header-inner">
          <span className="logo">Astral Loom</span>
          <nav className="header-links">
            <a
              href="https://github.com/astral-loom/astral-loom-widgets"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/astral-loom-widgets"
              target="_blank"
              rel="noreferrer"
            >
              npm
            </a>
          </nav>
        </div>
      </header>

      <main className="main">
        <section className="intro">
          <h1>Astral Loom Widgets</h1>
          <p>
            A live demo of the <code>&lt;BalanceCard /&gt;</code> component,
            fetching real balances from the Stellar testnet via the Horizon API.
          </p>
          <p className="account-badge">
            Demo account:{' '}
            <code title={DEMO_PUBLIC_KEY}>{shortKey}</code>
            <span className="network-tag">testnet</span>
          </p>
        </section>

        <section className="card-container">
          {loading && (
            <div className="status-box">
              <div className="spinner" />
              <span>Loading balances from Horizon…</span>
            </div>
          )}

          {error && (
            <div className="status-box status-error">
              <span className="error-icon">!</span>
              <span>{error}</span>
            </div>
          )}

          {!loading && !error && (
            <BalanceCard
              publicKey={DEMO_PUBLIC_KEY}
              network="testnet"
              balances={balances}
            />
          )}
        </section>

        <p className="disclaimer">
          Testnet demo — no real funds involved.
        </p>
      </main>

      <footer className="footer">
        <p>
          Built with{' '}
          <a
            href="https://github.com/astral-loom"
            target="_blank"
            rel="noreferrer"
          >
            Astral Loom
          </a>
        </p>
      </footer>
    </div>
  )
}

export default App
