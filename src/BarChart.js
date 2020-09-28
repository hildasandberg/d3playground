import React, { useEffect } from "react"
import * as d3 from "d3"

const BarChart = () => {
  const canvas = React.createRef()

  const drawBarChart = (data) => {
    const canvasHeight = 200
    const canvasWidth = 300
    const scale = 20
    const colors = d3.scaleOrdinal(d3.schemeCategory10)

    const svgCanvas = d3
      .select(canvas.current)
      .append("svg")
      .attr("width", canvasWidth)
      .attr("height", canvasHeight)

    svgCanvas
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("width", 40)
      .attr("height", (datapoint) => datapoint * scale)
      .attr("fill", (d, i) => colors(i))
      .attr("x", (datapoint, iteration) => iteration * 45)
      .attr("y", (datapoint) => canvasHeight - datapoint * scale)
      .style("opacity", 0)

    svgCanvas
      .selectAll("rect")
      .data(data)
      .transition()
      .duration((d, i) => i * 500)
      .style("opacity", 1)

    svgCanvas
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", (dataPoint, i) => i * 45 + 10)
      .attr("y", (dataPoint, i) => canvasHeight - dataPoint * scale - 10)
      .text((dataPoint) => dataPoint)
      .style("fill", "white")
      .style("opacity", 0)

      svgCanvas
      .selectAll("text")
      .data(data)
      .transition()
      .duration((d, i) => i * 500)
      .style("opacity", 1)
  }

  useEffect(() => {
    const data = [2, 4, 2, 6, 8, 5, 2, 1, 7]
    drawBarChart(data)
  })

  return <div ref={canvas} />
}

export default BarChart
