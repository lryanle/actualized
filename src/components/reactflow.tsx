"use client";

import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Node,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

const initialNodes: Node[] = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [sourceNode, setSourceNode] = useState<string | null>(null);
  const [targetNode, setTargetNode] = useState<string | null>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const addNode = useCallback(() => {
    const newNode = {
      id: `${nodes.length + 1}`,
      position: { x: Math.random() * 400, y: Math.random() * 400 }, // Random position for the new node
      data: { label: `${nodes.length + 1}` },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [nodes, setNodes]);
  
  const handleNodeClick = (nodeId: string) => {
    if (!sourceNode) {
      setSourceNode(nodeId); // Set source node on first click
    } else if (sourceNode && !targetNode) {
      setTargetNode(nodeId); // Set target node on second click
    }
  };
  const addEdgeFromInputs = () => {
    if (sourceNode && targetNode) {
      const newEdge = {
        id: `e${sourceNode}-${targetNode}`,
        source: sourceNode,
        target: targetNode,
      };
      setEdges((eds) => addEdge(newEdge, eds));
      // Reset source and target after adding the edge
      setSourceNode(null);
      setTargetNode(null);
    }
  };

  // Define the styles object here
  const styles = {
    box: {
      width: '12vw',
      height: '5vh',
      border: '2px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      margin: '16px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f9f9f9',
    },
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}> {/* Set parent to flex row */}
        <div style={styles.box}>
          <button onClick={addNode} style={{ margin: '5px', padding: '5px' }}>
            Add Node
          </button>
        </div>
        <div style={styles.box}>
          <button onClick={addEdgeFromInputs} style={{ margin: '5px', padding: '5px' }}>
            Add Arrow
          </button>
        </div>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      />
    </div>
  );
}
