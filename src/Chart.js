import React, { useEffect } from "react"
import * as d3 from "d3"

const Chart = () => {
  const chart = React.createRef()

  const drawChart = (data) => {
    const colors = d3
      .scaleOrdinal(d3.schemeCategory10)
      .domain(["blue", "orange", "green", "red", "purple", "brown", "pink"])

    const margin = { top: 0, right: 20, bottom: 40, left: 45 }
    
    const svgWidth = 400
    const svgHeight = 240
    
    const width = svgWidth - margin.left - margin.right
    const height = svgHeight - margin.top - margin.bottom
    const rect_height = 26

    const barChartSvg = d3
      .select(chart.current)
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight)

    barChartSvg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("height", rect_height)
      .attr("y", (d, i) => 5 + i * (rect_height + 5))
      .attr("width", 0)
      .style("fill", "url(#bg-gradient-bar)")
      .attr("transform", `translate(0,20)`)

    barChartSvg
      .selectAll("rect")
      .transition()
      .duration(2000)
      .attr("width", (d) => (d * width) / d3.max(data))

    const x = d3
      .scaleLinear()
      .range([0, width])
      .domain([0, d3.max(data)])

    const xAxis = d3.axisBottom(x)
    barChartSvg.append("g").call(xAxis).attr("transform", `translate(0,${height-20})`)

    const defs = barChartSvg.append("defs")

    const bgGradient = defs
      .append("linearGradient")
      .attr("id", "bg-gradient-bar")
      .attr("gradientTransform", "rotate(0)")
    bgGradient
      .append("stop")
      .attr("stop-color", colors("blue"))
      .attr("offset", "0%")
    bgGradient
      .append("stop")
      .attr("stop-color", colors("green"))
      .attr("offset", "100%")
  }

  useEffect(() => {
    const dataset = [100, 120, 180, 120, 50]
    drawChart(dataset)
  })

  return <div ref={chart} />
}

export default Chart