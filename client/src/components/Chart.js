/* App.js */
import React, { Component } from "react";
import CanvasJSReact from "./canvasjs.react";
import "./Charts.css";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Chart extends Component {
  render() {
    const options = {
      animationEnabled: true,
      title: {
        text: "Customer reviews Classification",
      },
      subtitles: [
        {
          text: ``,
          verticalAlign: "center",
          fontSize: 24,
          dockInsidePlotArea: true,
        },
      ],
      data: [
        {
          type: "doughnut",
          showInLegend: true,
          indexLabel: "{name}: {y}",
          yValueFormatString: "#,###'%'",
          dataPoints: [
            { name: "Male", y: this.props.male },
            { name: "Female", y: this.props.female },
            { name: "Unknowns", y: this.props.unknowns },
          ],
        },
      ],
    };
    return (
      <div className="ChartDiv">
        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}

export default Chart;
