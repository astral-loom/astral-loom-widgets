import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AssetBadge } from '../AssetBadge';

describe('AssetBadge', () => {
  it('renders native XLM with default icon and Native label', () => {
    render(<AssetBadge assetCode="XLM" />);

    expect(screen.getByText('XLM')).toBeTruthy();
    expect(screen.getByText('Native')).toBeTruthy();
    const img = screen.getByRole('img');
    expect(img.getAttribute('src')).toBe('https://cryptologos.cc/logos/stellar-xlm-logo.png');
    expect(img.getAttribute('alt')).toBe('XLM');
  });

  it('renders custom asset with truncated issuer and fallback letter icon', () => {
    const issuer = 'GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN';
    const { container } = render(<AssetBadge assetCode="USDC" issuer={issuer} />);

    expect(screen.getByText('USDC')).toBeTruthy();
    expect(screen.getByText('GA5Z...KZVN')).toBeTruthy();
    // No iconUrl provided, fallback letter shown
    const fallback = container.querySelector('.loom-asset-icon-fallback');
    expect(fallback).toBeTruthy();
    expect(fallback?.textContent).toBe('U');
  });

  it('renders custom asset with provided iconUrl', () => {
    const issuer = 'GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN';
    const iconUrl = 'https://example.com/usdc.png';
    render(<AssetBadge assetCode="USDC" issuer={issuer} iconUrl={iconUrl} />);

    const img = screen.getByRole('img');
    expect(img.getAttribute('src')).toBe(iconUrl);
    expect(img.getAttribute('alt')).toBe('USDC');
  });

  it('applies correct size classes', () => {
    const { container: smContainer } = render(<AssetBadge assetCode="XLM" size="sm" />);
    expect(smContainer.querySelector('.loom-asset-badge-sm')).toBeTruthy();

    const { container: lgContainer } = render(<AssetBadge assetCode="XLM" size="lg" />);
    expect(lgContainer.querySelector('.loom-asset-badge-lg')).toBeTruthy();
  });
});
