import React, { useEffect, useState } from 'react';
import { Horizon } from '@stellar/stellar-sdk';
import './TransactionHistory.css';

export interface TransactionHistoryProps {
  /** The Stellar public key to fetch transactions for */
  publicKey: string;
  /** The network to query */
  network?: 'testnet' | 'mainnet';
  /** Number of transactions to fetch (default 10) */
  limit?: number;
}

interface ProcessedPayment {
  id: string;
  date: string;
  type: string;
  amount: string;
  asset: string;
  from: string;
  to: string;
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({ 
  publicKey, 
  network = 'testnet',
  limit = 10 
}) => {
  const [payments, setPayments] = useState<ProcessedPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const isMounted = true;
    
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const serverUrl = network === 'mainnet' 
          ? 'https://horizon.stellar.org' 
          : 'https://horizon-testnet.stellar.org';
          
        const server = new Horizon.Server(serverUrl);
        
        // Fetch operations instead of raw transactions to easily see payments/transfers
        const operations = await server.operations()
          .forAccount(publicKey)
          .order('desc')
          .limit(limit)
          .call();

        if (isMounted) {
          const processed = operations.records.map((op: {
            id: string;
            created_at: string;
            type: string;
            source_account: string;
            to?: string;
            from?: string;
            amount?: string;
            asset_type?: string;
            asset_code?: string;
            starting_balance?: string;
            funder?: string;
            account?: string;
          }) => {
            const date = new Date(op.created_at).toLocaleDateString(undefined, {
              year: 'numeric', month: 'short', day: 'numeric',
              hour: '2-digit', minute: '2-digit'
            });
            
            let type = op.type;
            let amount = '-';
            let asset = '-';
            let from = op.source_account;
            let to = '-';

            if (op.type === 'payment' || op.type === 'path_payment_strict_receive' || op.type === 'path_payment_strict_send') {
              type = op.to === publicKey ? 'Receive' : 'Send';
              amount = op.amount ?? '-';
              asset = op.asset_type === 'native' ? 'XLM' : (op.asset_code ?? '-');
              from = op.from ?? op.source_account;
              to = op.to ?? '-';
            } else if (op.type === 'create_account') {
              type = 'Account Created';
              amount = op.starting_balance ?? '-';
              asset = 'XLM';
              from = op.funder ?? op.source_account;
              to = op.account ?? '-';
            }

            return {
              id: op.id,
              date,
              type,
              amount,
              asset,
              from,
              to
            };
          });
          
          setPayments(processed);
          setError(null);
        }
      } catch (err: unknown) {
        if (isMounted) {
          console.error(err);
          setError(err instanceof Error ? err.message : 'Failed to fetch transaction history');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (publicKey) {
      fetchHistory();
    }
  }, [publicKey, network, limit]);

  if (!publicKey) {
    return <div className="loom-tx-history loom-empty">No public key provided</div>;
  }

  if (loading) {
    return <div className="loom-tx-history loom-loading">Loading transaction history...</div>;
  }

  if (error) {
    return <div className="loom-tx-history loom-error">Error: {error}</div>;
  }

  return (
    <div className="loom-tx-history">
      <h3>Recent Transactions</h3>
      {payments.length === 0 ? (
        <p className="loom-empty">No recent transactions found.</p>
      ) : (
        <table className="loom-tx-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Asset</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.id}>
                <td>{payment.date}</td>
                <td>
                  <span className={`loom-badge loom-badge-${payment.type.toLowerCase().replace(' ', '-')}`}>
                    {payment.type}
                  </span>
                </td>
                <td>{payment.asset}</td>
                <td className={payment.type === 'Receive' || payment.type === 'Account Created' ? 'loom-text-success' : ''}>
                  {payment.type === 'Receive' || payment.type === 'Account Created' ? '+' : ''}
                  {payment.type === 'Send' ? '-' : ''}
                  {payment.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
