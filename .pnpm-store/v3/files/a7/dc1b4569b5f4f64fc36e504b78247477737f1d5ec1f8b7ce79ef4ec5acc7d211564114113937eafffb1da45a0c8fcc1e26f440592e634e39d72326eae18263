import * as React from 'react';
import { getGPUTier } from 'detect-gpu';
import { useAsset } from 'use-asset';

function useDetectGPU(props) {
  React.useState(null);
  return useAsset(() => getGPUTier(props), 'useDetectGPU');
}

export { useDetectGPU };
