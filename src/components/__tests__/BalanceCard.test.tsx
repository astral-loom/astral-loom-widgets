import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BalanceCard } from '../BalanceCard';

describe('BalanceCard', () => {
  it('renders correctly', () => {
    const { getByText } = render(<BalanceCard publicKey="G123" balances={[]} />);
    expect(getByText(/G123/)).toBeTruthy();
  });
});
