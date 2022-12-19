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
import React, { useCallback, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import { BoxWrapper } from 'components/BoxWrapper'
import { CustomModal } from 'components/Modal'
import FormSelect from 'libs/ui/components/FormSelect'
import FormTextField from 'libs/ui/components/FormTextField'
import { phoneFormat } from 'utils/common'

import { useStaffService } from '../hooks'
import { SearchDoctorFormInput, Degree, Occupation, Doctor } from '../types'

import { DoctorForm } from './DoctorForm'

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

type RecommendType = {
  id: number
  name: string
}
const recommendList: RecommendType[] = [
  {
    id: 1,
    name: 'Recommended',
  },
  {
    id: 2,
    name: 'Regular',
  },
]

type OccupationType = {
  id: number
  name: string
}
const occupationList: OccupationType[] = [
  {
    id: 1,
    name: Occupation.SPECIALIST,
  },
  {
    id: 2,
    name: Occupation.VICE_SPECIALIST,
  },
  {
    id: 3,
    name: Occupation.DIRECTOR,
  },
  {
    id: 4,
    name: Occupation.VICE_DIRECTOR,
  },
]

type DegreeType = {
  id: number
  name: string
}
const degreeList: DegreeType[] = [
  {
    id: 1,
    name: Degree.BACHELOR,
  },
  {
    id: 2,
    name: Degree.MASTER,
  },
  {
    id: 3,
    name: Degree.PHD,
  },
]

type Order = 'asc' | 'desc'
interface EnhancedTableProps {
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Doctor) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order?: Order
  rowCount: number
}
interface HeadCell {
  id: keyof Doctor
  label: string
  isSort: boolean
}
const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    label: 'Name',
    isSort: false,
  },
  {
    id: 'sex',
    label: 'Gender',
    isSort: false,
  },
  {
    id: 'tel',
    label: 'Contact',
    isSort: false,
  },
  {
    id: 'job',
    label: 'Occupation',
    isSort: false,
  },
  {
    id: 'deptName',
    label: 'Department',
    isSort: true,
  },
  {
    id: 'subName',
    label: 'Clinic',
    isSort: false,
  },
  {
    id: 'school',
    label: 'Graduated',
    isSort: false,
  },
  {
    id: 'degree',
    label: 'Academy',
    isSort: false,
  },
  {
    id: 'status',
    label: 'Status',
    isSort: false,
  },
  {
    id: 'action',
    label: 'Actions',
    isSort: false,
  },
]

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { onSelectAllClick, order, numSelected, rowCount, onRequestSort } = props
  const createSortHandler = (property: keyof Doctor) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all',
            }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={'center'}
            padding={'none'}
            sortDirection={order || 'asc'}
            sx={{
              fontSize: '10px',
            }}
          >
            {headCell.isSort ? (
              <TableSortLabel
                active={true}
                direction={order || 'asc'}
                onClick={createSortHandler(headCell.id)}
                sx={{ marginLeft: '10px' }}
              >
                {headCell.label}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export const DoctorContainer = () => {
  const [defaultValues, setDefauleValues] = useState<SearchDoctorFormInput>({
    page: 0,
    length: 10,
    status: 1,
    // search
    name: '',
    deptId: '',
    degreeId: '',
    degree: '',
    jobId: '',
    job: '',
    recommendedId: '',
    recommended: '',
    // sort
    order: undefined,
  })
  const [selected, setSelected] = useState<readonly number[]>([])
  const [doctorId, setDoctorId] = useState<number | null>(null)
  const [open, setOpen] = useState<boolean>(false)

  const { fetchDepartments, fetchDoctors, isLoading, departmentList, doctorList, totalCount } =
    useStaffService()

  // form check
  const formValidationSchema = Yup.object().shape({
    name: Yup.string().notRequired(),
    deptId: Yup.string().notRequired(),
    degreeId: Yup.string().notRequired(),
    jobId: Yup.string().notRequired(),
    recommendedId: Yup.string().notRequired(),
  })
  const methods = useForm<SearchDoctorFormInput, unknown>({
    defaultValues,
    resolver: yupResolver(formValidationSchema),
  })
  const { control, handleSubmit, reset, watch, setValue, getValues } = methods

  const fetchDoctorList = useCallback(() => {
    const values = getValues()
    const form = {
      page: values.page + 1,
      length: values.length,
      status: values.status,
      // search
      name: values.name,
      deptId: values.deptId,
      degree: values.degree,
      job: values.job,
      recommended: values.recommended,
      // sort
      order: values.order,
    }
    fetchDoctors(form)
  }, [fetchDoctors, getValues])

  // initial fetch
  useEffect(() => {
    fetchDepartments()
    fetchDoctorList()
  }, [fetchDepartments, fetchDoctorList])

  const onSearchClick = (data: SearchDoctorFormInput) => {
    const degree = degreeList.find(i => i.id === Number(data.degreeId))
    const job = occupationList.find(i => i.id === Number(data.jobId))
    const recommend = recommendList.find(i => i.id === Number(data.recommendedId))
    let formattedRecommend
    if (recommend) {
      if (recommend.id === 1) {
        formattedRecommend = true
      } else {
        formattedRecommend = false
      }
    }
    setValue('degree', degree?.name)
    setValue('job', job?.name)
    setValue('recommended', formattedRecommend)
    setValue('page', 0)
    fetchDoctorList()
  }

  const handleResetFields = () => {
    reset({
      page: 0,
      length: 10,
      status: 1,
      // search
      name: '',
      deptId: '',
      degreeId: '',
      degree: '',
      jobId: '',
      job: '',
      recommendedId: '',
      recommended: '',
      // sort
      order: undefined,
    })
    fetchDoctorList()
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = doctorList.map(doc => doc.id)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Doctor) => {
    const updated = defaultValues.order === 'asc' ? 'desc' : 'asc'
    setDefauleValues({
      ...defaultValues,
      order: updated,
    })
    setValue('order', updated)
    fetchDoctorList()
  }

  const handleClickDoctor = (event: React.MouseEvent<unknown>, id: number) => {
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

  const handleChangePage = (event: unknown, newPage: number) => {
    setDefauleValues({
      ...defaultValues,
      page: newPage,
    })
    setValue('page', newPage)
    fetchDoctorList()
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDefauleValues({
      ...defaultValues,
      page: 0,
      length: parseInt(event.target.value, 10),
    })
    setValue('page', 0)
    setValue('length', parseInt(event.target.value, 10))
    fetchDoctorList()
  }

  const handleChangeStatus = (index: number) => {
    setValue('page', 0)
    setValue('status', index)
    setDefauleValues({
      ...defaultValues,
      page: 0,
      status: index,
    })
    fetchDoctorList()
  }

  const renderLeftSideFields = () => (
    <Box
      component="div"
      sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginBottom: '12px' }}
    >
      {/* name */}
      <Box component="div" sx={{ width: '90px', marginRight: '6px' }}>
        <FormTextField
          name="name"
          label="Search.."
          control={control}
          sx={textFieldStyle}
          type={'text'}
          variant={'outlined'}
        />
      </Box>
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
      {/* education */}
      <Box component="div" sx={{ width: '90px', marginRight: '6px' }}>
        <FormSelect
          name="degreeId"
          label={'Education'}
          control={control}
          sx={selectFieldStyle}
          lsx={inputLabelStyle}
          errorMessage={'Invalid education'}
        >
          {degreeList.map((deg, index) => (
            <MenuItem key={index} value={deg.id} sx={{ fontSize: '11px' }}>
              {deg.name}
            </MenuItem>
          ))}
        </FormSelect>
      </Box>
      {/* occupation */}
      <Box component="div" sx={{ width: '90px', marginRight: '6px' }}>
        <FormSelect
          name="jobId"
          label={'Occupation'}
          control={control}
          sx={selectFieldStyle}
          lsx={inputLabelStyle}
          errorMessage={'Invalid occupation'}
        >
          {occupationList.map((occu, index) => (
            <MenuItem key={index} value={occu.id} sx={{ fontSize: '11px' }}>
              {occu.name}
            </MenuItem>
          ))}
        </FormSelect>
      </Box>
      {/* recommended */}
      <Box component="div" sx={{ width: '90px', marginRight: '12px' }}>
        <FormSelect
          name="recommendedId"
          label={'Rate'}
          control={control}
          sx={selectFieldStyle}
          lsx={inputLabelStyle}
          errorMessage={'Invalid rate'}
        >
          {recommendList.map((recom, index) => (
            <MenuItem key={index} value={recom.id} sx={{ fontSize: '11px' }}>
              {recom.name}
            </MenuItem>
          ))}
        </FormSelect>
      </Box>
    </Box>
  )

  const renderRightSideFields = () => (
    <Box component="div" sx={{ display: 'flex', flexDirection: 'row' }}>
      <Box component="div">
        <Button onClick={() => handleChangeStatus(1)} sx={{ padding: 0 }}>
          <Box
            component="div"
            sx={{
              background: defaultValues.status === 1 ? '#81B3AA' : 'transparent',
              height: '32px',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderTopLeftRadius: '3px',
              borderBottomLeftRadius: '3px',
              boxSizing: 'border-box',
              border: defaultValues.status === 1 ? 'none' : '1px solid #bebebf',
            }}
          >
            <Typography
              component="div"
              sx={{
                fontSize: '11px',
                color: defaultValues.status === 1 ? 'white' : '#bebebf',
                fontWeight: 'bold',
              }}
            >
              Active
            </Typography>
          </Box>
        </Button>
      </Box>
      <Box component="div">
        <Button onClick={() => handleChangeStatus(2)} sx={{ padding: 0 }}>
          <Box
            component="div"
            sx={{
              background: defaultValues.status === 2 ? '#81B3AA' : 'transparent',
              height: '32px',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxSizing: 'border-box',
              border: defaultValues.status === 2 ? 'none' : '1px solid #bebebf',
              borderLeft: 'none',
              borderRight: 'none',
            }}
          >
            <Typography
              component="div"
              sx={{
                fontSize: '11px',
                color: defaultValues.status === 2 ? 'white' : '#bebebf',
                fontWeight: 'bold',
              }}
            >
              Inactive
            </Typography>
          </Box>
        </Button>
      </Box>
      <Box component="div">
        <Button onClick={() => handleChangeStatus(3)} sx={{ padding: 0 }}>
          <Box
            component="div"
            sx={{
              background: defaultValues.status === 3 ? '#81B3AA' : 'transparent',
              height: '32px',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderTopRightRadius: '3px',
              borderBottomRightRadius: '3px',
              boxSizing: 'border-box',
              border: defaultValues.status === 3 ? 'none' : '1px solid #bebebf',
            }}
          >
            <Typography
              component="div"
              sx={{
                fontSize: '11px',
                color: defaultValues.status === 3 ? 'white' : '#bebebf',
                fontWeight: 'bold',
              }}
            >
              Retried
            </Typography>
          </Box>
        </Button>
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
      <Box component="div" sx={{ marginRight: '6px' }}>
        <Button
          onClick={() => {
            setDoctorId(null)
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
      {/* delete */}
      <Box component="div">
        <Button onClick={() => {}} sx={{ padding: 0 }}>
          <Box
            component="div"
            sx={{
              height: '24px',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '3px',
              border: '1px solid #E37470',
            }}
          >
            <Typography
              component="div"
              sx={{ fontSize: '11px', color: '#E37470', fontWeight: 'bold' }}
            >
              Delete
            </Typography>
          </Box>
        </Button>
      </Box>
    </Box>
  )

  const isSelected = (id: number) => selected.indexOf(id) !== -1
  const renderTable = () => {
    if (!doctorList.length) return null
    return doctorList.map((doc, index) => {
      const isItemSelected = isSelected(doc.id)
      const labelId = `enhanced-table-checkbox-${index}`
      let formattedStatus = 'active'
      if (doc.status === 2) {
        formattedStatus = 'inactive'
      } else if (doc.status === 3) {
        formattedStatus = 'retried'
      }
      return (
        <TableRow
          hover
          onClick={event => handleClickDoctor(event, doc.id)}
          role="checkbox"
          aria-checked={isItemSelected}
          tabIndex={-1}
          key={doc.id}
          selected={isItemSelected}
        >
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              checked={isItemSelected}
              inputProps={{
                'aria-labelledby': labelId,
              }}
            />
          </TableCell>
          <TableCell align="center" sx={{ fontSize: '10px', minWidth: '90px' }}>
            <Link
              to={`/staff/doctor/${doc.id}`}
              style={{ color: '#81B3AA', textDecoration: 'underline' }}
            >
              {doc.name}
            </Link>
          </TableCell>
          <TableCell align="center" sx={{ fontSize: '10px' }}>
            {doc.sex}
          </TableCell>
          <TableCell align="center" sx={{ fontSize: '10px' }} title={doc.tel}>
            {phoneFormat(String(doc.tel))}
          </TableCell>
          <TableCell align="center" sx={{ fontSize: '10px' }}>
            {doc.job}
          </TableCell>
          <TableCell align="center" sx={{ fontSize: '10px' }}>
            {doc.deptName}
          </TableCell>
          <TableCell align="center" sx={{ fontSize: '10px' }}>
            {doc.subName}
          </TableCell>
          <TableCell align="center" sx={{ fontSize: '10px' }}>
            {doc.school}
          </TableCell>
          <TableCell align="center" sx={{ fontSize: '10px' }}>
            {doc.degree}
          </TableCell>
          <TableCell align="center" sx={{ fontSize: '10px' }}>
            {formattedStatus}
          </TableCell>
          <TableCell align="center" sx={{ fontSize: '10px' }}>
            <Box component="div" sx={{ display: 'flex', flexDirection: 'row' }}>
              <Button
                sx={{ padding: 0, minWidth: 0, marginRight: '6px' }}
                onClick={e => {
                  e.stopPropagation()
                  setDoctorId(doc.id)
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
              <Button
                sx={{ padding: 0, minWidth: 0 }}
                onClick={e => {
                  e.stopPropagation()
                }}
              >
                <Typography
                  component="div"
                  sx={{
                    fontSize: '9px',
                    color: '#E37470',
                    minWidth: 0,
                  }}
                >
                  Delete
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
        <DoctorForm
          id={doctorId}
          handleCloseModal={() => {
            setOpen(false)
          }}
        />
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
          {/* right side */}
          {renderRightSideFields()}
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
              <EnhancedTableHead
                numSelected={selected.length}
                order={defaultValues.order}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={doctorList.length}
              />
              <TableBody>{renderTable()}</TableBody>
            </Table>
          </TableContainer>
          {doctorList.length === 0 ? (
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
          <TablePagination
            rowsPerPageOptions={[10, 20, 30, 40, 50]}
            component="div"
            count={totalCount}
            rowsPerPage={defaultValues.length}
            page={defaultValues.page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              '.MuiTablePagination-toolbar p': {
                fontSize: '12px',
              },
            }}
          />
        </Box>
      </Box>
    </BoxWrapper>
  )
}
