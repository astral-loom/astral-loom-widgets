import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { QRPaymentRequest } from '../QRPaymentRequest';

describe('QRPaymentRequest', () => {
  const validAddress = 'GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5';
  const invalidAddress = 'GINVALIDADDRESS123456';

  it('renders QR code and details when destination is a valid Stellar address', () => {
    const { container, getByText, queryByRole } = render(
      <QRPaymentRequest destination={validAddress} amount="100" assetCode="XLM" memo="test-memo" />
    );

    // No error rendered
    expect(queryByRole('alert')).toBeNull();

    // Renders QR svg
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();

    // Renders details
    expect(getByText('100 XLM')).toBeTruthy();
    expect(getByText('Destination')).toBeTruthy();
    expect(getByText('Memo')).toBeTruthy();
    expect(getByText('test-memo')).toBeTruthy();
  });

  it('displays user-visible error and does not render QR code when destination is invalid', () => {
    const { container, getByRole, queryByText } = render(
      <QRPaymentRequest destination={invalidAddress} />
    );

    const errorEl = getByRole('alert');
    expect(errorEl).toBeTruthy();
    expect(errorEl.textContent).toContain('Invalid Stellar address');

    // QR code svg should not be rendered
    const svg = container.querySelector('svg');
    expect(svg).toBeNull();

    // Details should not be rendered
    expect(queryByText('Destination')).toBeNull();
  });

  it('displays error and does not render QR code when destination is an empty string', () => {
    const { container, getByRole, queryByText } = render(
      <QRPaymentRequest destination="" />
    );

    const errorEl = getByRole('alert');
    expect(errorEl).toBeTruthy();
    expect(errorEl.textContent).toContain('Invalid Stellar address');

    const svg = container.querySelector('svg');
    expect(svg).toBeNull();
    expect(queryByText('Destination')).toBeNull();
  });
});
