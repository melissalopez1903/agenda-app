import { Outlet } from 'react-router-dom'

import Navbar from './Navbar';

const Layout = () => {
    return (
        <div>
            <h1>Agenda de contactos</h1>
            <Navbar />
            <Outlet />
        </div>
    );
}

export default Layout;
