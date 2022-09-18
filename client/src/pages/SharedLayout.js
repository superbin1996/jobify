import Wrapper from "../assets/wrappers/SharedLayout"
import { Link, Outlet } from "react-router-dom"
import { Navbar, SmallSidebar, BigSidebar } from "../components/Index"

const SharedLayout = () => {
  return (
    <Wrapper>
      <main className="dashboard">
        <SmallSidebar></SmallSidebar>
        <BigSidebar></BigSidebar>
        <div>
          <Navbar></Navbar>
          <div className="dashboard-page">
            <Outlet/>
          </div>
        </div>
      </main>
    </Wrapper>
  )
}
export default SharedLayout