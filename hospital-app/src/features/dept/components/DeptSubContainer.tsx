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
import { truncate } from 'utils/common'

import { useDeptService } from '../hooks'
import { DeptSub, SearchDeptFormInput } from '../types'

// import { DeptForm } from './DeptForm'

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

type OutpatientType = {
  id: number
  name: string
}
const typeList: OutpatientType[] = [
  {
    id: 1,
    name: 'Internal',
  },
  {
    id: 2,
    name: 'External',
  },
]

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

interface EnhancedTableProps {
  numSelected: number
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  rowCount: number
}
interface HeadCell {
  id: keyof DeptSub
  label: string
}
const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'description',
    label: 'Description',
  },
  {
    id: 'outpatient',
    label: 'Type',
  },
  {
    id: 'recommended',
    label: 'Rate',
  },
  {
    id: 'subs',
    label: 'Section',
  },
  {
    id: 'doctors',
    label: 'Doctor',
  },
  {
    id: 'action',
    label: 'Actions',
  },
]

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { onSelectAllClick, numSelected, rowCount } = props

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

export const DeptSubContainer = () => {
  const [defaultValues, setDefauleValues] = useState<SearchDeptFormInput>({
    page: 0,
    length: 10,
    // search
    name: '',
    outpatientId: '',
    outpatient: '',
    recommendedId: '',
    recommended: '',
  })

  const [selected, setSelected] = useState<readonly number[]>([])
  const [deptId, setDeptId] = useState<number | null>(null)
  const [open, setOpen] = useState<boolean>(false)
  const [dOpen, setDOpen] = useState<boolean>(false)

  const { fetchDeptSubs, isLoading, deptSubList, totalCount } = useDeptService()

  // form check
  const formValidationSchema = Yup.object().shape({
    name: Yup.string().notRequired(),
    outpatientId: Yup.string().notRequired(),
    recommendedId: Yup.string().notRequired(),
  })
  const methods = useForm<SearchDeptFormInput, unknown>({
    defaultValues,
    resolver: yupResolver(formValidationSchema),
  })
  const { control, handleSubmit, reset, watch, setValue, getValues } = methods

  const fetchDeptSubList = useCallback(() => {
    const values = getValues()
    const form = {
      page: values.page + 1,
      length: values.length,
      // search
      name: values.name,
      outpatient: values.outpatient,
      recommended: values.recommended,
    }
    fetchDeptSubs(form)
  }, [fetchDeptSubs, getValues])

  // initial fetch
  useEffect(() => {
    fetchDeptSubList()
  }, [fetchDeptSubList])

  const onSearchClick = (data: SearchDeptFormInput) => {
    const type = typeList.find(i => i.id === Number(data.outpatientId))
    const recommend = recommendList.find(i => i.id === Number(data.recommendedId))
    let formattedOutpatient
    let formattedRecommend
    if (type) {
      if (type.id === 1) {
        formattedOutpatient = false
      } else {
        formattedOutpatient = true
      }
    }
    if (recommend) {
      if (recommend.id === 1) {
        formattedRecommend = true
      } else {
        formattedRecommend = false
      }
    }
    setValue('outpatient', formattedOutpatient)
    setValue('recommended', formattedRecommend)
    setValue('page', 0)
    fetchDeptSubList()
  }

  const handleResetFields = () => {
    reset({
      page: 0,
      length: 10,
      // search
      name: '',
      outpatientId: '',
      outpatient: '',
      recommendedId: '',
      recommended: '',
    })
    fetchDeptSubList()
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = deptSubList.map(dept => dept.id)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const handleClickDept = (event: React.MouseEvent<unknown>, id: number) => {
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
      {/* type */}
      <Box component="div" sx={{ width: '90px', marginRight: '6px' }}>
        <FormSelect
          name="outpatientId"
          label={'Type'}
          control={control}
          sx={selectFieldStyle}
          lsx={inputLabelStyle}
          errorMessage={'Invalid type'}
        >
          {typeList.map((t, index) => (
            <MenuItem key={index} value={t.id} sx={{ fontSize: '11px' }}>
              {t.name}
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
            setDeptId(null)
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
    return deptSubList.map((dept, index) => {
      const isItemSelected = isSelected(dept.id)
      const labelId = `enhanced-table-checkbox-${index}`
      return (
        <TableRow
          hover
          onClick={event => handleClickDept(event, dept.id)}
          role="checkbox"
          aria-checked={isItemSelected}
          tabIndex={-1}
          key={dept.id}
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
              to={`/management/dept/${dept.id}`}
              style={{ color: '#81B3AA', textDecoration: 'underline', fontWeight: 'bold' }}
            >
              {dept.name}
            </Link>
          </TableCell>
          <TableCell align="center" sx={{ fontSize: '10px' }} title={dept.description}>
            {truncate(dept.description, 30)}
          </TableCell>
          <TableCell align="center" sx={{ fontSize: '10px' }}>
            {dept.outpatient ? 'External' : 'Internal'}
          </TableCell>
          <TableCell align="center" sx={{ fontSize: '10px' }}>
            {dept.recommended ? 'Recommend' : 'Regular'}
          </TableCell>
          <TableCell align="center" sx={{ fontSize: '10px' }}>
            {dept.subs}
          </TableCell>
          <TableCell align="center" sx={{ fontSize: '10px' }}>
            {dept.doctors}
          </TableCell>
          <TableCell align="center" sx={{ fontSize: '10px' }}>
            <Box component="div" sx={{ display: 'flex', flexDirection: 'row' }}>
              <Button
                sx={{ padding: 0, minWidth: 0, marginRight: '6px' }}
                onClick={e => {
                  e.stopPropagation()
                  setDeptId(dept.id)
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
                  setSelected([dept.id])
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
        {/* <DeptForm
          id={deptId}
          handleCloseModal={() => {
            setOpen(false)
          }}
        /> */}
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
            Are you sure delete {selected.length} of departments?
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
                  // deleteDoctor({
                  //   ids: [...selected],
                  // })
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
                onSelectAllClick={handleSelectAllClick}
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
