'use client';

import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from '@coinbase/onchainkit/identity';

export function ConnectWalletButton() {
  return (
    <div className="flex items-center">
      <Wallet>
        <ConnectWallet className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg shadow-accent/20">
          <Avatar className="h-6 w-6" />
          <Name />
        </ConnectWallet>
        <WalletDropdown className="bg-surface border border-white/10 rounded-lg shadow-xl">
          <Identity className="px-4 py-3 hover:bg-bg/50" hasCopyAddressOnClick>
            <Avatar />
            <Name />
            <Address />
            <EthBalance />
          </Identity>
          <WalletDropdownDisconnect className="hover:bg-danger/10 text-danger" />
        </WalletDropdown>
      </Wallet>
    </div>
  );
}
