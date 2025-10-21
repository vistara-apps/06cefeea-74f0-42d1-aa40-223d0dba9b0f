'use client';

import { useState, useCallback } from 'react';
import { useWalletClient, useAccount, usePublicClient } from 'wagmi';
import { parseUnits, type Address } from 'viem';

// USDC contract on Base
const USDC_BASE = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as Address;

export interface PaymentRequest {
  amount: number; // Amount in USD
  recipient?: Address;
  memo?: string;
}

export interface PaymentResult {
  success: boolean;
  transactionHash?: string;
  error?: string;
}

export interface PaymentStatus {
  isPending: boolean;
  isConfirming: boolean;
  isSuccess: boolean;
  isError: boolean;
  transactionHash?: string;
  error?: string;
}

export function useX402Payment() {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const [status, setStatus] = useState<PaymentStatus>({
    isPending: false,
    isConfirming: false,
    isSuccess: false,
    isError: false,
  });

  // Make a payment using x402 flow (placeholder - requires backend integration)
  // To implement: Create a backend API that supports x402 protocol
  // Then use withPaymentInterceptor from 'x402-axios' with a custom signer adapter
  const makePayment = useCallback(
    async (request: PaymentRequest): Promise<PaymentResult> => {
      if (!walletClient || !address) {
        return {
          success: false,
          error: 'Wallet not connected',
        };
      }

      // TODO: Implement x402 integration
      // This would require a backend API endpoint and custom wallet adapter
      // For now, use sendUSDC for direct USDC transfers
      console.log('x402 payment request:', request);

      return {
        success: false,
        error: 'x402 payment API integration required - use sendUSDC for direct transfers',
      };
    },
    [walletClient, address]
  );

  // Direct USDC payment on Base
  const sendUSDC = useCallback(
    async (to: Address, amount: number): Promise<PaymentResult> => {
      if (!walletClient || !address) {
        return {
          success: false,
          error: 'Wallet not connected',
        };
      }

      setStatus({
        isPending: true,
        isConfirming: false,
        isSuccess: false,
        isError: false,
      });

      try {
        const ERC20_ABI = [
          {
            name: 'transfer',
            type: 'function',
            stateMutability: 'nonpayable',
            inputs: [
              { name: 'to', type: 'address' },
              { name: 'amount', type: 'uint256' },
            ],
            outputs: [{ name: '', type: 'bool' }],
          },
        ] as const;

        // Convert amount to USDC units (6 decimals)
        const amountInUnits = parseUnits(amount.toString(), 6);

        // Send transaction
        const hash = await walletClient.writeContract({
          address: USDC_BASE,
          abi: ERC20_ABI,
          functionName: 'transfer',
          args: [to, amountInUnits],
          account: address,
        });

        setStatus({
          isPending: false,
          isConfirming: true,
          isSuccess: false,
          isError: false,
          transactionHash: hash,
        });

        // Wait for confirmation if publicClient is available
        if (publicClient) {
          await publicClient.waitForTransactionReceipt({ hash });
        }

        setStatus({
          isPending: false,
          isConfirming: false,
          isSuccess: true,
          isError: false,
          transactionHash: hash,
        });

        return {
          success: true,
          transactionHash: hash,
        };
      } catch (error) {
        console.error('USDC transfer error:', error);

        const errorMessage = (error as { message?: string }).message || 'USDC transfer failed';

        setStatus({
          isPending: false,
          isConfirming: false,
          isSuccess: false,
          isError: true,
          error: errorMessage,
        });

        return {
          success: false,
          error: errorMessage,
        };
      }
    },
    [walletClient, address, publicClient]
  );

  const reset = useCallback(() => {
    setStatus({
      isPending: false,
      isConfirming: false,
      isSuccess: false,
      isError: false,
    });
  }, []);

  return {
    makePayment,
    sendUSDC,
    status,
    reset,
    isReady: !!walletClient && !!address,
  };
}
