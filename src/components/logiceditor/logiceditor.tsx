"use client";

import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  MarkerType,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { Tool } from '@/types/tools';

const initialNodes: Node[] = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];

const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2', markerEnd: { type: MarkerType.Arrow } }];

export default function LogicEditor({ enabledTool }: { enabledTool: Tool }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [sourceNode, setSourceNode] = useState<string | null>(null);
  const [targetNode, setTargetNode] = useState<string | null>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, markerEnd: { type: MarkerType.Arrow } }, eds)),
    [setEdges],
  );

  const handleNodeClick = (nodeId: string) => {
    if (enabledTool === 'logicConnector') {
      if (!sourceNode) {
        setSourceNode(nodeId);
      } else if (sourceNode && !targetNode) {
        setTargetNode(nodeId);
      }
    }
  };

  const addEdgeFromInputs = () => {
    if (sourceNode && targetNode) {
      const newEdge: Edge = {
        id: `e${sourceNode}-${targetNode}`,
        source: sourceNode,
        target: targetNode,
        markerEnd: MarkerType.ArrowClosed,
      };
      setEdges((eds) => addEdge(newEdge, eds));
      setSourceNode(null);
      setTargetNode(null);
    }
  };

  const handlePaneClick = useCallback(
    (event: React.MouseEvent) => {
      if (enabledTool === 'logicBlock') {
        const bounds = event.currentTarget.getBoundingClientRect();
        const position = {
          x: event.clientX - bounds.left,
          y: event.clientY - bounds.top,
        };
        const newNode = {
          id: `${nodes.length + 1}`,
          position,
          data: { label: `${nodes.length + 1}` },
        };
        setNodes((nds) => [...nds, newNode]);
      }
    },
    [enabledTool, nodes.length, setNodes]
  );

  const handleEdgeClick = useCallback(
    (event: React.MouseEvent, edge: Edge) => {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    },
    [setEdges]
  );

  if (sourceNode && targetNode) {
    addEdgeFromInputs();
  }

  return (
    <div className="w-full h-full">
      <ReactFlow
        className="w-full h-full"
        nodes={nodes.map((node) => ({
          ...node,
          style: {
            ...node.style,
            ...(node.id === sourceNode || node.id === targetNode
              ? {
                  border: '2px solid blue',
                }
              : {}),
          },
        }))}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(event, node) => handleNodeClick(node.id)}
        onEdgeClick={handleEdgeClick}
        onPaneClick={handlePaneClick}
      />
    </div>
  );
}
