'use client';

import { useState, useEffect } from 'react';

interface MiniKitUser {
  fid: number;
  username?: string;
  displayName?: string;
  pfpUrl?: string;
  custodyAddress?: string;
}

interface MiniKitContext {
  user?: MiniKitUser;
}

export function useMiniKit() {
  const [context, setContext] = useState<MiniKitContext | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Simulate MiniKit initialization
    // In a real implementation, this would use @farcaster/miniapp-sdk
    const initMiniKit = async () => {
      try {
        // Mock user data for development
        const mockUser: MiniKitUser = {
          fid: 12345,
          username: 'cryptotracker',
          displayName: 'Crypto Tracker',
          pfpUrl: 'https://i.pravatar.cc/150?img=3',
        };

        setContext({ user: mockUser });
        setIsReady(true);
      } catch (error) {
        console.error('Failed to initialize MiniKit:', error);
        setIsReady(true);
      }
    };

    initMiniKit();
  }, []);

  return { context, isReady };
}
