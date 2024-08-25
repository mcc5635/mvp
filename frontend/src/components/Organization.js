import "./styling/Portfolio.css"
import React from "react"
import LineGraph from "./Graphs/LineGraph"
import MapComponentGIS from "./GIS"

import { Box, Grid, Typography, Button } from '@mui/material'
import Icon from './styling/icon'


const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = ['Page A', 'Page B', 'Page C', 'Page D', 'Page E', 'Page F', 'Page G'];

const Organization = () => {
  return (
    <Box sx={{ ml: 5, mb: 5, gap: 5 }}>
      <Grid container spacing={0}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box className="box-header">
              <Typography variant="body2" color="black" sx={{ fontSize: '16px' }}>
                <Typography variant="body2" component="span" sx={{ padding: '0 4px', color: 'rgb(0, 0, 0)', fontSize: '16px' }}>
                  Odyssey
                </Typography>{' '}
                <Typography variant="body2" component="span" sx={{ color: 'rgb(18, 14, 107)', fontSize: '16px' }}>{' > '}</Typography>
                <Typography variant="body2" component="span" sx={{ color: 'grey', fontSize: '16px' }}>
                  Open Sky
                </Typography>
              </Typography>
              <Box className='buttons-parent'>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: 'rgb(232, 233, 240)', color: '#666666', boxShadow: 'none', fontWeight: '600', padding: '2px 8px', fontSize: '11px', minWidth: 'auto', textTransform: 'none',
                    '&:hover': {
                      backgroundColor: 'rgb(232, 233, 240)',
                    },
                  }}
                >
                  Submit
                </Button>
                <Box sx={{ borderLeft: '1px solid grey', height: '24px', mx: 1 }} />
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: 'rgb(232, 233, 240)', color: '#666666', boxShadow: 'none', fontWeight: '600', padding: '2px 8px', fontSize: '11px', minWidth: 'auto', textTransform: 'none',
                    '&:hover': {
                      backgroundColor: 'rgb(232, 233, 240)',
                    },
                  }}
                >
                  <Icon icon={'mdi:account'} fontSize='1rem' />
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: 'rgb(232, 233, 240)', color: '#666666', boxShadow: 'none', fontWeight: '600', padding: '2px 8px', fontSize: '11px', minWidth: 'auto', textTransform: 'none',
                    '&:hover': {
                      backgroundColor: 'rgb(232, 233, 240)',
                    },
                  }}
                >
                  <Icon icon={'mdi:share'} fontSize='1rem' />
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <div className="graphs-parent">
          <div style={{ width: "80%" }}>
            <Grid item xs={12} md={6} mt={3} sx={{ maxWidth: '100% !important' }}>
              <Box sx={{ flex: 1, ml: '5%' }}>
                <MapComponentGIS height={950} showSearch={true}/>
              </Box>
            </Grid>
          </div>
          <div style={{ width: '20%' }}>
            <Grid item xs={12} mt={3} sx={{ maxWidth: '100% !important' }}>
              <Grid mt={3}>
                <Box>
                  <LineGraph uData={uData} pData={pData} xLabels={xLabels} />
                </Box>
              </Grid>
            </Grid>
          </div>
        </div>
      </Grid>
    </Box>
  );
}

export default Organization