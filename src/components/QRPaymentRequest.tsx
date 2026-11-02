import React from 'react';
import { StrKey } from '@stellar/stellar-sdk';
import { QRCodeSVG } from 'qrcode.react';
import './QRPaymentRequest.css';

export interface QRPaymentRequestProps {
  /**
   * The Stellar public key to receive the payment.
   *
   * Must be a valid Ed25519 public key: a 56-character, `G`-prefixed StrKey
   * with a valid checksum. Invalid values, including an empty string, are
   * rejected before a QR code is generated.
   */
  destination: string;
  /** The amount to request */
  amount?: string;
  /** The asset code (default: XLM) */
  assetCode?: string;
  /** Optional memo for the transaction */
  memo?: string;
  /** Size of the QR code in pixels */
  size?: number;
}

/**
 * Renders a SEP-0007 payment request as a scannable QR code.
 *
 * `destination` is validated with `StrKey.isValidEd25519PublicKey()` from
 * `@stellar/stellar-sdk` before the SEP-0007 URI is built. If validation fails
 * (for example, the value is empty, too short, does not start with `G`, or has
 * an invalid checksum), the component renders an accessible error message
 * instead of the QR code and payment details. This prevents users from scanning
 * a payment request that wallets cannot use.
 */
export const QRPaymentRequest: React.FC<QRPaymentRequestProps> = ({
  destination,
  amount,
  assetCode = 'XLM',
  memo,
  size = 200,
}) => {
  const isValidDestination = StrKey.isValidEd25519PublicKey(destination);

  if (!isValidDestination) {
    return (
      <div className="loom-qr-request loom-qr-request--error" role="alert">
        <div className="loom-qr-error-title">Invalid Stellar address</div>
        <p className="loom-qr-error-message">
          The destination must be a valid Stellar public key: 56 characters starting with G, with a
          valid checksum.
        </p>
      </div>
    );
  }

  // Generate a standard SEP-0007 URI
  // URI format: web+stellar:pay?destination=ACCOUNT_ID&amount=120.12&memo=skus&asset_code=USD&asset_issuer=ACCOUNT_ID
  let uri = `web+stellar:pay?destination=${destination}`;
  if (amount) uri += `&amount=${amount}`;
  if (assetCode && assetCode !== 'XLM') uri += `&asset_code=${assetCode}`;
  // Native XLM doesn't need an asset_issuer. If we supported custom assets fully here we'd need issuer.
  if (memo) uri += `&memo=${encodeURIComponent(memo)}&memo_type=text`;

  return (
    <div className="loom-qr-request">
      <div className="loom-qr-container">
        <QRCodeSVG value={uri} size={size} level="M" includeMargin={true} />
      </div>

      <div className="loom-qr-details">
        {amount && (
          <div className="loom-qr-amount">
            {amount} {assetCode}
          </div>
        )}
        <div className="loom-qr-dest-label">Destination</div>
        <div className="loom-qr-dest-value" title={destination}>
          {destination.substring(0, 6)}...{destination.substring(destination.length - 6)}
        </div>
        {memo && (
          <>
            <div className="loom-qr-memo-label">Memo</div>
            <div className="loom-qr-memo-value">{memo}</div>
          </>
        )}
      </div>
    </div>
  );
};
