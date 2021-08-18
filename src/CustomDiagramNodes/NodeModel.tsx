import {
  NodeModel as StormNodeModel,
  DefaultPortModel
} from "@projectstorm/react-diagrams";
import { BaseModelOptions } from "@projectstorm/react-canvas-core";

export interface NodeModelOptions extends BaseModelOptions {
  color?: string;
  title?: string;
  content?: string;
  source?: boolean;
  inputs?: string[];
  outputs?: string[];
}

export class NodeModel extends StormNodeModel {
  color: string;
  title: string;
  content: string | undefined;
  source: boolean;
  inputs: string[];
  outputs: string[];

  constructor(options: NodeModelOptions = {}) {
    super({
      ...options,
      type: "ts-custom-node"
    });
    this.color = options.color || "White";
    this.title = options.title || "Node";
    this.content = options.content || undefined;
    this.source = options.source || false;
    this.inputs = options.inputs || [];
    this.outputs = options.outputs || [];

    // setup an in and out port
    if (this.content && !this.source) {
      this.addPort(
        new DefaultPortModel({
          in: true,
          name: "In"
        })
      );
    } else {
      for (let i = 0; i < this.inputs.length; i++) {
        this.addPort(
          new DefaultPortModel({
            in: true,
            name: this.inputs[i]
          })
        );
      }
    }

    if (options.content) {
      this.addPort(
        new DefaultPortModel({
          in: false,
          name: "Out"
        })
      );
    } else {
      for (let i = 0; i < this.outputs.length; i++) {
        this.addPort(
          new DefaultPortModel({
            in: false,
            name: this.outputs[i]
          })
        );
      }
    }
  }

  serialize() {
    return {
      ...super.serialize(),
      color: this.color,
      title: this.title,
      content: this.content,
      source: this.source,
      inputs: this.inputs,
      outputs: this.outputs
    };
  }

  deserialize(event): void {
    super.deserialize(event);
    this.color = event.data.color;
    this.title = event.data.title;
    this.content = event.data.content;
    this.source = event.data.source;
    this.inputs = event.data.inputs;
    this.outputs = event.data.outputs;
  }
}
