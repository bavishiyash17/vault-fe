import DashBoard from './pages/Dashboard'
import Report from './pages/EventLog'
import { Routes, Route, BrowserRouter } from 'react-router'
import MainLayout from './pages/MainLayout'
function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route path="/threats" element={<DashBoard />} />
                        <Route path="/events" element={<Report />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
