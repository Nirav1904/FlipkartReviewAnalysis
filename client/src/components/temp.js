import React, { useState, useEffect } from "react";
import Chart from "./Chart";

function Example() {
  useEffect(() => {});

  return (
    <div>
      <Chart male="20" female="30" unknowns="50" />
    </div>
  );
}

export default Example;
