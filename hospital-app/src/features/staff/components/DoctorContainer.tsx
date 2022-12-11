import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Box, Button, MenuItem, SelectChangeEvent, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import { BoxWrapper } from 'components/BoxWrapper'
import FormSelect from 'libs/ui/components/FormSelect'
import FormTextField from 'libs/ui/components/FormTextField'

import { useStaffService } from '../hooks'
import { SearchDoctorFormInput, Degree, Occupation } from '../types'

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

export const DoctorContainer = () => {
  const [defaultValues, setDefauleValues] = useState<SearchDoctorFormInput>({
    page: 1,
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
    order: '',
  })

  const { isLoading } = useStaffService()
  const { fetchDepartments, departmentList } = useStaffService()

  useEffect(() => {
    fetchDepartments()
  }, [fetchDepartments])

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
  const { control, handleSubmit } = methods

  const onSubmitClick = (data: SearchDoctorFormInput) => {
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
    const mergedForm = {
      ...data,
      status: defaultValues.status,
      degree: degree?.name,
      job: job?.name,
      recommend: formattedRecommend,
    }
    console.log('!!!!!!!!!')
    console.log('!!!!!!!!!')
    console.log('!!!!!!!!!')
    console.log('!!!!!!!!!')
    console.log('!!!!!!!!!')
    console.log('mergedForm: ', mergedForm)
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
          label="Search name.."
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
        <Button
          onClick={() => {
            setDefauleValues({
              ...defaultValues,
              status: 1,
            })
          }}
          sx={{ padding: 0 }}
        >
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
        <Button
          onClick={() => {
            setDefauleValues({
              ...defaultValues,
              status: 2,
            })
          }}
          sx={{ padding: 0 }}
        >
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
        <Button
          onClick={() => {
            setDefauleValues({
              ...defaultValues,
              status: 3,
            })
          }}
          sx={{ padding: 0 }}
        >
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
    <Box component="div" sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      {/* search */}
      <Box component="div" sx={{ marginRight: '6px' }}>
        <Button onClick={handleSubmit(onSubmitClick)} sx={{ padding: 0 }}>
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
    <Box component="div" sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      {/* new */}
      <Box component="div" sx={{ marginRight: '6px' }}>
        <Button onClick={handleSubmit(onSubmitClick)} sx={{ padding: 0 }}>
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
        <Box component="div" sx={{ marginTop: '12px', border: '1px solid red' }}></Box>
      </Box>
    </BoxWrapper>
  )
}
