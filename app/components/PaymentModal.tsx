'use client';

import { useState } from 'react';
import { X, CheckCircle, XCircle, Loader2, DollarSign, ExternalLink } from 'lucide-react';
import { useX402Payment } from '../hooks/useX402Payment';
import type { Address } from 'viem';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [memo, setMemo] = useState('');
  const { makePayment, sendUSDC, status, reset, isReady } = useX402Payment();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    // Use direct USDC transfer if recipient is provided, otherwise use x402 flow
    if (recipient && recipient.startsWith('0x')) {
      await sendUSDC(recipient as Address, amountNum);
    } else {
      await makePayment({
        amount: amountNum,
        memo,
      });
    }
  };

  const handleClose = () => {
    reset();
    setAmount('');
    setRecipient('');
    setMemo('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="card max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-fg flex items-center gap-2">
            <DollarSign className="text-accent" />
            Send USDC Payment
          </h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-fg/10 text-fg/60 hover:text-fg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {!isReady ? (
          <div className="text-center py-8">
            <p className="text-fg/60 mb-4">Please connect your wallet to make payments</p>
          </div>
        ) : status.isSuccess ? (
          <div className="text-center py-8">
            <CheckCircle size={64} className="text-success mx-auto mb-4" />
            <h3 className="text-xl font-bold text-fg mb-2">Payment Successful!</h3>
            {status.transactionHash && (
              <div className="mt-4">
                <p className="text-sm text-fg/60 mb-2">Transaction Hash:</p>
                <a
                  href={`https://basescan.org/tx/${status.transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline flex items-center gap-1 justify-center text-sm font-mono break-all"
                >
                  <span className="truncate max-w-[200px]">{status.transactionHash}</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            )}
            <button
              onClick={handleClose}
              className="btn-primary mt-6"
            >
              Close
            </button>
          </div>
        ) : status.isError ? (
          <div className="text-center py-8">
            <XCircle size={64} className="text-danger mx-auto mb-4" />
            <h3 className="text-xl font-bold text-fg mb-2">Payment Failed</h3>
            <p className="text-fg/60 mb-6">{status.error}</p>
            <button
              onClick={reset}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-fg mb-2">
                Amount (USDC)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 bg-bg border border-white/10 rounded-lg text-fg placeholder-fg/40 focus:outline-none focus:border-accent transition-colors"
                required
                disabled={status.isPending || status.isConfirming}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-fg mb-2">
                Recipient Address (Optional)
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="0x..."
                className="w-full px-4 py-3 bg-bg border border-white/10 rounded-lg text-fg placeholder-fg/40 focus:outline-none focus:border-accent transition-colors font-mono text-sm"
                disabled={status.isPending || status.isConfirming}
              />
              <p className="text-xs text-fg/40 mt-1">
                Leave empty to use x402 payment flow
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-fg mb-2">
                Memo (Optional)
              </label>
              <input
                type="text"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="Payment for..."
                className="w-full px-4 py-3 bg-bg border border-white/10 rounded-lg text-fg placeholder-fg/40 focus:outline-none focus:border-accent transition-colors"
                disabled={status.isPending || status.isConfirming}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-3 rounded-lg bg-fg/5 hover:bg-fg/10 text-fg transition-colors"
                disabled={status.isPending || status.isConfirming}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 btn-primary flex items-center justify-center gap-2"
                disabled={status.isPending || status.isConfirming}
              >
                {status.isPending || status.isConfirming ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    {status.isPending ? 'Processing...' : 'Confirming...'}
                  </>
                ) : (
                  <>
                    <DollarSign size={20} />
                    Send Payment
                  </>
                )}
              </button>
            </div>

            {status.isPending && (
              <div className="text-center text-sm text-fg/60 mt-4">
                Please confirm the transaction in your wallet
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
