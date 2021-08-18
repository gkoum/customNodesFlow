import * as React from "react";
import FlowRenderer from "./FlowRenderer";
import Diagrams from "./Diagrams";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h2>React Flow Renderer</h2>
      <FlowRenderer />
      <hr />
      <h2>@Projectstorm/React Diagrams</h2>
      <Diagrams />
      <hr />
      <h2>Not implemented</h2>
      Selected state and validation (React Diagrams).
      <hr />
    </div>
  );
}
