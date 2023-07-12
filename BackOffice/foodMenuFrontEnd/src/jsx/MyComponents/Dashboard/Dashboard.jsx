import Cookies from 'js-cookie'
import React from 'react'
import { Button } from 'react-bootstrap';
import AdminDashboard from './AdminDashboard';
import SuperAdminDashboard from './SuperAdminDashboard';
import UserDashboard from './UserDashboard';

function Dashboard() {
  
      return (
        <>
        <div> <h1 className='text-center'>{Cookies.get('accessType') ? "Acceuil" : <div><h1>Vous etes pas connecte</h1><Button onClick={()=>{window.location.href="/login"}}>Se connecter</Button></div>}</h1>
        {Cookies.get('accessType')==="superadmin" && <SuperAdminDashboard/> }
        {Cookies.get('accessType')==="admin" && <AdminDashboard/> }
        {Cookies.get('accessType')==="user" && <UserDashboard/> }
       
        
        </div>
      
      </>
      );
    
}

export default Dashboard