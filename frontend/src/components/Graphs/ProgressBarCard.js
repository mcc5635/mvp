import Card from '@mui/material/Card'
import ProgressBar from './ProgressBar.js'
import Icon from '../styling/icon/index.js'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

const ProgressChart = ({progress, title}) => {

  return (
    <Card sx={{backgroundColor: 'white', height: '300px', boxShadow: 'none' }}>
      <CardHeader
        title='Area of Interest'
        subheader=''
        sx={{ 
          textAlign: 'left',
          color: 'rgb(117, 116, 123)'
        }}
        titleTypographyProps={{
          sx:{
              fontSize: 20
          }
      }}
        subheaderTypographyProps={{ 
          sx: { 
            color: theme => `${theme.palette.text.disabled} !important`,
            textAlign: 'left', 
            fontSize: 15
          } 
        }}
        action={
          <div style={{ display: 'flex', gap: '8px', marginBottom: 5, marginRight: 5 }}>
            <Icon icon={'mdi-download'} fontSize={20} />
            <Icon icon={'mdi:share'} fontSize={20} />
            <Icon icon={'mdi:info'} fontSize={20} />
          </div>
        }
      />
      <CardContent sx={{}}>
        <ProgressBar progress={progress} title={title}/>
      </CardContent>
    </Card>
  )
}

export default ProgressChart
