// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Icon from '../styling/icon'

const FilterButton = () => {

  return (
    <Card sx={{width: '22% !important', display:'flex', alignItems:'center' }}>
      <CardContent sx={{ py: theme => `${theme.spacing(0.25)} !important` }}>
        <Box sx={{ display: 'flex', alignItems: 'start' }}>
          
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'start', justifyContent:'center'}}>
            <Icon icon={'mdi:toggle-switch-outline'}/>
            {' '}
            <Typography variant='subtitle1' sx={{ml: 1}}>Filters</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default FilterButton
