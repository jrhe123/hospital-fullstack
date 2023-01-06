import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import {
  Box,
  Button,
  Checkbox,
  MenuItem,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableContainer,
  TablePagination,
  Typography,
} from '@mui/material'
import dayjs from 'dayjs'
import React, { useCallback, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import { BoxWrapper } from 'components/BoxWrapper'
import { CustomModal } from 'components/Modal'
import { useStaffService } from 'features/staff'
import FormSelect from 'libs/ui/components/FormSelect'
import FormTextField from 'libs/ui/components/FormTextField'

import { useDiagnosisService } from '../hooks'
import { SearchWorkPlanFormInput, DiagnosisDept } from '../types'

const textFieldStyle = {
  '& div': {
    paddingLeft: 1,
    paddingRight: 1,
  },
  '& p.Mui-error': {
    fontSize: '6px',
  },
  '& label': {
    fontSize: '10px',
    lineHeight: 1.67,
  },
  '& .MuiInputBase-root input': {
    padding: 0,
    height: '32px',
    fontSize: '11px',
  },
}
const inputLabelStyle = {
  fontSize: '9.5px',
  lineHeight: '2px',
  overflow: 'visible',
  '&.Mui-focused': {
    lineHeight: '17px',
  },
  '&.MuiFormLabel-filled': {
    lineHeight: '17px',
  },
}
const selectFieldStyle = {
  height: '32px',
  fontSize: '11px',
  '& svg': {
    right: 0,
  },
}

interface EnhancedTableProps {
  numSelected: number
  rowCount: number
}
interface HeadCell {
  id: keyof DiagnosisDept
  label: string
}
const headCells: readonly HeadCell[] = [
  {
    id: 'deptName',
    label: 'Department',
  },
  {
    id: 'deptSubName',
    label: 'Unit',
  },
  {
    id: 'plan',
    label: 'Plan',
  },
  {
    id: 'action',
    label: 'Actions',
  },
]

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { numSelected, rowCount } = props

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, index) => (
          <TableCell
            key={headCell.id}
            align={index === 0 ? 'left' : 'center'}
            padding={'normal'}
            sx={{
              fontSize: '10px',
            }}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export const DiagnosisDeptContainer = () => {
  const [defaultValues, setDefauleValues] = useState<SearchWorkPlanFormInput>({
    startDate: dayjs('2022-09-20').format('YYYY-MM-DD'),
    endDate: dayjs('2022-09-20').add(7, 'days').format('YYYY-MM-DD'),
    // search
    doctorName: '',
    deptId: '',
  })
  const [selected, setSelected] = useState<readonly number[]>([])
  const [planId, setPlanId] = useState<number | null>(null)
  const [open, setOpen] = useState<boolean>(false)

  const { isLoading, workPlanDeptList, fetchWorkPlanDepts } = useDiagnosisService()
  const { fetchDepartments, departmentList } = useStaffService()

  // form check
  const formValidationSchema = Yup.object().shape({
    startDate: Yup.string().required(),
    endDate: Yup.string().required(),
    doctorName: Yup.string().notRequired(),
    deptId: Yup.string().notRequired(),
  })
  const methods = useForm<SearchWorkPlanFormInput, unknown>({
    defaultValues,
    resolver: yupResolver(formValidationSchema),
  })
  const { control, handleSubmit, reset, watch, setValue, getValues } = methods

  const fetchWorkPlanList: () => void = useCallback(() => {
    const values = getValues()
    const form = {
      startDate: dayjs(values.startDate).format('YYYY-MM-DD'),
      endDate: dayjs(values.endDate).format('YYYY-MM-DD'),
      // search
      doctorName: values.doctorName,
      deptId: values.deptId,
    }
    fetchWorkPlanDepts(form)
  }, [fetchWorkPlanDepts, getValues])

  // initial fetch
  useEffect(() => {
    fetchDepartments()
    fetchWorkPlanList()
  }, [fetchDepartments, fetchWorkPlanList])

  const onSearchClick = (data: SearchWorkPlanFormInput) => {
    fetchWorkPlanList()
  }

  const handleResetFields = () => {
    reset({
      startDate: dayjs().format('YYYY-MM-DD'),
      endDate: dayjs().add(7, 'days').format('YYYY-MM-DD'),
      // search
      doctorName: '',
      deptId: '',
    })
    fetchWorkPlanList()
  }

  const handleClickWorkPlan = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected: readonly number[] = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }
    setSelected(newSelected)
  }

  const renderLeftSideFields = () => (
    <Box
      component="div"
      sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginBottom: '12px' }}
    >
      {/* department */}
      <Box component="div" sx={{ width: '90px', marginRight: '6px' }}>
        <FormSelect
          name="deptId"
          label={'Department'}
          control={control}
          sx={selectFieldStyle}
          lsx={inputLabelStyle}
          errorMessage={'Invalid department'}
        >
          {departmentList.map((dept, index) => (
            <MenuItem key={index} value={dept.id} sx={{ fontSize: '11px' }}>
              {dept.name}
            </MenuItem>
          ))}
        </FormSelect>
      </Box>
      {/* doctorName */}
      <Box component="div" sx={{ width: '90px', marginRight: '6px' }}>
        <FormTextField
          name="doctorName"
          label="Search.."
          control={control}
          sx={textFieldStyle}
          type={'text'}
          variant={'outlined'}
        />
      </Box>
    </Box>
  )

  const renderLeftSideBtns = () => (
    <Box
      component="div"
      sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}
    >
      {/* search */}
      <Box component="div" sx={{ marginRight: '6px' }}>
        <Button onClick={handleSubmit(onSearchClick)} sx={{ padding: 0 }}>
          <Box
            component="div"
            sx={{
              height: '24px',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '3px',
              border: '1px solid #81B3AA',
            }}
          >
            <Typography
              component="div"
              sx={{ fontSize: '11px', color: '#81B3AA', fontWeight: 'bold' }}
            >
              Search
            </Typography>
          </Box>
        </Button>
      </Box>
      {/* reset */}
      <Box component="div">
        <Button onClick={handleResetFields} sx={{ padding: 0 }}>
          <Box
            component="div"
            sx={{
              height: '24px',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '3px',
              border: '1px solid #2C373E',
            }}
          >
            <Typography
              component="div"
              sx={{ fontSize: '11px', color: '#2C373E', fontWeight: 'bold' }}
            >
              Reset
            </Typography>
          </Box>
        </Button>
      </Box>
    </Box>
  )

  const renderRightSideBtns = () => (
    <Box
      component="div"
      sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}
    >
      {/* new */}
      <Box component="div" sx={{}}>
        <Button
          onClick={() => {
            setPlanId(null)
            setOpen(true)
          }}
          sx={{ padding: 0 }}
        >
          <Box
            component="div"
            sx={{
              height: '24px',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '3px',
              border: '1px solid #6b9bb9',
            }}
          >
            <Typography
              component="div"
              sx={{ fontSize: '11px', color: '#6b9bb9', fontWeight: 'bold' }}
            >
              Create
            </Typography>
          </Box>
        </Button>
      </Box>
    </Box>
  )

  const isSelected = (id: number) => selected.indexOf(id) !== -1
  const renderTable = () => {
    if (!workPlanDeptList.length) return null
    return workPlanDeptList.map((dia: DiagnosisDept, index: number) => {
      const isItemSelected = isSelected(dia.deptSubId)
      const labelId = `enhanced-table-checkbox-${index}`
      return (
        <TableRow
          hover
          onClick={event => handleClickWorkPlan(event, dia.deptSubId)}
          role="checkbox"
          aria-checked={isItemSelected}
          tabIndex={-1}
          key={dia.deptSubId}
          selected={isItemSelected}
        >
          <TableCell align="left" sx={{ fontSize: '10px' }}>
            <Link
              to={`/diagnosis/dept/${dia.deptSubId}`}
              style={{ color: '#81B3AA', textDecoration: 'underline', fontWeight: 'bold' }}
            >
              {dia.deptSubName}
            </Link>
          </TableCell>
          <TableCell align="center" sx={{ fontSize: '10px' }}>
            {dia.deptName}
          </TableCell>
          <TableCell align="center" sx={{ fontSize: '10px' }}>
            plan
          </TableCell>
          <TableCell align="center" sx={{ fontSize: '10px' }}>
            <Box component="div" sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                sx={{ padding: 0, minWidth: 0 }}
                onClick={e => {
                  e.stopPropagation()
                  setPlanId(dia.deptSubId)
                  setOpen(true)
                }}
              >
                <Typography
                  component="div"
                  sx={{
                    fontSize: '9px',
                    color: '#81B3AA',
                    minWidth: 0,
                  }}
                >
                  Edit
                </Typography>
              </Button>
            </Box>
          </TableCell>
        </TableRow>
      )
    })
  }

  return (
    <BoxWrapper>
      <CustomModal
        open={open}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80vw',
          maxWidth: '600px',
          bgcolor: 'background.paper',
          padding: '18px',
          paddingTop: '24px',
          paddingBottom: '24px',
        }}
        disableBackdropClick={true}
        handleCloseModal={() => {
          setOpen(false)
        }}
      >
        {/* <DoctorForm
          id={doctorId}
          handleCloseModal={() => {
            setOpen(false)
          }}
        /> */}
        edit form
      </CustomModal>
      <Box
        component="div"
        sx={{
          paddingTop: '18px',
          paddingBottom: '18px',
          paddingLeft: '12px',
          paddingRight: '12px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* top input fields */}
        {/* first row */}
        <Box
          component="div"
          sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
        >
          {/* left side */}
          {renderLeftSideFields()}
        </Box>
        {/* second row */}
        <Box
          component="div"
          sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
        >
          {/* left side */}
          {renderLeftSideBtns()}
          {/* right side */}
          {renderRightSideBtns()}
        </Box>
        {/* table */}
        <Box
          component="div"
          className="hide-scroll"
          sx={{ marginTop: '24px', height: '100%', overflowY: 'auto' }}
        >
          <TableContainer>
            <Table aria-labelledby="tableTitle" size={'small'}>
              <EnhancedTableHead numSelected={selected.length} rowCount={workPlanDeptList.length} />
              <TableBody>{renderTable()}</TableBody>
            </Table>
          </TableContainer>
          {workPlanDeptList.length === 0 ? (
            <Box
              component="div"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '24px',
                marginBottom: '12px',
              }}
            >
              <Typography
                component="div"
                sx={{
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                No records..
              </Typography>
            </Box>
          ) : null}
        </Box>
      </Box>
    </BoxWrapper>
  )
}
