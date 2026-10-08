import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { StrKey } from '@stellar/stellar-sdk';
import './QRPaymentRequest.css';

export interface QRPaymentRequestProps {
  /** The Stellar public key to receive the payment */
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
 * QRPaymentRequest component renders a SEP-0007 compliant payment request QR code.
 * Validates that `destination` is a valid Stellar public key (Ed25519) before generating the QR code.
 * If the destination is invalid or empty, displays an error message and does not render the QR code.
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
      <div className="loom-qr-request">
        <div className="loom-qr-error" role="alert">
          Invalid Stellar address
        </div>
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
