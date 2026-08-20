import React from 'react';

export interface BalanceCardProps {
  publicKey: string;
  balances: Array<{
    assetCode: string;
    balance: string;
  }>;
  network?: 'testnet' | 'mainnet';
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  publicKey,
  balances,
  network = 'testnet',
}) => {
  return (
    <div
      style={{
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '16px',
        maxWidth: '400px',
        fontFamily: 'sans-serif',
        backgroundColor: '#ffffff',
      }}
    >
      <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', color: '#1a202c' }}>Account Balance</h3>
      <p
        style={{
          margin: '0 0 16px 0',
          fontSize: '0.85rem',
          color: '#718096',
          wordBreak: 'break-all',
        }}
      >
        {publicKey}{' '}
        <span
          style={{
            padding: '2px 6px',
            borderRadius: '4px',
            backgroundColor: '#edf2f7',
            fontSize: '0.7rem',
          }}
        >
          {network}
        </span>
      </p>

      {balances.length === 0 ? (
        <p style={{ color: '#a0aec0' }}>No balances found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {balances.map((b, i) => (
            <li
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '8px 0',
                borderBottom: i === balances.length - 1 ? 'none' : '1px solid #edf2f7',
              }}
            >
              <strong style={{ color: '#2d3748' }}>{b.assetCode}</strong>
              <span style={{ color: '#4a5568' }}>{b.balance}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
