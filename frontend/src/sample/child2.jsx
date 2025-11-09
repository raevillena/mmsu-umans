import { Button, TextField,Select,MenuItem } from '@mui/material'
import React from 'react'
import { useState } from 'react'


const Child2 = ({data, handledata}) => {
    const listd = [
        {id:1, name:"ilocos sur"},
        {id:2, name:"ilocos norte"},
        {id:3, name:"pangasinan"},
        {id:4, name:"la union"},
        {id:5, name:"abra"},
        {id:6, name:"apayao"},
        {id:7, name:"kalinga"},
        {id:8, name:"mountain province"},
    ]
    
    return (
    <div>
      <TextField label="brgy" value={data.brgy} onChange={(e)=> handledata("brgy",e.target.value)} variant="outlined" color="primary" />

      <Select label="Select" variant="outlined" color="primary"
        value={data.country}
        onChange={(e)=> handledata("country",e.target.value)}
        >
            {listd.map((item) =>(
                <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
            ))}

        </Select>
    </div>
  )
}

export default Child2
