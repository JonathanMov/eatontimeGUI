import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

// Components
import RequireAuth from './Components/RequireAuth';

// Pages
import Menu from './Pages/Menu.jsx';
import Home from './Pages/Home.jsx';
import Login from './Pages/Login.jsx';
import NotFound from './Pages/NotFound.jsx';
import AddPlate from './Pages/AddPlate.jsx';
import Employees from './Pages/Employees.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import NewEmployee from './Pages/NewEmployee.jsx';
import TableDetail from './Pages/TableDetail.jsx';
import RegisterTable from './Pages/RegisterTable.jsx';
import UpdateEmployee from './Pages/UpdateEmployee.jsx';
import TableDashboard from './Pages/TableDashboard.jsx';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/dashboard' element={<Dashboard />} >
                    <Route index element={
                        <RequireAuth requiredRole='ADMIN'>
                            <TableDashboard />
                        </RequireAuth>
                    } />
                    <Route path=':tableID' element={<TableDetail />} />
                    <Route path='addPlate' element={<AddPlate />} />
                    <Route path='newTable' element={
                        <RequireAuth requiredRole='ADMIN'>
                            <RegisterTable />
                        </RequireAuth>
                    } />

                </Route>
                <Route path='/menu' element={<Menu />} />
                <Route path='/login' element={<Login />} />
                <Route path='/employees' element={
                    <RequireAuth requiredRole='ADMIN'>
                        <Employees />
                    </RequireAuth>}
                >
                    <Route path='new' element={
                        <RequireAuth requiredRole='ADMIN'>
                            <NewEmployee />
                        </RequireAuth>
                    } />
                    <Route path='update/:employeeID' element={
                        <RequireAuth requiredRole='ADMIN'>
                            <NewEmployee />
                        </RequireAuth>
                    } />
                </Route>
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter >
    )
}

export default App;