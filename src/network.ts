export type NetworkName = 'testnet' | 'mainnet';

export interface NetworkPreset {
  horizonUrl: string;
  rpcUrl: string;
  networkPassphrase: string;
}

// Passphrases mirror Networks.TESTNET / Networks.PUBLIC from the SDK; kept as
// literals so this module stays dependency-free and easy to test.
export const NETWORK_PRESETS: Record<NetworkName, NetworkPreset> = {
  testnet: {
    horizonUrl: 'https://horizon-testnet.stellar.org',
    rpcUrl: 'https://soroban-testnet.stellar.org',
    networkPassphrase: 'Test SDF Network ; September 2015',
  },
  mainnet: {
    horizonUrl: 'https://horizon.stellar.org',
    rpcUrl: 'https://mainnet.stellar.googleapis.com',
    networkPassphrase: 'Public Global Stellar Network ; September 2015',
  },
};

// Soroban simulation only needs a well-formed source account, so it uses the
// community "infinite sequence" address instead of a real funded account.
export const SIMULATION_SOURCE_ACCOUNT =
  'GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN';
