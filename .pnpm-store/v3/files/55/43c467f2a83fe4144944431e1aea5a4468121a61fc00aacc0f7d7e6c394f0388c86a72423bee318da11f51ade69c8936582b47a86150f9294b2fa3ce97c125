import * as React from 'react';
import { addEffect, addAfterEffect } from '@react-three/fiber';
import StatsImpl from 'three/examples/js/libs/stats.min';
import useEffectfulState from '../helpers/useEffectfulState.js';

function Stats({
  showPanel = 0,
  className,
  parent
}) {
  const stats = useEffectfulState(() => new StatsImpl(), []);
  React.useEffect(() => {
    if (stats) {
      const node = parent && parent.current || document.body;
      stats.showPanel(showPanel);
      node == null ? void 0 : node.appendChild(stats.dom);
      if (className) stats.dom.classList.add(className);
      const begin = addEffect(() => stats.begin());
      const end = addAfterEffect(() => stats.end());
      return () => {
        node == null ? void 0 : node.removeChild(stats.dom);
        begin();
        end();
      };
    }
  }, [parent, stats, className, showPanel]);
  return null;
}

export { Stats };
