import React, { useState } from 'react';
import { rpc, Contract, Account, nativeToScVal, TransactionBuilder } from '@stellar/stellar-sdk';
import { NETWORK_PRESETS, NetworkName, SIMULATION_SOURCE_ACCOUNT } from '../network';
import './SorobanContractUI.css';

export interface SorobanContractUIProps {
  contractId: string;
  network?: NetworkName;
  rpcUrl?: string;
}

export const SorobanContractUI: React.FC<SorobanContractUIProps> = ({
  contractId,
  network = 'testnet',
  rpcUrl,
}) => {
  const [method, setMethod] = useState('');
  const [argsStr, setArgsStr] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const simulateCall = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const preset = NETWORK_PRESETS[network];
      const server = new rpc.Server(rpcUrl ?? preset.rpcUrl);
      
      let parsedArgs: unknown[] = [];
      if (argsStr.trim()) {
        try {
          parsedArgs = JSON.parse(`[${argsStr}]`);
        } catch (_e) {
          throw new Error('Arguments must be valid JSON values separated by commas', { cause: _e });
        }
      }
      
      const scValArgs = parsedArgs.map(arg => nativeToScVal(arg));
      const contract = new Contract(contractId);
      
      const account = new Account(SIMULATION_SOURCE_ACCOUNT, '0');
      const tx = new TransactionBuilder(account, {
        fee: '100',
        networkPassphrase: preset.networkPassphrase,
      })
      .addOperation(contract.call(method, ...scValArgs))
      .setTimeout(30)
      .build();

      const simResult = await server.simulateTransaction(tx);
      
      if (rpc.Api.isSimulationError(simResult)) {
        throw new Error(simResult.error);
      }
      
      if (rpc.Api.isSimulationSuccess(simResult)) {
        if (simResult.result && simResult.result.retval) {
          // Attempt to decode retval
          setResult('Simulation Success: ' + JSON.stringify(simResult.result.retval, null, 2));
        } else {
          setResult('Simulation Success: (no return value)');
        }
      } else {
        throw new Error('Simulation failed or is not ready');
      }

    } catch (err: unknown) {
      setError((err as Error).message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="soroban-contract-ui">
      <h3>Soroban Contract: {contractId.substring(0, 8)}...{contractId.substring(contractId.length - 8)}</h3>
      
      <div className="form-group">
        <label>Method Name</label>
        <input 
          type="text" 
          value={method} 
          onChange={e => setMethod(e.target.value)} 
          placeholder="e.g. increment"
        />
      </div>

      <div className="form-group">
        <label>Arguments (comma separated JSON)</label>
        <input 
          type="text" 
          value={argsStr} 
          onChange={e => setArgsStr(e.target.value)} 
          placeholder='e.g. 42, "hello", true'
        />
      </div>

      <button onClick={simulateCall} disabled={loading || !method}>
        {loading ? 'Simulating...' : 'Simulate Invocation'}
      </button>

      {error && <div className="error-box">{error}</div>}
      {result && <pre className="result-box">{result}</pre>}
    </div>
  );
};
