import React, { useState, useEffect } from 'react';
import Sidebar, { SidebarItem } from "../components/Sidebar";
import { UsersRound, Notebook, SquarePen } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import NotAuthorized from '../pages/NotAuthorized';

const Dashboard = () => {
  const [selectedItem, setSelectedItem] = useState('/dashboard/conferencistas');
  const { state: locationState, } = useLocation();
  const [logged, setLogged] = useState(false); // Estado de autenticación
  const [renderNotAuthorized, setRenderNotAuthorized] = useState(false);

  // Verificar el estado de autenticación al cargar el componente
  useEffect(() => {
    const isUserLogged = localStorage.getItem('logged');
    if (isUserLogged === 'true') {
      setLogged(true);
    } else {
      setTimeout(() => {
        setRenderNotAuthorized(true);
      }, 500); // Renderizar NotAuthorized después de 1 segundo
    }
  }, []);

  // Verificar si la ubicación actual es la misma que el item seleccionado
  const isItemSelected = (item) => {
    return locationState?.pathname === item;
  };

  // Manejar el clic en un item del sidebar
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <>
      {logged ? (
        <div className="flex">
          <Sidebar>
            <Link to="/dashboard/conferencistas">
              <SidebarItem
                icon={<UsersRound size={20} />}
                text="conferencistas"
                active={isItemSelected('/dashboard/conferencistas')}
                onClick={() => handleItemClick('/dashboard/conferencistas')}
              />
            </Link>
            <Link to="/dashboard/auditorios">
              <SidebarItem
                icon={<Notebook size={20} />}
                text="auditorios"
                active={isItemSelected('/dashboard/auditorios')}
                onClick={() => handleItemClick('/dashboard/auditorios')}
              />
            </Link>
            <Link to="/dashboard/reservas">
              <SidebarItem
                icon={<SquarePen size={20} />}
                text="Matrículas"
                active={isItemSelected('/dashboard/reservas')}
                onClick={() => handleItemClick('/dashboard/reservas')}
              />
            </Link>
          </Sidebar>
          <div className="flex-grow">
            <Outlet />
          </div>
        </div>
      ) : (
        // Renderizar el componente NotAuthorized después de 1 segundo
        renderNotAuthorized && <NotAuthorized />
      )}
    </>
  );
};

export default Dashboard;
