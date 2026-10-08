import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { SorobanContractUI } from '../SorobanContractUI';
import { rpc } from '@stellar/stellar-sdk';

const mockSimulateTransaction = vi.fn();

vi.mock('@stellar/stellar-sdk', async () => {
  const actual = await vi.importActual<Record<string, unknown>>('@stellar/stellar-sdk');
  const actualRpc = actual.rpc as Record<string, unknown>;

  function MockServer(this: unknown, url: string) {
    return {
      serverURL: url,
      simulateTransaction: mockSimulateTransaction,
    };
  }

  return {
    ...actual,
    rpc: {
      ...actualRpc,
      Server: vi.fn().mockImplementation(MockServer),
    },
  };
});

describe('SorobanContractUI', () => {
  // A valid Stellar contract address encoded via StrKey
  const validContractId = 'CAAQCAIBAEAQCAIBAEAQCAIBAEAQCAIBAEAQCAIBAEAQCAIBAEAQC526';

  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('renders correctly smoke test', () => {
    const { getByText, getByPlaceholderText } = render(
      <SorobanContractUI contractId={validContractId} />
    );

    expect(getByText(/Soroban Contract:/)).toBeTruthy();
    expect(getByPlaceholderText('e.g. increment')).toBeTruthy();
    expect(getByText('Simulate Invocation')).toBeTruthy();
  });

  it('shows an error message instead of crashing when entering invalid JSON in args', async () => {
    const { getByPlaceholderText, getByText, findByText } = render(
      <SorobanContractUI contractId={validContractId} />
    );

    const methodInput = getByPlaceholderText('e.g. increment');
    fireEvent.change(methodInput, { target: { value: 'testMethod' } });

    const argsInput = getByPlaceholderText('e.g. 42, "hello", true');
    fireEvent.change(argsInput, { target: { value: '{invalid_json' } });

    const button = getByText('Simulate Invocation');
    fireEvent.click(button);

    const errorBox = await findByText(/Arguments must be valid JSON values separated by commas/);
    expect(errorBox).toBeTruthy();
    expect(mockSimulateTransaction).not.toHaveBeenCalled();
  });

  it('displays error from rpc.Api.isSimulationError when simulation fails with simulation error', async () => {
    mockSimulateTransaction.mockResolvedValue({
      error: 'Transaction simulation error: Transaction underfunded',
    });

    const { getByPlaceholderText, getByText, findByText } = render(
      <SorobanContractUI contractId={validContractId} />
    );

    const methodInput = getByPlaceholderText('e.g. increment');
    fireEvent.change(methodInput, { target: { value: 'testMethod' } });

    const button = getByText('Simulate Invocation');
    fireEvent.click(button);

    const errorBox = await findByText(/Transaction simulation error: Transaction underfunded/);
    expect(errorBox).toBeTruthy();
  });

  it('displays loading state during simulation and clears it on completion', async () => {
    let resolveSim: (val: unknown) => void = () => {};
    mockSimulateTransaction.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveSim = resolve;
        })
    );

    const { getByPlaceholderText, getByText, queryByText } = render(
      <SorobanContractUI contractId={validContractId} />
    );

    const methodInput = getByPlaceholderText('e.g. increment');
    fireEvent.change(methodInput, { target: { value: 'testMethod' } });

    const button = getByText('Simulate Invocation');
    fireEvent.click(button);

    expect(getByText('Simulating...')).toBeTruthy();

    resolveSim({
      transactionData: {},
      result: {
        retval: 'test_return_value',
      },
    });

    await waitFor(() => {
      expect(queryByText('Simulating...')).toBeNull();
      expect(getByText('Simulate Invocation')).toBeTruthy();
      expect(getByText(/Simulation Success/)).toBeTruthy();
    });
  });

  it('selects correct default RPC url for different network presets', async () => {
    mockSimulateTransaction.mockResolvedValue({
      transactionData: {},
      result: { retval: 'ok' },
    });

    // Testnet (default)
    const view1 = render(<SorobanContractUI contractId={validContractId} network="testnet" />);
    fireEvent.change(view1.getByPlaceholderText('e.g. increment'), { target: { value: 'test' } });
    fireEvent.click(view1.getByText('Simulate Invocation'));
    await waitFor(() => {
      expect(rpc.Server).toHaveBeenCalledWith('https://soroban-rpc.testnet.stellar.org');
    });
    view1.unmount();

    // Mainnet
    const view2 = render(<SorobanContractUI contractId={validContractId} network="mainnet" />);
    fireEvent.change(view2.getByPlaceholderText('e.g. increment'), { target: { value: 'test' } });
    fireEvent.click(view2.getByText('Simulate Invocation'));
    await waitFor(() => {
      expect(rpc.Server).toHaveBeenCalledWith('https://soroban-rpc.mainnet.stellar.org');
    });
    view2.unmount();

    // Futurenet
    const view3 = render(<SorobanContractUI contractId={validContractId} network="futurenet" />);
    fireEvent.change(view3.getByPlaceholderText('e.g. increment'), { target: { value: 'test' } });
    fireEvent.click(view3.getByText('Simulate Invocation'));
    await waitFor(() => {
      expect(rpc.Server).toHaveBeenCalledWith('https://rpc-futurenet.stellar.org');
    });
    view3.unmount();
  });
});
