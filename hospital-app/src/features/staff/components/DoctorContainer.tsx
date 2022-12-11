import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import { BoxWrapper } from 'components/BoxWrapper'
import FormTextField from 'libs/ui/components/FormTextField'

import { useStaffService } from '../hooks'
import { SearchDoctorFormInput, Department } from '../types'

const textFieldStyle = {
  '& div': {
    paddingLeft: 1,
    paddingRight: 1,
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

export const DoctorContainer = () => {
  const [defaultValues, setDefauleValues] = useState<SearchDoctorFormInput>({
    page: 1,
    length: 10,
    status: 1,
    // search fields
    name: '',
    deptId: 0,
    degree: null,
    job: null,
    recommended: null,
    // sort fields
    order: null,
  })

  const { isLoading } = useStaffService()
  const { fetchDepartments, departmentList } = useStaffService()

  useEffect(() => {
    fetchDepartments()
  }, [fetchDepartments])

  // form check
  const formValidationSchema = Yup.object().shape({
    // name: Yup.string().required('Name is required').max(20, 'Max. length is 20'),
  })
  const methods = useForm<SearchDoctorFormInput, unknown>({
    defaultValues,
    resolver: yupResolver(formValidationSchema),
  })
  const { control, handleSubmit } = methods

  const onSubmitClick = (data: SearchDoctorFormInput) => {
    console.log('hit submit here: ', data)
  }

  const renderLeftSideFields = () => (
    <Box component="div">
      {/* first row */}
      <Box
        component="div"
        sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginBottom: '12px' }}
      >
        {/* name */}
        <Box component="div" sx={{ width: '90px', marginRight: '12px' }}>
          <FormTextField
            name="name"
            label="Search name.."
            control={control}
            sx={textFieldStyle}
            type={'text'}
            variant={'outlined'}
          />
        </Box>
        {/* department */}
        <Box component="div" sx={{ width: '90px', marginRight: '12px' }}>
          <FormControl fullWidth>
            <InputLabel
              sx={{
                fontSize: '11px',
              }}
            >
              Department
            </InputLabel>
            <Select
              defaultValue={null}
              value={defaultValues.deptId}
              label="Department"
              // onChange={handleChange}
              sx={{
                height: '32px',
                fontSize: '11px',
              }}
            >
              {departmentList.map((dept, index) => (
                <MenuItem key={index} value={dept.id} sx={{ fontSize: '11px' }}>
                  {dept.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {/* education */}
        <Box component="div" sx={{ width: '90px', marginRight: '12px' }}>
          <FormControl fullWidth>
            <InputLabel
              sx={{
                fontSize: '11px',
              }}
            >
              Education
            </InputLabel>
            <Select
              value={10}
              label="Education"
              // onChange={handleChange}
              sx={{
                height: '32px',
                fontSize: '11px',
              }}
            >
              <MenuItem value={10} sx={{ fontSize: '11px' }}>
                Ten
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        {/* occupation */}
        <Box component="div" sx={{ width: '90px', marginRight: '12px' }}>
          <FormControl fullWidth>
            <InputLabel
              sx={{
                fontSize: '11px',
              }}
            >
              Occupation
            </InputLabel>
            <Select
              value={10}
              label="Occupation"
              // onChange={handleChange}
              sx={{
                height: '32px',
                fontSize: '11px',
              }}
            >
              <MenuItem value={10} sx={{ fontSize: '11px' }}>
                Ten
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        {/* recommended */}
        <Box component="div" sx={{ width: '90px', marginRight: '12px' }}>
          <FormControl fullWidth>
            <InputLabel
              sx={{
                fontSize: '11px',
              }}
            >
              Recommended
            </InputLabel>
            <Select
              value={10}
              label="Recommended"
              // onChange={handleChange}
              sx={{
                height: '32px',
                fontSize: '11px',
              }}
            >
              <MenuItem value={10} sx={{ fontSize: '11px' }}>
                Ten
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      {/* second row */}
      <Box component="div" sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {/* search */}
        <Box component="div">
          <Button onClick={handleSubmit(onSubmitClick)} sx={{ padding: 0 }}>
            <Box
              component="div"
              sx={{
                background: '#81B3AA',
                height: '32px',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '3px',
              }}
            >
              <Typography
                component="div"
                sx={{ fontSize: '11px', color: 'white', fontWeight: 'bold' }}
              >
                Search
              </Typography>
            </Box>
          </Button>
        </Box>
        {/* new */}
        <Box component="div">
          <Button onClick={handleSubmit(onSubmitClick)} sx={{ padding: 0 }}>
            <Box
              component="div"
              sx={{
                background: '#6b9bb9',
                height: '32px',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '3px',
              }}
            >
              <Typography
                component="div"
                sx={{ fontSize: '11px', color: 'white', fontWeight: 'bold' }}
              >
                Create
              </Typography>
            </Box>
          </Button>
        </Box>
        {/* delete */}
        <Box component="div">
          <Button onClick={handleSubmit(onSubmitClick)} sx={{ padding: 0 }}>
            <Box
              component="div"
              sx={{
                background: '#E37470',
                height: '32px',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '3px',
              }}
            >
              <Typography
                component="div"
                sx={{ fontSize: '11px', color: 'white', fontWeight: 'bold' }}
              >
                Delete
              </Typography>
            </Box>
          </Button>
        </Box>
      </Box>
    </Box>
  )

  const renderRightSideFields = () => (
    <Box component="div" sx={{ display: 'flex', flexDirection: 'row' }}>
      <Box component="div">
        <Button onClick={() => {}} sx={{ padding: 0 }}>
          <Box
            component="div"
            sx={{
              background: '#81B3AA',
              height: '32px',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderTopLeftRadius: '3px',
              borderBottomLeftRadius: '3px',
              boxSizing: 'border-box',
            }}
          >
            <Typography
              component="div"
              sx={{ fontSize: '11px', color: 'white', fontWeight: 'bold' }}
            >
              Live
            </Typography>
          </Box>
        </Button>
      </Box>
      <Box component="div">
        <Button onClick={() => {}} sx={{ padding: 0 }}>
          <Box
            component="div"
            sx={{
              height: '32px',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxSizing: 'border-box',
              border: '1px solid #bebebf',
            }}
          >
            <Typography
              component="div"
              sx={{ fontSize: '11px', color: '#bebebf', fontWeight: 'bold' }}
            >
              Resign
            </Typography>
          </Box>
        </Button>
      </Box>
      <Box component="div">
        <Button onClick={() => {}} sx={{ padding: 0 }}>
          <Box
            component="div"
            sx={{
              height: '32px',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderTopRightRadius: '3px',
              borderBottomRightRadius: '3px',
              boxSizing: 'border-box',
              border: '1px solid #bebebf',
            }}
          >
            <Typography
              component="div"
              sx={{ fontSize: '11px', color: '#bebebf', fontWeight: 'bold' }}
            >
              Retried
            </Typography>
          </Box>
        </Button>
      </Box>
    </Box>
  )

  return (
    <BoxWrapper>
      <Box
        component="div"
        sx={{
          paddingTop: '18px',
          paddingBottom: '18px',
          paddingLeft: '12px',
          paddingRight: '12px',
        }}
      >
        {/* top input fields */}
        <Box
          component="div"
          sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
        >
          {/* left side */}
          {renderLeftSideFields()}
          {/* right side */}
          {renderRightSideFields()}
        </Box>
        {/* table */}
        <Box component="div" sx={{ marginTop: '12px', border: '1px solid red' }}></Box>
      </Box>
    </BoxWrapper>
  )
}
