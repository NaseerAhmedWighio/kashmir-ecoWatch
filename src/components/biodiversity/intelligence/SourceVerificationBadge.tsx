'use client';

import React from 'react';
import { DataSource, DataQualityFlag, VerificationStatus } from '@/types/biodiversity';

interface SourceVerificationBadgeProps {
  dataSource: DataSource;
  showTooltip?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const SourceVerificationBadge: React.FC<SourceVerificationBadgeProps> = ({
  dataSource,
  showTooltip = true,
  size = 'md',
}) => {
  const getSourceIcon = (type: DataSource['type']) => {
    switch (type) {
      case 'inventory':
        return '📋';
      case 'monitoring':
        return '📊';
      case 'sighting':
        return '👁️';
      case 'legacy':
        return '📚';
      default:
        return '📄';
    }
  };

  const getQualityColor = (quality: DataQualityFlag | undefined) => {
    switch (quality) {
      case 'high':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'unverified':
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getVerificationColor = (status: VerificationStatus | undefined) => {
    switch (status) {
      case 'verified':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'reviewed':
        return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      case 'community':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'pending':
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getSourceLabel = (type: DataSource['type']) => {
    switch (type) {
      case 'inventory':
        return 'Inventory';
      case 'monitoring':
        return 'Monitoring';
      case 'sighting':
        return 'Sighting';
      case 'legacy':
        return 'Legacy';
    }
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  };

  return (
    <div className={`inline-flex flex-col gap-1 ${sizeClasses[size]}`}>
      <div className="flex items-center gap-2">
        {/* Source Type */}
        <span
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full border ${getQualityColor(dataSource.qualityFlag)}`}
          title={showTooltip ? getSourceLabel(dataSource.type) : undefined}
        >
          <span>{getSourceIcon(dataSource.type)}</span>
          <span className="font-medium">{getSourceLabel(dataSource.type)}</span>
        </span>

        {/* Quality Flag */}
        {dataSource.qualityFlag && (
          <span className="text-xs capitalize">{dataSource.qualityFlag} quality</span>
        )}
      </div>

      {/* Verification Info */}
      {(dataSource.verifiedBy || dataSource.verificationDate || dataSource.year) && (
        <div className="text-xs text-gray-600 flex items-center gap-2">
          {dataSource.verifiedBy && (
            <span>✓ Verified by {dataSource.verifiedBy}</span>
          )}
          {dataSource.verificationDate && (
            <span>• {new Date(dataSource.verificationDate).toLocaleDateString()}</span>
          )}
          {dataSource.year && !dataSource.verificationDate && (
            <span>• {dataSource.year}</span>
          )}
        </div>
      )}

      {/* Reference/Citation */}
      {dataSource.reference && showTooltip && (
        <div className="text-xs text-gray-500 italic mt-1">
          Source: {dataSource.reference}
        </div>
      )}

      {/* Confidence Score */}
      {dataSource.confidence !== undefined && (
        <div className="flex items-center gap-1 text-xs">
          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                dataSource.confidence >= 80
                  ? 'bg-green-500'
                  : dataSource.confidence >= 60
                  ? 'bg-yellow-500'
                  : 'bg-orange-500'
              }`}
              style={{ width: `${dataSource.confidence}%` }}
            />
          </div>
          <span className="text-gray-600">{dataSource.confidence}% confidence</span>
        </div>
      )}
    </div>
  );
};

export default SourceVerificationBadge;
