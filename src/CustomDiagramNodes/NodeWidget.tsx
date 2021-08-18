import * as React from "react";
import clsx from "clsx";
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams-core";
import { NodeModel } from "./NodeModel";

export interface NodeWidgetProps {
  node: NodeModel;
  engine: DiagramEngine;
}

export interface NodeWidgetState {}

class NodeAbstractWidget extends React.Component<
  NodeWidgetProps,
  NodeWidgetState
> {
  constructor(props: NodeWidgetProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={clsx("custom-node-port")}>
        {!this.props.node.source && (
          <PortWidget
            engine={this.props.engine}
            port={this.props.node.getPort("In")}
            className={clsx("circle-porter", "circle-porter-in")}
          >
            <div className={clsx("circle-port")} />
          </PortWidget>
        )}
        {this.props.node.content}
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("Out")}
          className={clsx("circle-porter", "circle-porter-out")}
        >
          <div className={clsx("circle-port")} />
        </PortWidget>
      </div>
    );
  }
}

class NodeFunctionWidget extends React.Component<
  NodeWidgetProps,
  NodeWidgetState
> {
  constructor(props: NodeWidgetProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        {this.props.node.inputs.length > 0 && (
          <div className="custom-node-subheader">{"Inputs"}</div>
        )}
        {this.props.node.inputs.map((input, index) => (
          <div
            key={"i-" + index}
            className={clsx("custom-node-port", "custom-node-port-in")}
          >
            <PortWidget
              engine={this.props.engine}
              port={this.props.node.getPort(input)}
              className={clsx("circle-porter", "circle-porter-in")}
            >
              <div className={clsx("circle-port")} />
            </PortWidget>
            {input}
          </div>
        ))}

        {this.props.node.outputs.length > 0 && (
          <div className="custom-node-subheader">{"Outputs"}</div>
        )}
        {this.props.node.outputs.map((output, index) => (
          <div
            key={"o-" + index}
            className={clsx("custom-node-port", "custom-node-port-out")}
          >
            {output}
            <PortWidget
              engine={this.props.engine}
              port={this.props.node.getPort(output)}
              className={clsx("circle-porter", "circle-porter-out")}
            >
              <div className={clsx("circle-port")} />
            </PortWidget>
          </div>
        ))}
      </>
    );
  }
}

export class NodeWidget extends React.Component<
  NodeWidgetProps,
  NodeWidgetState
> {
  constructor(props: NodeWidgetProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="custom-node">
        <div
          className="custom-node-header"
          style={{ backgroundColor: this.props.node.color }}
        >
          {this.props.node.title}
        </div>
        {this.props.node.content ? (
          <NodeAbstractWidget
            node={this.props.node}
            engine={this.props.engine}
          />
        ) : (
          <NodeFunctionWidget
            node={this.props.node}
            engine={this.props.engine}
          />
        )}
      </div>
    );
  }
}
