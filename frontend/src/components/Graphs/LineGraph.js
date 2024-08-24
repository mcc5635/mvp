import * as React from 'react';
import CardHeader from '@mui/material/CardHeader'
import Icon from '../styling/icon'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

export default function LineGraph() {
    return (
        <div style={{backgroundColor:'white', padding: '16px'}}>
            <CardHeader
                title='Algorithms'
                subheader='Single'
                sx={{
                    textAlign: 'left',
                    color: 'rgb(117, 116, 123)',
                    padding: 0
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
                        fontSize: 15,
                    }
                }}
            />
            <FormControl fullWidth style={{paddingLeft: '16px', marginTop: '8px'}}>
                <InputLabel>Algorithm</InputLabel>
                <Select
                    label="Algorithm"
                    defaultValue=""
                >
                    <MenuItem value={'Cars'}>Cars</MenuItem>
                    <MenuItem value={'Planes'}>Planes</MenuItem>
                    <MenuItem value={'Aircraft'}>Aircraft</MenuItem>
                    <MenuItem value={'Railcars'}>Railcars</MenuItem>
                    <MenuItem value={'Moving vehicles'}>Moving vehicles</MenuItem>
                    <MenuItem value={'Road Congestion'}>Road Congestion</MenuItem>
                    <MenuItem value={'Tank farms'}>Tank farms</MenuItem>
                    <MenuItem value={'Trucks'}>Trucks</MenuItem>
                    <MenuItem value={'Ships'}>Ships</MenuItem>
                </Select>
            </FormControl>

            <Divider style={{ margin: '16px 0' }} />

            <CardHeader
                title='Time Range and Constraints'
                subheader='Combinable'
                sx={{
                    textAlign: 'left',
                    color: 'rgb(117, 116, 123)',
                    padding: 0
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
                        fontSize: 15,
                    }
                }}
            />
            <div style={{paddingLeft: '16px', marginTop: '8px'}}>
                <FormControl fullWidth style={{ marginBottom: '8px' }}>
                    <TextField
                        label="Start date"
                        type="date"
                        defaultValue="2019-09-01"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </FormControl>
                <FormControl fullWidth style={{ marginBottom: '8px' }}>
                    <TextField
                        label="End date"
                        type="date"
                        defaultValue="2020-02-25"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </FormControl>
                <FormControl fullWidth style={{ marginTop: '8px' }}>
                    <InputLabel>Advanced</InputLabel>
                    <Select
                        label="Advanced"
                        defaultValue=""
                    >
                        <MenuItem value={'Min area coverage'}>Min area coverage %</MenuItem>
                        <MenuItem value={'Max cloud coverage'}>Max cloud coverage %</MenuItem>
                        <MenuItem value={'Max incidence angle'}>Max incidence angle (0-90)</MenuItem>
                    </Select>
                </FormControl>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                    <TextField
                        label="Min area coverage %"
                        type="number"
                        defaultValue={0}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        style={{ width: '30%' }}
                    />
                    <TextField
                        label="Max cloud coverage %"
                        type="number"
                        defaultValue={70}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        style={{ width: '30%' }}
                    />
                    <TextField
                        label="Max incidence angle (0-90)"
                        type="number"
                        defaultValue={40}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        style={{ width: '30%' }}
                    />
                </div>
            </div>

            <Divider style={{ margin: '16px 0' }} />

            <CardHeader
                title='Triggers'
                subheader='Combinable'
                sx={{
                    textAlign: 'left',
                    color: 'rgb(117, 116, 123)',
                    padding: 0
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
                        fontSize: 15,
                    }
                }}
            />
            <div style={{paddingLeft: '16px', marginTop: '8px'}}>
                <FormControl fullWidth style={{ marginBottom: '8px' }}>
                    <TextField
                        label="Name"
                        type="text"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </FormControl>
                <FormControl fullWidth style={{ marginBottom: '8px' }}>
                    <InputLabel>Item</InputLabel>
                    <Select
                        label="Item"
                        defaultValue=""
                    >
                        <MenuItem value={'Aircraft'}>Aircraft</MenuItem>
                        <MenuItem value={'Fighter'}>Fighter</MenuItem>
                        <MenuItem value={'Bomber'}>Bomber</MenuItem>
                        <MenuItem value={'Helicopter'}>Helicopter</MenuItem>
                        <MenuItem value={'Small Aircraft'}>Small Aircraft</MenuItem>
                        <MenuItem value={'Large Commercial'}>Large Commercial</MenuItem>
                        <MenuItem value={'Other Large Military'}>Other Large Military</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth style={{ marginBottom: '8px' }}>
                    <InputLabel>% Increase by</InputLabel>
                    <Select
                        label="% Increase by"
                        defaultValue=""
                    >
                        <MenuItem value={'Increase'}>% Increase by</MenuItem>
                        <MenuItem value={'Decrease'}>% Decrease by</MenuItem>
                        <MenuItem value={'Greater than'}>Is greater than</MenuItem>
                        <MenuItem value={'Less than'}>Is less than</MenuItem>
                    </Select>
                </FormControl>
                <FormControlLabel control={<Checkbox />} label="All areas selected" />
            </div>

            <Divider style={{ margin: '16px 0' }} />

            <CardHeader
                title='Notification'
                subheader=''
                sx={{
                    textAlign: 'left',
                    color: 'rgb(117, 116, 123)',
                    padding: 0
                }}
                titleTypographyProps={{
                    sx:{
                        fontSize: 20
                    }
                }}
            />
            <div style={{paddingLeft: '16px', marginTop: '8px'}}>
                <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="Email" />
                    <FormControlLabel control={<Checkbox />} label="SMS" />
                </FormGroup>
            </div>
        </div>
    );
}
