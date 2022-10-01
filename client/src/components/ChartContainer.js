import { useState } from 'react'
import { BarChartComponent, AreaChartComponent } from './index'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/ChartsContainer'

const ChartContainer = () => {
  const { monthlyApplications: data } = useAppContext()
  const [barChart, setBarChart] = useState(true)
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button onClick={() => setBarChart(!barChart)}>
        {barChart ? 'Bar Chart' : 'Area Chart'}
      </button>
      {barChart ? <BarChartComponent data={data} /> :
        <AreaChartComponent data={data} />}
    </Wrapper>
  )
}
export default ChartContainer