import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, CircularProgress, IconButton, MenuItem, Typography } from '@mui/material'
import React, { FC, useCallback, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { useStaffService } from 'features/staff'
import FormSelect from 'libs/ui/components/FormSelect'
import FormTextField from 'libs/ui/components/FormTextField'

import { useDeptService } from '../hooks'
import { CreateDeptSubFormInput } from '../types'

const textboxFieldStyle = {
  '& div': {
    paddingLeft: 1,
    paddingRight: 1,
    minHeight: '90px',
  },
  '& p.Mui-error': {
    fontSize: '6px',
  },
  '& label': {
    fontSize: '10px',
    lineHeight: 1.67,
  },
  '& .MuiInputBase-root textarea': {
    padding: 0,
    fontSize: '11px',
  },
}
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
  '& div': {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: '9px',
    height: '32px',
  },
  '& svg': {
    right: 0,
  },
}

interface DeptSubFormProps {
  id?: number | null
  handleCloseModal: () => void
}

export const DeptSubForm: FC<DeptSubFormProps> = ({ handleCloseModal, id }) => {
  const [defaultValues, setDefauleValues] = useState<CreateDeptSubFormInput>({
    name: '',
    description: '',
    outpatient: true,
    outpatientId: '1',
    recommended: true,
    recommendedId: '1',
  })

  const { createDept, updateDept, isLoading, department } = useDeptService()
  const { fetchDepartments, departmentList } = useStaffService()

  useEffect(() => {
    fetchDepartments()
  }, [fetchDepartments])

  // form check
  const formValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Descrition is required'),
    recommended: Yup.bool().oneOf([true, false], 'Recommended is invalid'),
    outpatient: Yup.bool().oneOf([true, false], 'Recommended is invalid'),
  })
  const methods = useForm<CreateDeptSubFormInput, unknown>({
    defaultValues,
    resolver: yupResolver(formValidationSchema),
  })
  const { control, handleSubmit, reset, watch, setValue, getValues } = methods

  useEffect(() => {
    if (id && department) {
      setDefauleValues({
        name: department.name,
        description: department.description,
        recommended: department.recommended,
        recommendedId: department.recommended ? '1' : '2',
        outpatient: department.outpatient,
        outpatientId: department.outpatient ? '1' : '2',
      })

      setValue('name', department.name)
      setValue('description', department.description)
      setValue('recommended', department.recommended)
      setValue('recommendedId', department.recommended ? '1' : '2')
      setValue('outpatient', department.outpatient)
      setValue('outpatientId', department.outpatient ? '1' : '2')
    }
  }, [id, department, setValue])

  const onSubmitClick = (data: CreateDeptSubFormInput) => {
    const recommend = recommendList.find(i => i.id === Number(data.recommendedId))
    let formattedRecommend
    if (!recommend || recommend.id === 1) {
      formattedRecommend = true
    } else {
      formattedRecommend = false
    }
    const outpatient = outpatientList.find(i => i.id === Number(data.outpatientId))
    let formattedOutpatient
    if (!outpatient || outpatient.id === 1) {
      formattedOutpatient = true
    } else {
      formattedOutpatient = false
    }
    setValue('recommended', formattedRecommend)
    setValue('outpatient', formattedOutpatient)

    const values = getValues()
    if (id) {
      updateDept({
        ...values,
        id,
      })
    } else {
      createDept(values)
    }

    handleCloseModal()
  }

  return (
    <Box
      component="div"
      sx={{
        height: '80vh',
        maxHeight: '500px',
        overflowY: 'auto',
        overflowX: 'hidden',
        position: 'relative',
        paddingTop: '46px',
      }}
      className="hide-scroll"
    >
      {isLoading && !!id ? (
        <Box
          component="div"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.6)',
            zIndex: 2,
          }}
        >
          <CircularProgress />
        </Box>
      ) : null}
      <Box
        component="div"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          padding: '6px',
          paddingLeft: '18px',
          paddingRight: '9px',
          background: '#bebebf',
          zIndex: 1,
          boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        }}
      >
        <Typography
          component="div"
          sx={{
            fontSize: '15px',
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          {id ? 'Update' : 'Create'} Doctor
        </Typography>
        <IconButton onClick={handleCloseModal}>
          <CloseIcon
            sx={{
              padding: 0,
              fontSize: '18px',
              color: 'white',
            }}
          />
        </IconButton>
      </Box>
      {/* form */}
      {/* name */}
      <Box
        component="div"
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '12px' }}
      >
        <Typography
          component="div"
          sx={{
            fontSize: '10px',
            fontWeight: 'bold',
            marginRight: '12px',
            width: '60px',
          }}
        >
          Name
        </Typography>
        <FormTextField
          name="name"
          control={control}
          sx={textFieldStyle}
          type={'text'}
          variant={'outlined'}
        />
      </Box>
      {/* description */}
      <Box
        component="div"
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '12px' }}
      >
        <Typography
          component="div"
          sx={{
            fontSize: '10px',
            fontWeight: 'bold',
            marginRight: '12px',
            width: '60px',
          }}
        >
          Description
        </Typography>
        <FormTextField
          name="description"
          control={control}
          sx={textboxFieldStyle}
          type={'text'}
          variant={'outlined'}
          multiline
        />
      </Box>
      {/* outpatient */}
      <Box
        component="div"
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '12px' }}
      >
        <Typography
          component="div"
          sx={{
            fontSize: '10px',
            fontWeight: 'bold',
            marginRight: '12px',
            width: '60px',
          }}
        >
          Type
        </Typography>
        <FormSelect
          name="outpatientId"
          label={''}
          control={control}
          sx={selectFieldStyle}
          lsx={inputLabelStyle}
          errorMessage={'Invalid recommend'}
        >
          {outpatientList.map((out, index) => (
            <MenuItem key={index} value={out.id} sx={{ fontSize: '11px' }}>
              {out.name}
            </MenuItem>
          ))}
        </FormSelect>
      </Box>
      {/* recommend */}
      <Box
        component="div"
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '12px' }}
      >
        <Typography
          component="div"
          sx={{
            fontSize: '10px',
            fontWeight: 'bold',
            marginRight: '12px',
            width: '60px',
          }}
        >
          Recommend
        </Typography>
        <FormSelect
          name="recommendedId"
          label={''}
          control={control}
          sx={selectFieldStyle}
          lsx={inputLabelStyle}
          errorMessage={'Invalid recommend'}
        >
          {recommendList.map((recomm, index) => (
            <MenuItem key={index} value={recomm.id} sx={{ fontSize: '11px' }}>
              {recomm.name}
            </MenuItem>
          ))}
        </FormSelect>
      </Box>
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
        {/* submit */}
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
                Submit
              </Typography>
            </Box>
          </Button>
        </Box>
        {/* cancel */}
        <Box component="div">
          <Button
            onClick={() => {
              handleCloseModal()
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
  )
}
