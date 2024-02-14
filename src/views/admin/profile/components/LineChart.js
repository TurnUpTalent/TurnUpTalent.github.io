import React from "react";
import Chart from "react-apexcharts";

class LineChart extends React.Component {
  constructor(props) {
    super(props);

    const {xaxis, series, ...rest} = props;
    this.state = {
      options: {
        chart: {
          id: 'apexchart-example'
        },
        xaxis: xaxis,
      },
      series: series,
    }
  }



  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type='line'
        width='100%'
        height='100%'
      />
    );
  }
}

export default LineChart;
