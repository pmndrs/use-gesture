import * as React from 'react';
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree } from 'three-mesh-bvh';

function useBVH(mesh, options) {
  React.useEffect(() => {
    if (mesh.current) {
      mesh.current.raycast = acceleratedRaycast;
      const geometry = mesh.current.geometry;
      geometry.computeBoundsTree = computeBoundsTree;
      geometry.disposeBoundsTree = disposeBoundsTree;
      geometry.computeBoundsTree(options);
      return () => {
        if (geometry.boundsTree) {
          geometry.disposeBoundsTree();
        }
      };
    }
  }, [mesh, options]);
}

export { useBVH };
