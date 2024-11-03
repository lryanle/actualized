"use client";

import React, { useCallback, useState, useEffect } from 'react';
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

import { ConnectionLine } from './connectionline';
import CustomEdge from '@/components/logiceditor/CustomEdge';

import '@xyflow/react/dist/style.css';

import { Tool } from '@/types/tools';

const initialNodes: Node[] = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    markerEnd: { type: MarkerType.ArrowClosed, width: 24, height: 24 },
    animated: true,
    style: { stroke: '#71717a', strokeWidth: 2 },
    label: 'Edge Label',
    type: 'custom',
    data: { label: 'Edge Label' },
  },
];


export default function LogicEditor({ enabledTool }: { enabledTool: Tool }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [sourceNode, setSourceNode] = useState<string | null>(null);
  const [targetNode, setTargetNode] = useState<string | null>(null);

  // Load state from localStorage
  useEffect(() => {
    const savedNodes = JSON.parse(localStorage.getItem('flow-nodes') || '[]');
    const savedEdges = JSON.parse(localStorage.getItem('flow-edges') || '[]');
    if (savedNodes.length && savedEdges.length) {
      setNodes(savedNodes);
      setEdges(savedEdges);
    }
  }, [setNodes, setEdges]);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('flow-nodes', JSON.stringify(nodes));
    localStorage.setItem('flow-edges', JSON.stringify(edges));
  }, [nodes, edges]);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            markerEnd: { type: MarkerType.ArrowClosed, color: '#71717a', width: 12, height: 12 },
            animated: true,
            style: { stroke: '#71717a', strokeWidth: 4 },
            label: 'New Edge',
            type: 'custom',
          },
          eds
        )
      ),
    [setEdges]
  );


  const updateEdgeLabel = useCallback((id: string, newLabel: string) => {
    setEdges((eds) =>
      eds.map((edge) =>
        edge.id === id ? { ...edge, data: { ...edge.data, label: newLabel } } : edge
      )
    );
  }, [setEdges]);

  const edgeTypes = {
    custom: (props) => <CustomEdge {...props} onLabelChange={updateEdgeLabel} />,
  };

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
        markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12 },
        animated: true,
        style: { stroke: '#71717a', strokeWidth: 2 },
        label: 'Connected',
        type: 'custom',
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
          data: { label: `` },
        };
        setNodes((nds) => [...nds, newNode]);
      }
    },
    [enabledTool, nodes.length, setNodes]
  );

  const handleEdgeClick = useCallback(
    (event: React.MouseEvent, edge: Edge) => {
      if ((event.target as HTMLElement).tagName !== 'INPUT' && (event.target as HTMLElement).tagName !== 'TEXTAREA') {
        setEdges((eds) => eds.filter((e) => e.id !== edge.id));
      }
    },
    [setEdges]
  );

  if (sourceNode && targetNode) {
    addEdgeFromInputs();
  }

  return (
    <div className="w-full h-full bg-gray-100">
      <ReactFlow
        className="w-full h-full"
        nodes={nodes.map((node) => ({
          ...node,
          data: {
            ...node.data,
            label: (
              <textarea
                style={{
                  resize: 'none',
                  width: '100%',
                  maxWidth: '200px',
                  outline: 'none',
                  borderRadius: '8px',
                  padding: '4px 8px',
                  fontFamily: 'Inter, sans-serif',
                }}
                className="bg-gray-50 border border-gray-300 shadow-md placeholder-gray-400 text-gray-900"
                placeholder="Enter logic here..."
                value={node.data.label as string}
                onChange={(e) =>
                  setNodes((nds) =>
                    nds.map((n) =>
                      n.id === node.id ? { ...n, data: { ...n.data, label: e.target.value } } : n
                    )
                  )
                }
              />
            ),
          },
          style: {
            ...node.style,
            width: 'fit-content',
            padding: '10px',
            backgroundColor: '#f9fafb',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
          },
        }))}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(event, node) => handleNodeClick(node.id)}
        onEdgeClick={handleEdgeClick}
        onPaneClick={handlePaneClick}
        connectionLineComponent={ConnectionLine}
        edgeTypes={edgeTypes}
      />
    </div>
  );
}
