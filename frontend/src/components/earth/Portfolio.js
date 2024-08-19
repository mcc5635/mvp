

import "../styling/AssetLibrary.css"
import PortfolioCard from "../Cards/PortfolioCard"
import AddNew from "../AddPortfolio"
import DropDownPortfolio from "../Dropdowns/PortfolioDropdown"

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
  { title: "Open Earth Rating", content: "Very low to very high" },
  { title: "Year", content: "2020" },
];

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = ['Page A', 'Page B', 'Page C', 'Page D', 'Page E', 'Page F', 'Page G'];


const Portfolio = () => {
  return (
    <div className="ml-32">
      <h1 style={{ marginTop: '3%', textAlign: 'left', color: 'rgb(31,7,77)', fontSize: 70 }}>Welcome</h1>
      <div className="text-lg font-light text-center text-gray-500  border-gray-200 dark:text-gray-400 dark:border-gray-700">

        <ul className="flex flex-wrap ">
          <li className="me-6">
            <a
              href="#"
              className="inline-block p-2 text-[#1F074D] border-b-4 font-bold border-[#1F074D] rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
            >
              All
            </a>
          </li>
          <li className="me-6">
            <a
              href="#"

              className="inline-block p-2 border-b-2  border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              aria-current="page"
            >
              Personal Portfolios
            </a>
          </li>
          <li className="me-6">
            <a
              href="#"
              className="inline-block p-2 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            >
              Hotel Inc
            </a>
          </li>
          <li className="me-6">
            <a
              href="#"
              className="inline-block p-2 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            >
              Shared with me
            </a>
          </li>

        </ul>
      </div>

  return (
    <Box sx={{ ml: 5, mb: 5, gap: 5 }}>
      <Grid container spacing={0}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box className="box-header">
              <Typography variant="body2" color="black" sx={{ fontSize: '16px' }}>
                <Typography variant="body2" component="span" sx={{ padding: '0 4px', color: 'rgb(75, 63, 160)', fontSize: '16px' }}>
                  Interstellar
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
                  Generate Climate Report
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

      <div className="flex mt-5 mb-5 justify-between mr-20" >
        
        <div>
          <button type="button" className="py-2 px-3 me-2 mb-2 text-sm font-medium text-[#1f074d] focus:outline-none bg-[#e8e7f4] rounded-2xl border-4 border-gray-300 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 ">All Scenarios</button>
          <button type="button" className="py-2 px-3 me-2 mb-2 text-sm font-medium text-[#1f074d] focus:outline-none bg-[#e8e7f4] rounded-2xl border-4 border-gray-300 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100">Combined Physical Risk</button>
        </div>
        <div>
          <DropDownPortfolio></DropDownPortfolio>
        </div>
      </div>

      <div className="flex space-x-12">
        <AddNew></AddNew>
        <PortfolioCard text={'E'} color={'#ab3560'} title={"High Risk Hotels in Canada to Monitor"}  />
        <PortfolioCard text={'C'} color={'#e17471'} assets={30} />
        <PortfolioCard text={'B'} color={'#f8bc8a'}/>
        <PortfolioCard text={'B'} color={'#f8bc8a'}/>
      </div>

    </div>
  )
}

export default Portfolio

