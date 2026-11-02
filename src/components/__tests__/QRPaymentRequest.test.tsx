import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QRPaymentRequest } from '../QRPaymentRequest';

const VALID_DESTINATION = 'GBXWCJVZR57RNIROBIIJHN433XDZUJVG7JW2ASZIUILTLBRG5BZQRP4Q';

describe('QRPaymentRequest', () => {
  it('renders a QR code for a valid Stellar address', () => {
    const { container } = render(
      <QRPaymentRequest destination={VALID_DESTINATION} amount="50.00" />,
    );

    expect(container.querySelector('svg')).toBeTruthy();
    expect(screen.queryByRole('alert')).toBeNull();
    expect(screen.getByText('50.00 XLM')).toBeTruthy();
  });

  it('shows an accessible error and no QR code for an invalid address', () => {
    const { container } = render(<QRPaymentRequest destination="not-a-valid-address" />);

    expect(screen.getByRole('alert')).toBeTruthy();
    expect(screen.getByText(/invalid stellar address/i)).toBeTruthy();
    expect(container.querySelector('svg')).toBeNull();
  });

  it('shows an error and no QR code when the destination is empty', () => {
    const { container } = render(<QRPaymentRequest destination="" />);

    expect(screen.getByRole('alert')).toBeTruthy();
    expect(container.querySelector('svg')).toBeNull();
  });

  it('rejects an address of the right length with an invalid checksum', () => {
    const { container } = render(<QRPaymentRequest destination={`G${'A'.repeat(55)}`} />);

    expect(screen.getByRole('alert')).toBeTruthy();
    expect(container.querySelector('svg')).toBeNull();
  });
});
