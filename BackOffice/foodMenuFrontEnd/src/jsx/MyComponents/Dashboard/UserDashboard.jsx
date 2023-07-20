import React from 'react'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { Button } from 'react-bootstrap';

function UserDashboard() {
  console.log(Cookies.get('role'));
  return (
    <div className='d-flex flex-column justify-content-center align-items-center text-center'>
      <hr></hr>
      <h1>Bienvenue dans votre Espace Personnel {Cookies.get('name')}</h1>
      <hr></hr>
      {(Cookies.get('role')==1) && <Link to={`/ShowRestaurant/${Cookies.get('restaurantId')}`} variant="primary"><Button>Accéder à votre Restaurant</Button></Link>}
     {Cookies.get('role')==2 && <Link to="/Orders" variant="primary"><Button>Accéder aux commandes de votre Restaurant</Button></Link>}
    </div>
  )
}

export default UserDashboard