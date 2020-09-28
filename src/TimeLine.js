import React, { useEffect } from "react"
import * as d3 from "d3"

const TimeLine = () => {
  const chart = React.createRef()

  const colors = d3
    .scaleOrdinal(d3.schemeCategory10)
    .domain(["blue", "orange", "green", "red", "purple", "brown", "pink"])

  let data = [
    {
      date: "2019-01-02",
      value: 28,
    },
    {
      date: "2019-01-09",
      value: 35,
    },
    {
      date: "2019-01-16",
      value: 60,
    },
    {
      date: "2019-01-23",
      value: 55,
    },
    {
      date: "2019-01-30",
      value: 70,
    },
    {
      date: "2019-02-06",
      value: 69,
    },
    {
      date: "2019-02-13",
      value: 98,
    },
  ]

  const drawChart = () => {
    const margin = { top: 20, right: 20, bottom: 40, left: 45 }
    const svgWidth = 340
    const svgHeight = 200
    const width = svgWidth - margin.left - margin.right
    const height = svgHeight - margin.top - margin.bottom

    data = data.map((d) => {
      d["date"] = new Date(d["date"])
      return d
    })

    const getX = (d) => d["date"]
    const getY = (d) => d["value"]

    const x = d3
      .scaleTime()
      .range([0, width])
      .domain([d3.min(data, getX), d3.max(data, getX)])

    const y = d3
      .scaleLinear()
      .range([height, 0])
      .domain([d3.min(data, getY), d3.max(data, getY)])
      .nice()

    const valueLine = d3
      .area()
      .x((d) => x(getX(d)))
      .y0(height)
      .y1((d) => y(getY(d)))

    const svg = d3
      .select(chart.current)
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight)

    const defs = svg.append("defs")

    const graphArea = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)

    const bgGradient = defs
      .append("linearGradient")
      .attr("id", "bg-gradient")
      .attr("gradientTransform", "rotate(90)")

    bgGradient
      .append("stop")
      .attr("stop-color", colors("pink"))
      .attr("offset", "0%")

    bgGradient
      .append("stop")
      .attr("stop-color", colors("orange"))
      .attr("offset", "100%")

    defs
      .append("clipPath")
      .attr("id", "clip-line-path")
      .append("path")
      .attr("d", valueLine(data))
      .attr("class", "value-line")

    const clipPath = graphArea
      .append("g")
      .attr("clip-path", `url(#clip-line-path)`)

    clipPath
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 0)
      .attr("height", height)
      .style("fill", "url(#bg-gradient)")

    clipPath.selectAll("rect").transition().duration(2000).attr("width", width)

    const xAxis = d3.axisBottom(x).ticks(data.length)
    const yAxis = d3.axisLeft(y).ticks(5)

    graphArea
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis)

    graphArea.append("g").attr("class", "axis").call(yAxis)
  }

  useEffect(() => {
    drawChart()
  })

  return <div ref={chart} />
}

export default TimeLine
