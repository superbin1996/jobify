
import Landing from "./pages/Landing";
import {BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Error from "./pages/Error";
import Register from "./pages/Register";
import {Profile, Stats, SharedLayout, AllJobs, AddJob, ProtectedRoute} from "./pages/Index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <SharedLayout/>
          </ProtectedRoute>
        }>
          <Route index element={<Stats/>}></Route>
          <Route path='all-jobs' element={<AllJobs/>}></Route>
          <Route path='add-job' element={<AddJob/>}></Route>
          <Route path='profile' element={<Profile/>}></Route>
        </Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/landing' element={<Landing />}></Route>
        <Route path='*' element={<Error/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
