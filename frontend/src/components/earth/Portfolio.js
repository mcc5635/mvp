import "../styling/Portfolio.css"
import React, { useState } from "react"
import LineGraph from "../Graphs/LineGraph"
import MapComponentOpenStreet from "../Map"
import FilterCard from "../Cards/FilterCards"
import FilterButton from "../Cards/FilterButton"
import ProgressChart from "../Graphs/ProgressBarCard"
import { Box, Grid, Typography, Button } from '@mui/material'
import Icon from '../styling/icon'
import DropDownButton from "../Dropdowns/DropdownButton"

const filterCards = [
  { title: "Climate Scenario", content: "Business as usual" },
  { title: "Risk Category", content: "Combined physical risk" },
  { title: "EarthScan Rating", content: "Very low to very high" },
  { title: "Year", content: "2020" },
];

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = ['Page A', 'Page B', 'Page C', 'Page D', 'Page E', 'Page F', 'Page G'];

const Portfolio = () => {
  const [selectedContent, setSelectedContent] = useState(null);
  const [openCard, setOpenCard] = useState(null);

  const handleOpen = (content) => {
    setOpenCard(content);
  };

  const handleCardSelect = (content) => {
    setSelectedContent(content);
  };


  return (
    <Box sx={{ ml: 5, mb: 5, gap: 5 }}>
      <Grid container spacing={0}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box className="box-header">
              <Typography variant="body2" color="black" sx={{ fontSize: '16px' }}>
                <Typography variant="body2" component="span" sx={{ padding: '0 4px', color: 'rgb(75, 63, 160)', fontSize: '16px' }}>
                  Cervest
                </Typography>{' '}
                <Typography variant="body2" component="span" sx={{ color: 'rgb(18, 14, 107)', fontSize: '16px' }}>{' > '}</Typography>
                <Typography variant="body2" component="span" sx={{ color: 'grey', fontSize: '16px' }}>
                  Commercial Real Estate
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
                  Create Climate Report
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
                  Manage Assets
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
            <Box className="cardscontainer-parent">
              <Box className='filtercards-container'>
                {filterCards.map((card, index) => (
                  <DropDownButton title={card.title} content={card.content} />
                ))}
              </Box>
              <Box className="filterbutton-container">
                <FilterButton />
              </Box>
            </Box>
          </Grid>

        </Grid>
        <div className="graphs-parent">
          <div style={{ width: "70%" }}>
            <Grid item xs={12} md={6} mt={3} sx={{ maxWidth: '100% !important' }}>
              <Box sx={{ ml: '3%' }}>
                <MapComponentOpenStreet height={750} showRange={true} />
              </Box>
            </Grid>
          </div>
          <div style={{ width: '30%' }}>
            <Grid item xs={12} mt={3} sx={{ maxWidth: '100% !important' }}>
              <Grid>
                <Box>
                  <ProgressChart progress={50} title={'Low Risk'} />
                </Box>
              </Grid>
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

export default Portfolio
