import React, { useState } from "react";
import * as R from "ramda";
import ReactFlow, {
  removeElements,
  addEdge,
  isEdge,
  Background,
  Controls,
  MiniMap
} from "react-flow-renderer";

import SourceNode from "./CustomFlowNodes/SourceNode";
import DataNode from "./CustomFlowNodes/DataNode";
import FunctionNode from "./CustomFlowNodes/FunctionNode";
import ValueNode from "./CustomFlowNodes/ValueNode";

const nodeTypes = {
  sourceNode: SourceNode,
  dataNode: DataNode,
  functionNode: FunctionNode,
  valueNode: ValueNode
};

const onLoad = (reactFlowInstance) => reactFlowInstance.fitView();
const onNodeContextMenu = (event, node) => {
  event.preventDefault();
  console.log("context menu:", node);
};

const newElements = [
  {
    id: "0",
    type: "sourceNode",
    data: { name: "OSIPI12" },
    position: { x: 0, y: 80 }
  },
  {
    id: "1",
    type: "dataNode",
    data: { name: "some_source_data" },
    position: { x: 200, y: 80 }
  },
  {
    id: "2",
    type: "dataNode",
    data: { name: "another_source_data" },
    position: { x: 200, y: 180 }
  },
  {
    id: "3",
    type: "dataNode",
    data: { name: "uploaded_data", uploaded: true },
    position: { x: 200, y: 280 }
  },
  {
    id: "4",
    type: "functionNode",
    data: {
      name: "some_function",
      inputs: [
        { label: "Dataset", type: "data" },
        { label: "Labels", type: "data" }
      ],
      outputs: [
        { label: "Model", type: "data" },
        { label: "Error", type: "value" }
      ]
    },
    position: { x: 500, y: 80 }
  },
  {
    id: "5",
    type: "dataNode",
    data: { name: "generated_data" },
    position: { x: 700, y: 80 }
  },
  {
    id: "6",
    type: "valueNode",
    data: { name: "generated_value", value: "0.8638" },
    position: { x: 700, y: 180 }
  },
  { id: "e0-1", source: "0__o__data", target: "1__i__data", animated: false },
  { id: "e0-2", source: "0__o__data", target: "2__i__data", animated: false },
  {
    id: "e1-4",
    source: "1__o__data",
    target: "4__i-Dataset__data",
    animated: true
  },
  {
    id: "e3-4",
    source: "3__o__data",
    target: "4__i-Labels__data",
    animated: false
  },
  {
    id: "e4-5",
    source: "4__o-Model__data",
    target: "5__i__data",
    animated: false
  },
  {
    id: "e4-6",
    source: "4__o-Error__value",
    target: "6__i__value",
    animated: false
  }
];

const HorizontalFlow = () => {
  const [elements, setElements] = useState(newElements);
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => {
    const allEdges = R.filter(isEdge, elements);
    const matchingEdges = R.filter(
      (edge) => edge.target === params.target,
      allEdges
    );
    setElements((els) => removeElements(matchingEdges, els));
    setElements((els) => addEdge(params, els));
  };

  return (
    <ReactFlow
      elements={elements}
      elementsSelectable={true}
      selectNodesOnDrag={true}
      nodeTypes={nodeTypes}
      onElementsRemove={onElementsRemove}
      onConnect={onConnect}
      onLoad={onLoad}
      onNodeContextMenu={onNodeContextMenu}
    >
      <Background variant="lines" gap={24} size={1} />
      <Controls />
      <MiniMap
        nodeColor={(node) => {
          switch (node.type) {
            case "valueNode":
              return "LightGreen";
            case "dataNode":
              return "LightBlue";
            case "functionNode":
              return "Lavender";
            case "sourceNode":
              return "Gold";
            default:
              return "#eee";
          }
        }}
      />
    </ReactFlow>
  );
};

export default HorizontalFlow;
