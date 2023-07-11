import axios from 'axios';
import Cookie from 'js-cookie'
import React, { useEffect } from 'react'
import { baseURL } from '../../../api/baseURL';

function Logout() {
    
    useEffect(() => {
        axios.get(`${baseURL}/admin/logout`)
        .then(()=>{
          Cookie.remove('name')
      Cookie.remove('role');
    Cookie.remove('accessToken');
  Cookie.remove('accessType');
  window.location.href ='/login';})
        .catch((err) => console.log(err))

        
      }, [] );

  return (
    <div>Logging out</div>
  )
}

export default Logout