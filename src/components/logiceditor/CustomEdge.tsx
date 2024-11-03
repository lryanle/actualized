import React, { FC, useState, useRef, useEffect } from 'react';
import {
  getBezierPath,
  EdgeLabelRenderer,
  BaseEdge,
  EdgeProps,
  Edge,
} from '@xyflow/react';

interface CustomEdgeProps extends EdgeProps<Edge<{ label: string }>> {
  onLabelChange: (id: string, newLabel: string) => void;
}

const CustomEdge: FC<CustomEdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  onLabelChange,
}) => {
  const [inputValue, setInputValue] = useState<string>(data?.label || '');
  const inputRef = useRef<HTMLInputElement | null>(null);

  
  useEffect(() => {
    setInputValue(data?.label || '');
  }, [data?.label]);

  
  const saveLabel = () => {
    if (data?.label !== inputValue) {
      onLabelChange(id, inputValue);
    }
  };

  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveLabel();
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  };

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            background: '#ffffff',
            padding: '4px 8px',
            borderRadius: '4px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif',
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => {
              e.stopPropagation();
              setInputValue(e.target.value);
            }}
            onClick={handleClick}
            onFocus={() => handleClick}
            onBlur={saveLabel}
            onKeyDown={handleKeyDown}
            style={{
              border: '1px solid #d1d5db',
              backgroundColor: 'white',
              outline: 'none',
              padding: '2px 4px',
              borderRadius: '4px',
              fontSize: '12px',
              fontFamily: 'Inter, sans-serif',
              width: '150px',
            }}
          />
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;
