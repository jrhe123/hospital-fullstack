import { Icon } from '@iconify/react'
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup'

import { BarChart } from 'components/BarChart'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    background: theme.palette.action.hover,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const createData = (name: string, activities: number, revenue: number) => ({
  name,
  activities,
  revenue,
})
const rows = [
  createData('Dental', 159, 159 * 200),
  createData('ENT', 237, 237 * 200),
  createData('Surgical', 29, 29 * 200),
  createData('Ophthalmonlogy', 262, 262 * 250),
  createData('Dermatology', 305, 305 * 100),
  createData('Gynecology', 356, 356 * 200),
  createData('Pediatrics', 55, 55 * 50),
  createData('Neurology', 3, 3 * 1000),
  createData('Internal', 199, 199 * 200),
  createData('Other', 433, 433 * 100),
]

export const HomeContainer = () => (
  <Box component="div" sx={{ height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
    {/* first row */}
    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
      <Paper
        sx={{
          position: 'relative',
          borderRadius: 6,
          width: 180,
          height: 110,
          background: '#81B3AA',
          p: 2,
          mr: 2,
        }}
      >
        <Box sx={{ position: 'absolute', top: 12, right: 14 }}>
          <Icon icon="healthicons:doctor-male" fontSize={21} color={'white'} />
        </Box>
        <Typography
          component="div"
          sx={{ fontWeight: 'bold', mb: 2, color: 'white', fontSize: '12px' }}
        >
          Medical Doctors
        </Typography>
        <Typography component="div" sx={{ fontWeight: 'bold', color: 'white', fontSize: '18px' }}>
          <CountUp end={276988} separator="," duration={1} prefix="# " />
        </Typography>
      </Paper>
      <Paper
        sx={{
          position: 'relative',
          borderRadius: 6,
          width: 180,
          height: 110,
          background: '#F2F1F8',
          p: 2,
        }}
      >
        <Typography component="div" sx={{ fontWeight: 'bold', mb: 2, fontSize: '12px' }}>
          Live Chats
          <Box sx={{ position: 'absolute', top: 13, right: 10 }}>
            <Icon icon="simple-icons:meetup" fontSize={24} />
          </Box>
        </Typography>
        <Typography component="div" sx={{ fontWeight: 'bold', fontSize: '18px' }}>
          <CountUp end={7562} separator="," duration={1} prefix="# " />
        </Typography>
      </Paper>
    </Box>
    {/* second row */}
    <Box sx={{ display: 'flex', flexDirection: 'row', mt: 4, flexWrap: 'nowrap' }}>
      <Box sx={{ flex: '0 0 180px' }}>
        <Box sx={{ pl: 3, position: 'relative' }}>
          <Box
            sx={{
              position: 'absolute',
              height: '21px',
              width: 5,
              background: 'black',
              borderRadius: 3,
              left: 0,
              top: 0,
            }}
          />
          <Typography component="div" sx={{ fontSize: '12px' }}>
            Departments
          </Typography>
          <Typography component="div" sx={{ fontSize: '12px', fontWeight: 'bold' }}>
            <CountUp end={89} separator="," duration={2} />
          </Typography>
        </Box>
        <Box sx={{ pl: 3, position: 'relative', mt: 3 }}>
          <Box
            sx={{
              position: 'absolute',
              height: '21px',
              width: 5,
              background: 'black',
              borderRadius: 3,
              left: 0,
              top: 0,
            }}
          />
          <Typography component="div" sx={{ fontSize: '12px' }}>
            Daily Transactions
          </Typography>
          <Typography component="div" sx={{ fontSize: '12px', fontWeight: 'bold' }}>
            <CountUp end={49300} separator="," duration={2} prefix="$" />
          </Typography>
        </Box>
        <Box sx={{ pl: 3, position: 'relative', mt: 3 }}>
          <Box
            sx={{
              position: 'absolute',
              height: '21px',
              width: 5,
              background: 'black',
              borderRadius: 3,
              left: 0,
              top: 0,
            }}
          />
          <Typography component="div" sx={{ fontSize: '12px' }}>
            Patients
          </Typography>
          <Typography component="div" sx={{ fontSize: '12px', fontWeight: 'bold' }}>
            <CountUp end={22974487} separator="," duration={2} />
          </Typography>
        </Box>
      </Box>
      <Box sx={{ flex: 1 }}>
        <BarChart />
      </Box>
    </Box>
    {/* third row */}
    <Box sx={{ mt: 4 }}>
      <Typography component="div" sx={{ fontSize: '18px', fontWeight: 'bold' }}>
        {dayjs().format('MMM D, YYYY')}
      </Typography>
      <TableContainer component={Paper} sx={{ marginTop: '12px' }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ fontWeight: 'bold', fontSize: '12px' }}>
                Department
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ fontWeight: 'bold', fontSize: '12px' }}>
                Activities #
              </StyledTableCell>
              <StyledTableCell align="right" sx={{ fontWeight: 'bold', fontSize: '12px' }}>
                Transaction
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <StyledTableRow
                key={row.name}
                hover
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  <Typography
                    component="div"
                    sx={{
                      fontSize: '12px',
                    }}
                  >
                    {row.name}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Typography
                    component="div"
                    sx={{
                      fontSize: '12px',
                    }}
                  >
                    {row.activities}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Typography
                    component="div"
                    sx={{
                      fontSize: '12px',
                    }}
                  >
                    ${row.revenue}
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  </Box>
)
