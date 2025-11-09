import { Button, TextField, Typography } from '@mui/material'
import React from 'react'

const Chiild1 = ({ data, handledata}) => {

  return (
    <div>
      <TextField label="province" value={data.province} onChange={(e)=> handledata("province",e.target.value)} variant="outlined" color="primary" />
      <TextField label="name" value={data.name} onChange={(e)=> handledata("name",e.target.value)} variant="outlined" color="primary" />
    </div>
  )
}

export default Chiild1
