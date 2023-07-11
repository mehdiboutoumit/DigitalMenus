import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseURL } from '../../../api/baseURL'
import { Button } from 'react-bootstrap';

function Accounts() {
  const [users, setUsers] = useState([]);

  const fetchData = ()=> {
    try {
      const res = axios.get(`${baseURL}/user/`);
      console.log(res);

      return res.data.users;
      
    } catch (error) {
      console.log(error);
    } 
  }

  useEffect(()=>{
    fetchData();
  },[])

  const handleEdit = ()=>{

  }
  const handleDelete = ()=>{

  }

  const data = {
    columns: [
     /// { label: 'ID', field: 'id', sort: 'asc', width: 100 },
      { label: 'Nom', field: 'name', sort: 'asc' },
      { label: 'Email', field: 'email', sort: 'asc' },
      { label: 'Type d\'acces', field: 'accessType', sort: 'asc' },
      { label: 'Role', field: 'role', sort: 'asc' },
      { label: "Actions", field: "actions" },
    ],
    rows: users.map((row) => ({
        ...row,
        actions: ( <div>
          <Button variant='info' onClick={() => handleEdit(row)}><i className='flaticon-381-edit'></i></Button>
          <Button variant='danger' onClick={() => handleDelete(row.id)} ><i className='flaticon-381-trash'></i></Button>
          </div>
        ),
      })),
  };

  return (
    <div>Accounts</div>
  )
}

export default Accounts