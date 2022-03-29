import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './components/dashboard';
import { IncomingTodos } from './components/incomingTodos';


export default function MainRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<IncomingTodos />} />
                <Route path='/dashboard' element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    )
}