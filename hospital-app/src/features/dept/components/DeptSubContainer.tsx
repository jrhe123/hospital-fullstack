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
import { useStaffService } from 'features/staff'
import FormSelect from 'libs/ui/components/FormSelect'
import FormTextField from 'libs/ui/components/FormTextField'

import { useDeptService } from '../hooks'
import { DeptSub, SearchDeptSubFormInput } from '../types'

import { DeptSubForm } from './DeptSubForm'

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

type Order = 'asc' | 'desc'
interface EnhancedTableProps {
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof DeptSub) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order?: Order
  rowCount: number
}
interface HeadCell {
  id: keyof DeptSub
  label: string
  isSort: boolean
}
const headCells: readonly HeadCell[] = [
  {
    id: 'subName',
    label: 'Unit',
    isSort: false,
  },
  {
    id: 'deptName',
    label: 'Department',
    isSort: true,
  },
  {
    id: 'doctors',
    label: 'Doctor',
    isSort: false,
  },
  {
    id: 'masterDoctors',
    label: 'Doctor(D)',
    isSort: false,
  },
  {
    id: 'generalDoctors',
    label: 'Doctor(S)',
    isSort: false,
  },
  {
    id: 'location',
    label: 'Location',
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
  const createSortHandler = (property: keyof DeptSub) => (event: React.MouseEvent<unknown>) => {
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

export const DeptSubContainer = () => {
  const [defaultValues, setDefauleValues] = useState<SearchDeptSubFormInput>({
    page: 0,
    length: 10,
    // search
    name: '',
    deptId: '',
    // sort
    order: undefined,
  })

  const [selected, setSelected] = useState<readonly number[]>([])
  const [deptSubId, setDeptSubId] = useState<number | null>(null)
  const [open, setOpen] = useState<boolean>(false)
  const [dOpen, setDOpen] = useState<boolean>(false)

  const { fetchDeptSubs, deleteDeptSub, isLoading, deptSubList, totalCount } = useDeptService()
  const { fetchDepartments, departmentList } = useStaffService()

  // form check
  const formValidationSchema = Yup.object().shape({
    name: Yup.string().notRequired(),
    deptId: Yup.string().notRequired(),
  })
  const methods = useForm<SearchDeptSubFormInput, unknown>({
    defaultValues,
    resolver: yupResolver(formValidationSchema),
  })
  const { control, handleSubmit, reset, watch, setValue, getValues } = methods

  const fetchDeptSubList: () => void = useCallback(() => {
    const values = getValues()
    const form = {
      page: values.page + 1,
      length: values.length,
      // search
      name: values.name,
      deptId: values.deptId,
      // sort
      order: values.order,
    }
    fetchDeptSubs(form)
  }, [fetchDeptSubs, getValues])

  // initial fetch
  useEffect(() => {
    fetchDepartments()
    fetchDeptSubList()
  }, [fetchDepartments, fetchDeptSubList])

  const onSearchClick = (data: SearchDeptSubFormInput) => {
    setValue('page', 0)
    fetchDeptSubList()
  }

  const handleResetFields = () => {
    reset({
      page: 0,
      length: 10,
      // search
      name: '',
      deptId: '',
      order: undefined,
    })
    fetchDeptSubList()
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = deptSubList.map(deptSub => deptSub.id)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof DeptSub) => {
    const updated = defaultValues.order === 'asc' ? 'desc' : 'asc'
    setDefauleValues({
      ...defaultValues,
      order: updated,
    })
    setValue('order', updated)
    fetchDeptSubList()
  }

  const handleClickDeptSub = (event: React.MouseEvent<unknown>, id: number) => {
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
    fetchDeptSubList()
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDefauleValues({
      ...defaultValues,
      page: 0,
      length: parseInt(event.target.value, 10),
    })
    setValue('page', 0)
    setValue('length', parseInt(event.target.value, 10))
    fetchDeptSubList()
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
            setDeptSubId(null)
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
        <Button
          disabled={!selected.length}
          onClick={() => {
            setDOpen(true)
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
              border: !selected.length ? '1px solid #bebebf' : '1px solid #E37470',
            }}
          >
            <Typography
              component="div"
              sx={{
                fontSize: '11px',
                color: !selected.length ? '#bebebf' : '#E37470',
                fontWeight: 'bold',
              }}
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
    if (!deptSubList.length) return null
    return deptSubList.map((deptSub: DeptSub, index: number) => {
      const isItemSelected = isSelected(deptSub.id)
      const labelId = `enhanced-table-checkbox-${index}`
      return (
        <TableRow
          hover
          onClick={event => handleClickDeptSub(event, deptSub.id)}
          role="checkbox"
          aria-checked={isItemSelected}
          tabIndex={-1}
          key={deptSub.id}
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
          <TableCell align="center" sx={{ fontSize: '10px', maxWidth: '150px' }}>
            <Link
              to={`/management/deptSub/${deptSub.id}`}
              style={{ color: '#81B3AA', textDecoration: 'underline', fontWeight: 'bold' }}
            >
              {deptSub.subName}
            </Link>
          </TableCell>
          <TableCell align="center" sx={{ fontSize: '10px' }}>
            {deptSub.deptName}
          </TableCell>
          <TableCell align="center" sx={{ fontSize: '10px', minWidth: '60px' }}>
            {deptSub.doctors}
          </TableCell>
          <TableCell align="center" sx={{ fontSize: '10px', minWidth: '60px' }}>
            {deptSub.masterDoctors}
          </TableCell>
          <TableCell align="center" sx={{ fontSize: '10px', minWidth: '60px' }}>
            {deptSub.generalDoctors}
          </TableCell>
          <TableCell align="center" sx={{ fontSize: '10px' }}>
            {deptSub.location}
          </TableCell>
          <TableCell align="center" sx={{ fontSize: '10px' }}>
            <Box component="div" sx={{ display: 'flex', flexDirection: 'row' }}>
              <Button
                sx={{ padding: 0, minWidth: 0, marginRight: '6px' }}
                onClick={e => {
                  e.stopPropagation()
                  setDeptSubId(deptSub.id)
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
                  setSelected([deptSub.id])
                  setDOpen(true)
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
        <DeptSubForm
          id={deptSubId}
          handleCloseModal={() => {
            setOpen(false)
          }}
        />
      </CustomModal>
      <CustomModal
        open={dOpen}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '50vw',
          maxWidth: '360px',
          height: '50vh',
          maxHeight: '150px',
          bgcolor: 'background.paper',
          padding: '18px',
          paddingTop: '24px',
          paddingBottom: '24px',
        }}
        disableBackdropClick={false}
        handleCloseModal={() => {
          setDOpen(false)
        }}
      >
        <Box
          component="div"
          sx={{
            position: 'relative',
          }}
          className="hide-scroll"
        >
          <Typography
            component="div"
            sx={{
              fontSize: '15px',
              fontWeight: 'bold',
              marginBottom: '12px',
            }}
          >
            Are you sure delete {selected.length} of units?
          </Typography>
          <Typography
            component="div"
            sx={{
              fontSize: '10px',
            }}
          >
            Please confirm your deletion
          </Typography>
          {/* btns */}
          <Box
            component="div"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '30px',
              marginBottom: '12px',
            }}
          >
            {/* confirm */}
            <Box component="div" sx={{ marginRight: '6px' }}>
              <Button
                onClick={() => {
                  deleteDeptSub({
                    ids: [...selected],
                  })
                  setDOpen(false)
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
                    border: '1px solid #81B3AA',
                  }}
                >
                  <Typography
                    component="div"
                    sx={{ fontSize: '11px', color: '#81B3AA', fontWeight: 'bold' }}
                  >
                    Confirm
                  </Typography>
                </Box>
              </Button>
            </Box>
            {/* cancel */}
            <Box component="div">
              <Button
                onClick={() => {
                  setDOpen(false)
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
                    border: '1px solid #E37470',
                  }}
                >
                  <Typography
                    component="div"
                    sx={{ fontSize: '11px', color: '#E37470', fontWeight: 'bold' }}
                  >
                    Cancel
                  </Typography>
                </Box>
              </Button>
            </Box>
          </Box>
        </Box>
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
              <EnhancedTableHead
                numSelected={selected.length}
                order={defaultValues.order}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={deptSubList.length}
              />
              <TableBody>{renderTable()}</TableBody>
            </Table>
          </TableContainer>
          {deptSubList.length === 0 ? (
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
