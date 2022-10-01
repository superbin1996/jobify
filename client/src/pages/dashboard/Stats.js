import { useEffect } from "react"
import { StatsContainer, ChartContainer, Loading } from '../../components/index.js'
import { useAppContext } from "../../context/appContext.js"

const Stats = () => {
  const {
    showStats,
    isLoading,
    monthlyApplications,
  } = useAppContext()
  
  useEffect(() => {
    showStats()
  }, [])
  if (isLoading) {
    return <Loading center></Loading>
  }
  return (
    <>
      <StatsContainer></StatsContainer>
      {monthlyApplications.length > 0 &&
        <ChartContainer />}
    </>
  )
}
export default Stats