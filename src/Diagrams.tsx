import * as React from "react";
import createEngine, {
  DefaultLinkModel,
  DiagramModel
} from "@projectstorm/react-diagrams";
import { NodeFactory } from "./CustomDiagramNodes/NodeFactory";
import { NodeModel } from "./CustomDiagramNodes/NodeModel";
import { CanvasWidget } from "@projectstorm/react-canvas-core";

// create an instance of the engine with all the defaults
const engine = createEngine();
engine.getNodeFactories().registerFactory(new NodeFactory());

// --- node source
const node1 = new NodeModel({
  color: "LemonChiffon",
  title: "OSIPI",
  content: "Source",
  source: true
});
node1.setPosition(100, 100);
// --- node data
const node2 = new NodeModel({
  color: "LightCyan",
  title: "some_source_data",
  content: "Data"
});
node2.setPosition(350, 100);
const node3 = new NodeModel({
  color: "LightCyan",
  title: "another_source_data",
  content: "Data"
});
node3.setPosition(350, 200);
const node4 = new NodeModel({
  color: "LightCyan",
  title: "uploaded_data",
  content: "Data",
  source: true
});
node4.setPosition(350, 300);
// --- node function
const node5 = new NodeModel({
  color: "Lavender",
  title: "some_function",
  inputs: ["Dataset", "Labels"],
  outputs: ["Model", "Error"]
});
node5.setPosition(650, 100);
// --- node outputs
const node6 = new NodeModel({
  color: "LightCyan",
  title: "generated_data",
  content: "Data"
});
node6.setPosition(900, 100);
const node7 = new NodeModel({
  color: "#E0FFE0",
  title: "generated_value",
  content: "= 0.8638"
});
node7.setPosition(900, 200);

// links
//const link = n1p2.link<DefaultLinkModel>(n2p1);
const link1 = new DefaultLinkModel();
link1.setSourcePort(node1.getPort("Out"));
link1.setTargetPort(node2.getPort("In"));
const link2 = new DefaultLinkModel();
link2.setSourcePort(node1.getPort("Out"));
link2.setTargetPort(node3.getPort("In"));
const link3 = new DefaultLinkModel();
link3.setSourcePort(node2.getPort("Out"));
link3.setTargetPort(node5.getPort("Dataset"));
const link4 = new DefaultLinkModel();
link4.setSourcePort(node4.getPort("Out"));
link4.setTargetPort(node5.getPort("Labels"));
const link5 = new DefaultLinkModel();
link5.setSourcePort(node5.getPort("Model"));
link5.setTargetPort(node6.getPort("In"));
const link6 = new DefaultLinkModel();
link6.setSourcePort(node5.getPort("Error"));
link6.setTargetPort(node7.getPort("In"));

// model
const model = new DiagramModel();
model.addAll(
  node1,
  node2,
  node3,
  node4,
  node5,
  node6,
  node7,
  link1,
  link2,
  link3,
  link4,
  link5,
  link6
);
engine.setModel(model);

const Diagrams = () => {
  return <CanvasWidget className="diagram-container" engine={engine} />;
};

export default Diagrams;
