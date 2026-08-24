import React from 'react';
import './AssetBadge.css';

export interface AssetBadgeProps {
  /** The asset code (e.g., 'XLM', 'USDC') */
  assetCode: string;
  /** The asset issuer's public key (omit for native XLM) */
  issuer?: string;
  /** URL to the asset's icon */
  iconUrl?: string;
  /** Size of the badge */
  size?: 'sm' | 'md' | 'lg';
}

export const AssetBadge: React.FC<AssetBadgeProps> = ({
  assetCode,
  issuer,
  iconUrl,
  size = 'md',
}) => {
  const isNative = !issuer || assetCode === 'XLM';
  
  // Default Stellar icon for native XLM if no icon provided
  const defaultNativeIcon = 'https://cryptologos.cc/logos/stellar-xlm-logo.png';
  const displayIcon = iconUrl || (isNative ? defaultNativeIcon : undefined);

  return (
    <div className={`loom-asset-badge loom-asset-badge-${size}`}>
      {displayIcon ? (
        <img src={displayIcon} alt={assetCode} className="loom-asset-icon" />
      ) : (
        <div className="loom-asset-icon-fallback">
          {assetCode.substring(0, 1).toUpperCase()}
        </div>
      )}
      <div className="loom-asset-info">
        <span className="loom-asset-code">{assetCode}</span>
        {!isNative && issuer && (
          <span className="loom-asset-issuer" title={issuer}>
            {issuer.substring(0, 4)}...{issuer.substring(issuer.length - 4)}
          </span>
        )}
        {isNative && (
          <span className="loom-asset-issuer">Native</span>
        )}
      </div>
    </div>
  );
};
