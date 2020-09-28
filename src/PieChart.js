import React, { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

const Pie = (props) => {
  const generateData = (value, length = 5) =>
    d3.range(length).map((item, index) => ({
      date: index,
      value:
        value === null || value === undefined ? Math.random() * 100 : value,
    }))

  const [data, setData] = useState(generateData())

  const changeData = () => {
    setData(generateData())
  }

  const ref = useRef(null)
  const buttonRef = useRef(null)

  const createPie = d3
    .pie()
    .value((d) => d.value)
    .sort(null)

  const createArc = d3
    .arc()
    .innerRadius(props.innerRadius)
    .outerRadius(props.outerRadius)

  const colors = d3.scaleOrdinal(d3.schemeCategory10)

  const format = d3.format(".2f")

  useEffect(() => {
    const dataPie = createPie(data)
    const group = d3.select(ref.current)
    const groupWithData = group.selectAll("g.arc").data(dataPie)

    groupWithData.exit().remove()

    const groupWithUpdate = groupWithData
      .enter()
      .append("g")
      .attr("class", "arc")

    const path = groupWithUpdate
      .append("path")
      .merge(groupWithData.select("path.arc"))

    path
      .attr("class", "arc")
      .attr("d", createArc)
      .attr("fill", (d, i) => colors(i))
      .style("opacity", 0)

    path
      .transition()
      .duration((d, i) => 500 * i)
      .style("opacity", 1)

    const text = groupWithUpdate
      .append("text")
      .merge(groupWithData.select("text"))
      .style("opacity", 0)

    text
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("transform", (d) => `translate(${createArc.centroid(d)})`)
      .style("fill", "white")
      .style("font-size", 10)
      .text((d) => format(d.value))
      .transition()
      .duration((d, i) => 500 * i)
      .style("opacity", 1)

    const updateButton = d3.select(buttonRef.current)

    updateButton.selectAll("button").data(dataPie).style("opacity", 0)

    updateButton
      .selectAll("button")
      .transition()
      .duration(2000)
      .style("opacity", 1)
  })

  return (
    <div className="pie-container">
      <svg width={props.width} height={props.height}>
        <g
          ref={ref}
          transform={`translate(${props.outerRadius} ${props.outerRadius})`}
        />
      </svg>
      <div className="update-button-container" ref={buttonRef}>
        <button className="update-button" onClick={changeData}>
          Update
        </button>
      </div>
    </div>
  )
}

export default Pie
