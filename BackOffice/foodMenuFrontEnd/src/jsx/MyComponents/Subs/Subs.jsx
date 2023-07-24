import axios from 'axios';
import { MDBDataTable } from 'mdbreact';
import React, { useEffect, useState } from 'react';
import { baseURL } from '../../../api/baseURL';
import { Button } from 'react-bootstrap';

function Subs() {
  const [subs, setSubs] = useState([]);

  useEffect(async ()=>{
      try {
        const res = await axios.get(`${baseURL}/sub/`);
        console.log(res);
        setSubs(res.data.subs)
        
      } catch (error) {
        
      }
  }
  ,[])

  const data = {
    columns: [
     /// { label: 'ID', field: 'id', sort: 'asc', width: 100 },
      { label: 'Name', field: 'name', sort: 'asc' },
      { label: 'Email', field: 'email', sort: 'asc' },
      { label: 'Points', field: 'points', sort: 'asc' },
      { label: "Actions", field: "actions" },
    ],
    rows: subs.map((row) => ({
        ...row,
        actions: ( <div>
          <Button variant='info' onClick={() => {}}><i className='flaticon-381-edit'></i></Button>
          <Button variant='danger' onClick={() => {}} ><i className='flaticon-381-trash'></i></Button>
          </div>
        ),
      })),
  };
  return (
    <>
      <div className='text-center border border-primary'> <h1>Abonnés </h1></div>
      <div className='border m-3'>
      <MDBDataTable  striped
                small
                noBottomColumns
                hover
                data={data}></MDBDataTable>
      </div>
    </>
  )
}

export default Subs