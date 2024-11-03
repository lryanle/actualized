import React from 'react';
import { useConnection } from '@xyflow/react';

export const ConnectionLine = ({ fromX, fromY, toX, toY }) => {
  const { fromHandle } = useConnection();

  return (
    <g>
      <path
        fill="none"
        strokeWidth={4}
        className="animated stroke-muted-foreground stroke-4"
        d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
      />
      <circle
        cx={toX}
        cy={toY}
        r={4}
        stroke={fromHandle.id}
        strokeWidth={3}
        className="stroke-muted-foreground bg-muted-foreground stroke-4"
      />
    </g>
  );
};