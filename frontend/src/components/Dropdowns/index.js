import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

const Dropdown = ({ items, title }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        height: '30px',
        left: 0,
        width: '600px',
        mt: 1,
        zIndex: 100,
        textAlign: 'left !important',
        boxShadow: 'none',
        cursor:'pointer'
      }}
    >
      <div style={{marginTop: '10px', backgroundColor: 'white', padding: '7px'}} className=''>
        
        <div style={{padding: '10px'}}>
          {title}
        </div>
      
      {items.map((item, index) => (
        <Card key={index} sx={{ mb: 0.5 , boxShadow: 'none', border: '1px solid rgb(217, 217, 214)'}}>
          <CardContent>
            <Typography>{item}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
    </Box>
  );
};

export default Dropdown;
