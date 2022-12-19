import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, CircularProgress, IconButton, MenuItem, Typography } from '@mui/material'
import React, { FC, useCallback, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import FormSelect from 'libs/ui/components/FormSelect'
import FormTextField from 'libs/ui/components/FormTextField'
import FormTimePicker from 'libs/ui/components/FormTimePicker'

import { useStaffService } from '../hooks'
import { CreateDoctorFormInput, Sex, Degree, Occupation } from '../types'

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
const timePickerStyle = {
  height: '32px',
  width: '100%',
  '& div input': {
    height: '32px',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: '9px',
    paddingRight: '9px',
    fontSize: '11px',
  },
  '& div div button svg': {
    fontSize: '18px',
  },
}

type SexType = {
  id: number
  name: string
}
const sexList: SexType[] = [
  {
    id: 1,
    name: Sex.MALE,
  },
  {
    id: 2,
    name: Sex.FEMALE,
  },
  {
    id: 3,
    name: Sex.UNISEX,
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

type StatusType = {
  id: number
  name: string
}
const statusList: StatusType[] = [
  {
    id: 1,
    name: 'Active',
  },
  {
    id: 2,
    name: 'Inactive',
  },
  {
    id: 3,
    name: 'Retried',
  },
]

type DeptAndSubType = { id: string; name: string; value: number | null; isSection: boolean }

interface DoctorFormProps {
  id?: number | null
  handleCloseModal: () => void
}

export const DoctorForm: FC<DoctorFormProps> = ({ handleCloseModal, id }) => {
  const [defaultValues, setDefauleValues] = useState<CreateDoctorFormInput>({
    name: '',
    pid: '',
    sex: Sex.MALE,
    sexId: '1',
    birthday: new Date(),
    school: '',
    degree: Degree.BACHELOR,
    degreeId: '1',
    tel: '',
    address: '',
    email: '',
    job: Occupation.SPECIALIST,
    jobId: '1',
    remark: '',
    description: '',
    hiredate: new Date(),
    tag: [],
    tagStr: '',
    recommended: true,
    recommendedId: '2',
    status: 1,
    subId: '',
  })
  const [formattedList, setFormattedList] = useState<DeptAndSubType[]>([])

  const {
    createDoctor,
    updateDoctor,
    fetchDeptAndSub,
    fetchDoctorFullDetail,
    isLoading,
    deptAndSubMap,
    doctorDetail,
  } = useStaffService()

  useEffect(() => {
    if (id) {
      fetchDoctorFullDetail({
        id,
      })
    }
  }, [id, fetchDoctorFullDetail])

  useEffect(() => {
    fetchDeptAndSub()
  }, [fetchDeptAndSub])

  useEffect(() => {
    // we need to transfer to map into list for formselect
    const tempList: DeptAndSubType[] = []
    Object.keys(deptAndSubMap).forEach((key, index) => {
      const arr = deptAndSubMap[key]
      tempList.push({
        id: String(index),
        name: key,
        value: null,
        isSection: true,
      })
      arr.forEach((item, indexx) => {
        tempList.push({
          id: `${index}-${indexx}`,
          name: item.subName,
          value: item.subId,
          isSection: false,
        })
      })
    })
    setFormattedList(tempList)
  }, [deptAndSubMap])

  // form check
  const formValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    pid: Yup.string().required('PID is required'),
    sex: Yup.mixed<Sex>().oneOf(Object.values(Sex)),
    birthday: Yup.date().max(new Date()),
    school: Yup.string().required('School is required'),
    degree: Yup.mixed<Degree>().oneOf(Object.values(Degree)),
    tel: Yup.string().matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      'Tel is invalid',
    ),
    address: Yup.string().required('Address is required'),
    email: Yup.string().email().required('Email is required'),
    job: Yup.mixed<Occupation>().oneOf(Object.values(Occupation)),
    remark: Yup.string().required('Remark is required'),
    description: Yup.string().required('Descrition is required'),
    hiredate: Yup.date().max(new Date()).required('Hiredate is required'),
    tag: Yup.array().of(Yup.string()),
    recommended: Yup.bool().oneOf([true, false], 'Recommended is invalid'),
    status: Yup.number()
      .min(1, 'Must be greater than 1')
      .max(3, 'Must be less than 3')
      .required('Status is required'),
    subId: Yup.number().min(1, 'Must be greater than 1').required('SubId is required'),
  })
  const methods = useForm<CreateDoctorFormInput, unknown>({
    defaultValues,
    resolver: yupResolver(formValidationSchema),
  })
  const { control, handleSubmit, reset, watch, setValue, getValues } = methods

  useEffect(() => {
    if (id && doctorDetail) {
      // re-format the enum
      const sex = Object.keys(Sex)[
        Object.values(Sex).indexOf(doctorDetail.sex as unknown as Sex)
      ] as keyof typeof Sex
      const sexId = sexList.find(item => item.name === Sex[sex || 'MALE'])?.id
      //
      const degree = Object.keys(Degree)[
        Object.values(Degree).indexOf(doctorDetail.degree as unknown as Degree)
      ] as keyof typeof Degree
      const degreeId = degreeList.find(item => item.name === Degree[degree || 'BACHELOR'])?.id
      //
      const job = Object.keys(Occupation)[
        Object.values(Occupation).indexOf(doctorDetail.job as unknown as Occupation)
      ] as keyof typeof Occupation
      const jobId = occupationList.find(item => item.name === Occupation[job || 'SPECIALIST'])?.id

      setDefauleValues({
        name: doctorDetail.name,
        pid: doctorDetail.pid,
        sex: Sex[sex || 'MALE'],
        sexId: String(sexId || 1),
        birthday: new Date(doctorDetail.birthday),
        school: doctorDetail.school,
        degree: Degree[degree || 'BACHELOR'],
        degreeId: String(degreeId || 1),
        tel: doctorDetail.tel,
        address: doctorDetail.address,
        email: doctorDetail.email,
        job: Occupation[job || 'SPECIALIST'],
        jobId: String(jobId || 1),
        remark: doctorDetail.remark,
        description: doctorDetail.description,
        hiredate: new Date(doctorDetail.hiredate),
        tag: doctorDetail.tag,
        tagStr: '',
        recommended: doctorDetail.recommended,
        recommendedId: doctorDetail.recommended ? '1' : '2',
        status: doctorDetail.status,
        subId: doctorDetail.deptSubId,
      })

      setValue('name', doctorDetail.name)
      setValue('pid', doctorDetail.pid)
      setValue('sex', Sex[sex || 'MALE'])
      setValue('sexId', String(sexId || 1))
      setValue('birthday', new Date(doctorDetail.birthday))
      setValue('school', doctorDetail.school)
      setValue('degree', Degree[degree || 'BACHELOR'])
      setValue('degreeId', String(degreeId || 1))
      setValue('tel', doctorDetail.tel)
      setValue('address', doctorDetail.address)
      setValue('email', doctorDetail.email)
      setValue('job', Occupation[job || 'SPECIALIST'])
      setValue('jobId', String(jobId || 1))
      setValue('remark', doctorDetail.remark)
      setValue('description', doctorDetail.description)
      setValue('hiredate', new Date(doctorDetail.hiredate))
      setValue('tag', doctorDetail.tag)
      setValue('tagStr', '')
      setValue('recommended', doctorDetail.recommended)
      setValue('recommendedId', doctorDetail.recommended ? '1' : '2')
      setValue('status', doctorDetail.status)
      setValue('subId', doctorDetail.deptSubId)
    }
  }, [id, doctorDetail, setValue])

  const handleTagStrEnter = () => {
    const values = getValues()
    const { tag } = values
    if (!values.tagStr) return
    tag.push(values.tagStr)
    setValue('tagStr', '')
    setValue('tag', tag)
    setDefauleValues({
      ...defaultValues,
      tag,
    })
  }

  const handleTagDelete = (index: number) => {
    const values = getValues()
    const { tag } = values
    tag.splice(index, 1)
    setValue('tag', tag)
    setDefauleValues({
      ...defaultValues,
      tag,
    })
  }

  const onSubmitClick = (data: CreateDoctorFormInput) => {
    const sex = sexList.find(i => i.id === Number(data.sexId))
    const degree = degreeList.find(i => i.id === Number(data.degreeId))
    const job = occupationList.find(i => i.id === Number(data.jobId))
    const recommend = recommendList.find(i => i.id === Number(data.recommendedId))
    let formattedRecommend
    if (!recommend || recommend.id === 1) {
      formattedRecommend = true
    } else {
      formattedRecommend = false
    }
    setValue('sex', sex?.name as Sex)
    setValue('degree', degree?.name as Degree)
    setValue('job', job?.name as Occupation)
    setValue('recommended', formattedRecommend)

    const values = getValues()

    if (id) {
      updateDoctor({
        ...values,
        id,
      })
    } else {
      createDoctor(values)
    }

    handleCloseModal()
  }

  const renderDeptAndSubMap: () => React.ReactNode = () =>
    formattedList.map(item => (
      <MenuItem
        key={item.id}
        value={item.value || ''}
        sx={{
          pointerEvents: item.isSection ? 'none' : 'auto',
          fontSize: '11px',
        }}
      >
        {item.isSection ? (
          <Box component="div" sx={{}}>
            <Typography
              component="div"
              sx={{
                fontSize: '9px',
                fontWeight: 'bold',
                marginLeft: '-6px',
              }}
            >
              {item.name}
            </Typography>
          </Box>
        ) : (
          item.name
        )}
      </MenuItem>
    ))

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
      {/* pid */}
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
          SIN
        </Typography>
        <FormTextField
          name="pid"
          control={control}
          sx={textFieldStyle}
          type={'text'}
          variant={'outlined'}
        />
      </Box>
      {/* sex */}
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
          Gender
        </Typography>
        <FormSelect
          name="sexId"
          label={''}
          control={control}
          sx={selectFieldStyle}
          lsx={inputLabelStyle}
          errorMessage={'Invalid sex'}
        >
          {sexList.map((sex, index) => (
            <MenuItem key={index} value={sex.id} sx={{ fontSize: '11px' }}>
              {sex.name}
            </MenuItem>
          ))}
        </FormSelect>
      </Box>
      {/* birthday */}
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
          DOB
        </Typography>
        <FormTimePicker name="birthday" label={''} control={control} sx={timePickerStyle} />
      </Box>
      {/* school */}
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
          School
        </Typography>
        <FormTextField
          name="school"
          control={control}
          sx={textFieldStyle}
          type={'text'}
          variant={'outlined'}
        />
      </Box>
      {/* degree */}
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
          Academy
        </Typography>
        <FormSelect
          name="degreeId"
          label={''}
          control={control}
          sx={selectFieldStyle}
          lsx={inputLabelStyle}
          errorMessage={'Invalid degree'}
        >
          {degreeList.map((degree, index) => (
            <MenuItem key={index} value={degree.id} sx={{ fontSize: '11px' }}>
              {degree.name}
            </MenuItem>
          ))}
        </FormSelect>
      </Box>
      {/* tel */}
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
          Phone
        </Typography>
        <FormTextField
          name="tel"
          control={control}
          sx={textFieldStyle}
          type={'text'}
          variant={'outlined'}
        />
      </Box>
      {/* address */}
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
          Address
        </Typography>
        <FormTextField
          name="address"
          control={control}
          sx={textFieldStyle}
          type={'text'}
          variant={'outlined'}
        />
      </Box>
      {/* email */}
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
          Email
        </Typography>
        <FormTextField
          name="email"
          control={control}
          sx={textFieldStyle}
          type={'text'}
          variant={'outlined'}
        />
      </Box>
      {/* job */}
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
          Occupation
        </Typography>
        <FormSelect
          name="jobId"
          label={''}
          control={control}
          sx={selectFieldStyle}
          lsx={inputLabelStyle}
          errorMessage={'Invalid occupation'}
        >
          {occupationList.map((occup, index) => (
            <MenuItem key={index} value={occup.id} sx={{ fontSize: '11px' }}>
              {occup.name}
            </MenuItem>
          ))}
        </FormSelect>
      </Box>
      {/* dept&sub */}
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
          Department
        </Typography>
        <FormSelect
          name="subId"
          label={''}
          control={control}
          sx={selectFieldStyle}
          lsx={inputLabelStyle}
          errorMessage={'Invalid department'}
        >
          {renderDeptAndSubMap()}
        </FormSelect>
      </Box>
      {/* remark */}
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
          Remark
        </Typography>
        <FormTextField
          name="remark"
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
      {/* hiredate */}
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
          Employed
        </Typography>
        <FormTimePicker name="hiredate" label={''} control={control} sx={timePickerStyle} />
      </Box>
      {/* tag */}
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
          Hightlights
        </Typography>
        <FormTextField
          name="tagStr"
          control={control}
          sx={textFieldStyle}
          type={'text'}
          variant={'outlined'}
          onEnterPress={handleTagStrEnter}
        />
      </Box>
      {defaultValues.tag.length ? (
        <Box
          component="div"
          sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginBottom: '12px' }}
        >
          {defaultValues.tag.map((ta, index) => (
            <Button key={index} sx={{ padding: 0 }} onClick={() => handleTagDelete(index)}>
              <Box
                component="div"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '6px',
                  marginBottom: '6px',
                  background: '#81B3AA',
                  height: '21px',
                  borderRadius: '9px',
                }}
              >
                <Typography
                  component="div"
                  sx={{
                    fontSize: '9px',
                    fontWeight: 'bold',
                    color: 'white',
                    paddingLeft: '12px',
                    paddingRight: '12px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {ta}
                  <CloseIcon
                    sx={{
                      padding: 0,
                      fontSize: '12px',
                      color: 'white',
                      marginLeft: '3px',
                    }}
                  />
                </Typography>
              </Box>
            </Button>
          ))}
        </Box>
      ) : null}
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
      {/* status */}
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
          Status
        </Typography>
        <FormSelect
          name="status"
          label={''}
          control={control}
          sx={selectFieldStyle}
          lsx={inputLabelStyle}
          errorMessage={'Invalid status'}
        >
          {statusList.map((s, index) => (
            <MenuItem key={index} value={s.id} sx={{ fontSize: '11px' }}>
              {s.name}
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
