import * as React from 'react';
import { useTexture } from './useTexture.js';
import { matcapList } from '../helpers/matcap-assets.js';

function getFormatString(format) {
  switch (format) {
    case 64:
      return '-64px';

    case 128:
      return '-128px';

    case 256:
      return '-256px';

    case 512:
      return '-512px';

    default:
      return '';
  }
}

const MATCAP_ROOT = 'https://rawcdn.githack.com/emmelleppi/matcaps/9b36ccaaf0a24881a39062d05566c9e92be4aa0d';
const DEFAULT_MATCAP = matcapList[0];
function useMatcapTexture(id = 0, format = 1024) {
  const numTot = React.useMemo(() => Object.keys(matcapList).length, []);
  const fileHash = React.useMemo(() => {
    if (typeof id === 'string') {
      return id;
    } else if (typeof id === 'number') {
      return matcapList[id];
    }

    return null;
  }, [id]);
  const fileName = `${fileHash || DEFAULT_MATCAP}${getFormatString(format)}.png`;
  const url = `${MATCAP_ROOT}/${format}/${fileName}`;
  const matcapTexture = useTexture(url);
  return [matcapTexture, url, numTot];
}

export { useMatcapTexture };
