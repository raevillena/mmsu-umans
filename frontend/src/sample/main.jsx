import React from 'react'
import Chiild1 from './chiild1'
import Child2 from './child2'
import { useState } from 'react'
import { Alert, Button, MenuItem, Select, TextField } from '@mui/material'


const Main = () => {
    const [data, setData3] = useState({
        province: "ilocos sur",
        name: "dexter",
        brgy: "23",
        country:"ilocos norte",
    });    

    const handledata = ( field, value) => {
         setData3({
            ...data,
            [field]: value,
        })
    }
    
  return (
    <div>
      <h1>this is main</h1>
      <Chiild1  data={data} handledata={handledata}/>
      <Child2 data={data} handledata={handledata}/>
      <Button variant="contained" color="primary" onClick={() => console.log(data)}>submit</Button>
    

    </div>
  )
}

export default Main
