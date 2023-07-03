import axios from 'axios';
import React, { useEffect } from 'react'
import { baseURL } from '../../../api/baseURL';
import { useHistory } from 'react-router-dom';

function Logout() {
    const navigation = useHistory();
    useEffect(() => {
        axios.get(`${baseURL}/admin/logout`)
        .then(navigation.push('/login'))
        .catch((err) => console.log(err))

        
      }, [] );

  return (
    <div>Logging out</div>
  )
}

export default Logout