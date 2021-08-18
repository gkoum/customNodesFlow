import React, { memo } from "react";
import * as R from "ramda";
import { Handle } from "react-flow-renderer";
import Node, { contentStyle as style } from "./Node";

const isValidInput = (connection) => {
  return R.last(R.split("__", connection.source)) === "value";
};
const isValidOutput = (connection) => {
  return R.last(R.split("__", connection.target)) === "value";
};

const ValueNode = ({ data, selected }) => {
  return (
    <Node
      label={data.name}
      color={"#E0FFE0"}
      selected={selected}
      content={
        <div style={style.io}>
          {"= " + data.value}
          <Handle
            type="target"
            position="left"
            id="i__value"
            style={{ ...style.handle, ...style.left }}
            isValidConnection={isValidInput}
          />
          <Handle
            type="source"
            position="right"
            id="o__value"
            style={{ ...style.handle, ...style.right }}
            isValidConnection={isValidOutput}
          />
        </div>
      }
    />
  );
};

export default memo(ValueNode);
