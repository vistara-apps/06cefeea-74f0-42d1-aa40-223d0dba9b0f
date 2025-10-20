'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ImageIcon, ExternalLink } from 'lucide-react';
import type { NFT } from '../hooks/useOnchainPortfolio';

interface NFTGalleryProps {
  nfts: NFT[];
}

export function NFTGallery({ nfts }: NFTGalleryProps) {
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);

  if (nfts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-fg flex items-center gap-2">
        <ImageIcon size={20} className="text-accent" />
        Your NFTs on Base ({nfts.length})
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        {nfts.map((nft, index) => (
          <div
            key={`${nft.contractAddress}-${nft.tokenId}`}
            className="card p-0 overflow-hidden group hover:scale-[1.02] transition-all duration-200 cursor-pointer"
            onClick={() => setSelectedNFT(nft)}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="relative aspect-square bg-fg/5">
              {nft.image ? (
                <Image
                  src={nft.image}
                  alt={nft.name || 'NFT'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon size={32} className="text-fg/20" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
            <div className="p-2">
              <p className="text-sm font-medium text-fg truncate">
                {nft.name || `#${nft.tokenId}`}
              </p>
              {nft.collectionName && (
                <p className="text-xs text-fg/60 truncate">
                  {nft.collectionName}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* NFT Detail Modal */}
      {selectedNFT && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedNFT(null)}
        >
          <div
            className="card max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-square bg-fg/5 rounded-lg overflow-hidden mb-4">
              {selectedNFT.image ? (
                <Image
                  src={selectedNFT.image}
                  alt={selectedNFT.name || 'NFT'}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon size={64} className="text-fg/20" />
                </div>
              )}
            </div>
            
            <h3 className="text-xl font-bold text-fg mb-2">
              {selectedNFT.name || `#${selectedNFT.tokenId}`}
            </h3>
            
            {selectedNFT.collectionName && (
              <p className="text-sm text-fg/60 mb-4">
                {selectedNFT.collectionName}
              </p>
            )}
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-fg/60">Token ID:</span>
                <span className="text-fg font-mono">{selectedNFT.tokenId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-fg/60">Contract:</span>
                <span className="text-fg font-mono text-xs truncate max-w-[200px]">
                  {selectedNFT.contractAddress}
                </span>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <a
                href={`https://basescan.org/token/${selectedNFT.contractAddress}?a=${selectedNFT.tokenId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2 flex-1 justify-center"
              >
                <ExternalLink size={16} />
                View on Basescan
              </a>
              <button
                onClick={() => setSelectedNFT(null)}
                className="px-4 py-2 rounded-lg bg-fg/5 hover:bg-fg/10 text-fg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
