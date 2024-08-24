// ** React Imports
import { useState } from 'react'

// ** Stylesheet
import "../styling/OpenEarth.css"

// ** MUI Imports
import { Box, Grid, Typography } from '@mui/material'
import Table from '@mui/material/Table'
import Paper from '@mui/material/Paper'
import { visuallyHidden } from '@mui/utils'
import Checkbox from '@mui/material/Checkbox'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableContainer from '@mui/material/TableContainer'
import TableSortLabel from '@mui/material/TableSortLabel'
import TablePagination from '@mui/material/TablePagination'


//**  Icon
import Icon from '../styling/icon'


// ** Map 
import MapComponentArc from '../Map'

const createData = (id, name, location, portfolio, date, epc, type, asset) => {
  return { id, name, location, portfolio, date, epc, type, asset }
}

const rows = [
  createData(1, 305, 3, 67, 4, 4, 4, 4),
  createData(2, 452, 25, 51, 4, 4, 4, 4),
  createData(3, 262, 16, 24, 6, 4, 4, 4),
  createData(4, 159, 6, 24, 4, 4, 4, 4),
  createData(5, 356, 16, 49, 3, 4, 4, 4),
  createData(6, 408, 3, 87, 6, 4, 4, 4),
  createData(7, 237, 9, 37, 4, 4, 4, 4),
  createData(8, 375, 0, 94, 0, 4, 4, 4),
  createData(9, 518, 26, 65, 7, 4, 4, 4),
  createData(10, 392, 0, 98, 0, 4, 4, 4),
  createData(11, 318, 0, 81, 2, 4, 4, 4),
  createData(12, 360, 19, 9, 37, 4, 4, 4),
  createData(13, 437, 18, 63, 4, 4, 4, 4),
  createData(14, 437, 18, 63, 4, 4, 4, 4),
  createData(15, 437, 18, 63, 4, 4, 4, 4),
  createData(16, 437, 18, 63, 4, 4, 4, 4)
]
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }

  return 0
}
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order

    return a[1] - b[1]
  })

  return stabilizedThis.map(el => el[0])
}

const headCells = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'Asset ID'
  },
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: 'Name'
  },
  {
    id: 'location',
    numeric: true,
    disablePadding: false,
    label: 'Location'
  },
  {
    id: 'portfolio',
    numeric: true,
    disablePadding: false,
    label: 'Portfolio'
  },
  {
    id: 'date',
    numeric: true,
    disablePadding: false,
    label: 'Date Added'
  },
  {
    id: 'epc',
    numeric: true,
    disablePadding: false,
    label: 'EPC Rating'
  },
  {
    id: 'type',
    numeric: true,
    disablePadding: false,
    label: 'Building Type'
  }, {
    id: 'asset',
    numeric: true,
    disablePadding: false,
    label: 'Asset Value'
  }
]
function EnhancedTableHead(props) {
  // ** Props
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props

  const createSortHandler = property => event => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            onChange={onSelectAllClick}
            checked={rowCount > 0 && numSelected === rowCount}
            inputProps={{ 'aria-label': 'select all desserts' }}
            indeterminate={numSelected > 0 && numSelected < rowCount}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ fontSize: 13, fontWeight: 'bold', }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              onClick={createSortHandler(headCell.id)}
              direction={orderBy === headCell.id ? order : 'asc'}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

const OpenEarth = () => {
  // ** States
  const [page, setPage] = useState(0)
  const [order, setOrder] = useState('asc')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [orderBy, setOrderBy] = useState('calories')
  const [selected, setSelected] = useState([])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name)
      setSelected(newSelecteds)

      return
    }
    setSelected([])
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }
    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const isSelected = name => selected.indexOf(name) !== -1

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0


  return (

    <Box sx={{ ml: 5, mb: 5, gap: 5, mt: 0 }}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Box
            sx={{
              ml: '3%',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'rgb(245, 246, 248)'
            }}
          >
            <Typography variant="body2" color="black" fontSize={13}>
              <Typography variant="body2" component="span" sx={{ backgroundColor: 'lightgreen', padding: '0 4px', color: 'green' }}>
                Total Areas:
              </Typography>
              {' '}
              <Typography variant="body2" component="span" sx={{ color: 'rgb(18, 14, 107)' }}>
                1
              </Typography>
            </Typography>


            <Box sx={{ display: 'flex', alignItems: 'center', width: '7%', justifyContent: 'space-around' }}>
              <Icon sx={{ color: 'rgb(18, 14, 107)', mr: 15 }} icon={'mdi:cloud-upload-outline'} />
              <Typography variant="body1" color='rgb(18, 14, 107)' fontSize={13} marginRight={'2%'}>
                Upload File
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', height: '95%' }}>
          <Box sx={{ flex: 1, ml: '5%' }}>
            <MapComponentArc height={950} showSearch={true}/>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ position: 'relative', marginLeft: 5 }}>
            <div style={{
              height: 35,
              backgroundColor: 'rgb(245, 246, 248)',
              display: 'flex',
              alignItems: 'center',
              fontSize: 13,
              marginTop: 3
            }}>
              <Icon icon={'mdi:search'} />
              <span style={{ marginLeft: 5 }}>Filters</span>
            </div>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 400, widht: '95%' }} aria-labelledby="tableTitle">
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={rows.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.name);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow

                          tabIndex={-1}
                          key={row.id}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                          onClick={event => handleClick(event, row.name)}
                          sx={{
                            height: 80,
                            backgroundColor: (index + 1) % 2 !== 0 ? '#f3f4f6' : 'white'
                          }}>
                          <TableCell padding="checkbox">
                            <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
                          </TableCell>
                          <TableCell component="th" id={labelId} scope="row" padding="none" sx={{ color: 'grey' }}>
                            {row.id}
                          </TableCell>
                          <TableCell align="right" sx={{ color: 'grey' }}>{row.name}</TableCell>
                          <TableCell align="right" sx={{ color: 'grey' }}>{row.location}</TableCell>
                          <TableCell align="right" sx={{ color: 'grey' }}>{row.portfolio}</TableCell>
                          <TableCell align="right" sx={{ color: 'grey' }}>{row.date}</TableCell>
                          <TableCell align="right" sx={{ color: 'grey' }}>{row.epc}</TableCell>
                          <TableCell align="right" sx={{ color: 'grey' }}>{row.type}</TableCell>
                          <TableCell align="right" sx={{ color: 'grey' }}>{row.asset}</TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      sx={{
                        height: 53 * emptyRows,
                      }}
                    >
                      <TableCell colSpan={2} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              page={page}
              component='div'
              count={rows.length}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[10, 20, 50, 100]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Grid>


      </Grid>
    </Box>
  );

}

export default OpenEarth