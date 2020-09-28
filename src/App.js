import React from "react"
import "./App.css"
import BarChart from "./BarChart"
import PieChart from "./PieChart"
import Chart from "./Chart"
import TimeLine from "./TimeLine"

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <img src="https://raw.githubusercontent.com/d3/d3-logo/6d9c471aa852033501d00ca63fe73d9f8be82d1d/d3.svg" className="d3-logo" />
      <p>Hildas D3 Playground</p>
      </header>

      <div className="charts">
        <div className="chart-container">
          <p>Pie Chart</p>
          <PieChart
            width={200}
            height={200}
            innerRadius={60}
            outerRadius={100}
          />
        </div>
        <div className="chart-container">
          <p>Bar chart</p>
          <Chart />
        </div>
        <div className="chart-container">
          <p>Area chart timeline</p>
          <TimeLine />
        </div>
        <div className="chart-container">
          <p>Bar chart with labels</p>
          <BarChart />
        </div>
      </div>
    </div>
  )
}

export default App
