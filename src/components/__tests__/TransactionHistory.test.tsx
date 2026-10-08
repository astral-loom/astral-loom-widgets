import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { TransactionHistory } from '../TransactionHistory';

const PUBLIC_KEY = 'G_TEST_PUBLIC_KEY';

// Mock the Stellar SDK so no Horizon request leaves the test runner.
// vi.mock is hoisted above the const below, so the key is repeated as a literal.
vi.mock('@stellar/stellar-sdk', () => {
  const publicKey = 'G_TEST_PUBLIC_KEY';
  const records = [
    {
      id: 'op1',
      created_at: '2023-01-01T12:00:00Z',
      type: 'payment',
      source_account: 'G_SOURCE_ACCOUNT',
      to: 'G_DEST_ACCOUNT',
      amount: '10.0',
      asset_type: 'native',
    },
    {
      id: 'op2',
      created_at: '2023-01-02T12:00:00Z',
      type: 'payment',
      source_account: 'G_SOURCE_ACCOUNT2',
      to: publicKey,
      from: 'G_DEST_ACCOUNT2',
      amount: '5.0',
      asset_type: 'credit_alphanum4',
      asset_code: 'USD',
      asset_issuer: 'G_ISSUER',
    },
  ];

  return {
    Horizon: {
      Server: class {
        constructor(_serverUrl: string) {}
        operations() {
          return {
            forAccount: (_account: string) => ({
              order: (_order: string) => ({
                limit: (limit: number) => ({
                  call: () => Promise.resolve({ records: records.slice(0, limit) }),
                }),
              }),
            }),
          };
        }
      },
    },
  };
});

describe('TransactionHistory', () => {
  it('renders the loading state before data arrives', () => {
    render(<TransactionHistory publicKey={PUBLIC_KEY} />);
    expect(screen.getByText(/loading transaction history/i)).toBeTruthy();
  });

  it('shows a hint when no public key is provided', () => {
    render(<TransactionHistory publicKey="" />);
    expect(screen.getByText(/no public key provided/i)).toBeTruthy();
  });

  it('displays received and sent payments', async () => {
    render(<TransactionHistory publicKey={PUBLIC_KEY} limit={2} />);

    await waitFor(() => {
      expect(screen.getAllByTestId('tx-row').length).toBe(2);
    });

    expect(screen.getByText('USD')).toBeTruthy();
    expect(screen.getByText('+5.0')).toBeTruthy();
    expect(screen.getByText('-10.0')).toBeTruthy();
    expect(screen.getByText('Receive')).toBeTruthy();
    expect(screen.getByText('Send')).toBeTruthy();
  });

  it('fetches fewer rows when limit is smaller than the result set', async () => {
    render(<TransactionHistory publicKey={PUBLIC_KEY} limit={1} />);

    await waitFor(() => {
      expect(screen.getAllByTestId('tx-row').length).toBe(1);
    });
  });
});
