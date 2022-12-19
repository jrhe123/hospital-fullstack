import { Icon } from '@iconify/react'
import { Box, Button, Typography, Divider } from '@mui/material'
import dayjs from 'dayjs'
import React, { useCallback, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import AvatarImage from 'assets/images/doctor/avatar.png'
import { BoxWrapper } from 'components/BoxWrapper'
import { CustomModal } from 'components/Modal'
import { Env } from 'config/Env'

import { useStaffService } from '../hooks'

import { DoctorForm } from './DoctorForm'

type DoctorDetailParams = {
  id?: string
}

export const DoctorDetailContainer = () => {
  const { id } = useParams<DoctorDetailParams>()
  const [open, setOpen] = useState<boolean>(false)
  const [dOpen, setDOpen] = useState<boolean>(false)

  const navigate = useNavigate()
  const { isLoading, doctor, fetchDoctorDetail, uploadDoctorPhoto, deleteDoctor } =
    useStaffService()

  if (!id) {
    navigate('/staff/doctor')
  }

  useEffect(() => {
    fetchDoctorDetail({
      id: Number(id),
    })
  }, [fetchDoctorDetail, id])

  if (!doctor) return null

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget
    if (!id || !files || !files?.length) return
    if (files.length !== 1) {
      toast.warn('Please select your image')
      return
    }
    const file = files[0]
    uploadDoctorPhoto({
      doctorId: id,
      file,
    })
  }

  const renderLeftSideBtns = () => (
    <Box
      component="div"
      sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}
    >
      {/* left */}
      <Box component="div">
        <Button
          onClick={() => {
            navigate(-1)
          }}
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
              Back
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
      {/* edit */}
      <Box component="div" sx={{ marginRight: '6px' }}>
        <Button
          onClick={() => {
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
              Edit
            </Typography>
          </Box>
        </Button>
      </Box>
      {/* delete */}
      <Box component="div">
        <Button
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
          id={Number(id)}
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
            Are you sure delete current doctor?
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
                  if (!id) return
                  setDOpen(false)
                  deleteDoctor({
                    ids: [Number(id)],
                  })
                  navigate(-1)
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
        {/* btn row */}
        <Box
          component="div"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: '24px',
          }}
        >
          {/* left side */}
          {renderLeftSideBtns()}
          {/* right side */}
          {renderRightSideBtns()}
        </Box>
        {/* information */}
        {/* first row */}
        <Box
          component="div"
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Box component="div" sx={{ padding: '12px', width: '150px' }}>
            <Button sx={{ padding: 0 }} component="label">
              <input
                type="file"
                accept="image/png, image/jpeg"
                hidden
                onChange={handleImageChange}
              />
              <Box
                component="img"
                sx={{
                  width: '100%',
                  cursor: 'pointer',
                  display: 'block',
                  objectFit: 'cover',
                }}
                alt={'doctor image'}
                src={doctor.photo ? `${Env.MINIO_BASE_URL}${doctor.photo}` : AvatarImage}
              />
            </Button>
          </Box>
          <Box component="div" sx={{ padding: '12px', flexGrow: 1 }}>
            {/* #1 */}
            <Box
              component="div"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flex: 1,
                marginBottom: '12px',
              }}
            >
              <Box component="div" sx={{ flex: 1 }}>
                <Typography
                  component="div"
                  sx={{
                    fontSize: '10px',
                    marginBottom: '6px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Icon icon="mdi:id-card-outline" fontSize={10} style={{ marginRight: '5px' }} />
                  SIN
                </Typography>
                <Typography
                  component="div"
                  sx={{
                    fontSize: '12px',
                    fontWeight: 'bold',
                  }}
                >
                  {doctor.pid}
                </Typography>
              </Box>
              <Box component="div" sx={{ flex: 1 }}>
                <Typography
                  component="div"
                  sx={{
                    fontSize: '10px',
                    marginBottom: '6px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Icon icon="iwwa:year" fontSize={10} style={{ marginRight: '5px' }} />
                  DOB
                </Typography>
                <Typography
                  component="div"
                  sx={{
                    fontSize: '12px',
                    fontWeight: 'bold',
                  }}
                >
                  {dayjs(doctor.birthday).format('MMM D, YYYY')}
                </Typography>
              </Box>
            </Box>
            {/* #2 */}
            <Box
              component="div"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flex: 1,
                marginBottom: '12px',
              }}
            >
              <Box component="div" sx={{ flex: 1 }}>
                <Typography
                  component="div"
                  sx={{
                    fontSize: '10px',
                    marginBottom: '6px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Icon icon="ic:round-qr-code" fontSize={10} style={{ marginRight: '5px' }} />
                  SID
                </Typography>
                <Typography
                  component="div"
                  sx={{
                    fontSize: '12px',
                    fontWeight: 'bold',
                  }}
                >
                  {doctor.uuid}
                </Typography>
              </Box>
              <Box component="div" sx={{ flex: 1 }}>
                <Typography
                  component="div"
                  sx={{
                    fontSize: '10px',
                    marginBottom: '6px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Icon icon="maki:doctor" fontSize={10} style={{ marginRight: '5px' }} />
                  Career
                </Typography>
                <Typography
                  component="div"
                  sx={{
                    fontSize: '12px',
                    fontWeight: 'bold',
                  }}
                >
                  {dayjs(doctor.hiredate).format('MMM D, YYYY')}
                </Typography>
              </Box>
            </Box>
            {/* #3 */}
            <Box
              component="div"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flex: 1,
                marginBottom: '12px',
              }}
            >
              <Box component="div" sx={{ flex: 1 }}>
                <Typography
                  component="div"
                  sx={{
                    fontSize: '10px',
                    marginBottom: '6px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Icon icon="ic:baseline-email" fontSize={10} style={{ marginRight: '5px' }} />
                  Email
                </Typography>
                <Typography
                  component="div"
                  sx={{
                    fontSize: '12px',
                    fontWeight: 'bold',
                  }}
                >
                  {doctor.email}
                </Typography>
              </Box>
              <Box component="div" sx={{ flex: 1 }}>
                <Typography
                  component="div"
                  sx={{
                    fontSize: '10px',
                    marginBottom: '6px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Icon
                    icon="material-symbols:note-alt"
                    fontSize={10}
                    style={{ marginRight: '5px' }}
                  />
                  Remark
                </Typography>
                <Typography
                  component="div"
                  sx={{
                    fontSize: '12px',
                    fontWeight: 'bold',
                  }}
                >
                  {doctor.remark}
                </Typography>
              </Box>
            </Box>
            {/* #4 */}
            <Box
              component="div"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flex: 1,
                marginBottom: '12px',
              }}
            >
              <Box component="div" sx={{ flex: 1 }}>
                <Typography
                  component="div"
                  sx={{
                    fontSize: '10px',
                    marginBottom: '6px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Icon icon="mdi:address-marker" fontSize={10} style={{ marginRight: '5px' }} />
                  Address
                </Typography>
                <Typography
                  component="div"
                  sx={{
                    fontSize: '12px',
                    fontWeight: 'bold',
                  }}
                >
                  {doctor.address}
                </Typography>
              </Box>
            </Box>
            {/* #5 */}
            <Box
              component="div"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flex: 1,
                marginBottom: '12px',
              }}
            >
              <Box component="div" sx={{ flex: 1 }}>
                <Typography
                  component="div"
                  sx={{
                    fontSize: '10px',
                    marginBottom: '6px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Icon icon="mdi:prize" fontSize={10} style={{ marginRight: '5px' }} />
                  Highlights
                </Typography>
                <Box component="div" sx={{ display: 'flex', flexDirection: 'row' }}>
                  {doctor.tag.map((tag, index) => (
                    <Box
                      key={index}
                      component="div"
                      sx={{
                        background: '#81B3AA',
                        borderRadius: '9px',
                        paddingLeft: '12px',
                        paddingRight: '12px',
                        paddingTop: '3px',
                        paddingBottom: '3px',
                        marginRight: '9px',
                      }}
                    >
                      <Typography
                        component="div"
                        sx={{
                          fontSize: '9px',
                          fontWeight: 'bold',
                          color: 'white',
                        }}
                      >
                        {tag}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* second row */}
        <Divider sx={{ color: '#bebebf' }} />
        <Box component="div" sx={{ padding: '12px', marginTop: '12px' }}>
          <Typography
            component="div"
            sx={{
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          >
            {doctor.description}
          </Typography>
        </Box>
      </Box>
    </BoxWrapper>
  )
}
