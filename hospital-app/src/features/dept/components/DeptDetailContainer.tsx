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

import { useDeptService } from '../hooks'

import { DeptForm } from './DeptForm'

type DepartmentDetailParams = {
  id?: string
}

export const DeptDetailContainer = () => {
  const { id } = useParams<DepartmentDetailParams>()
  const [open, setOpen] = useState<boolean>(false)
  const [dOpen, setDOpen] = useState<boolean>(false)

  const navigate = useNavigate()
  const { isLoading, department, fetchDept, deleteDept } = useDeptService()

  if (!id) {
    navigate('/management/dept')
  }

  useEffect(() => {
    fetchDept({
      id: Number(id),
    })
  }, [fetchDept, id])

  if (!department) return null

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
        <DeptForm
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
            Are you sure delete current department?
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
                  deleteDept({
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
                  <Icon icon="mdi:hospital-marker" fontSize={10} style={{ marginRight: '5px' }} />
                  Department name
                </Typography>
                <Typography
                  component="div"
                  sx={{
                    fontSize: '12px',
                    fontWeight: 'bold',
                  }}
                >
                  {department.name}
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
                  <Icon icon="carbon:category-new" fontSize={10} style={{ marginRight: '5px' }} />
                  Type
                </Typography>
                <Typography
                  component="div"
                  sx={{
                    fontSize: '12px',
                    fontWeight: 'bold',
                  }}
                >
                  {department.outpatient ? 'External' : 'Internal'}
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
                  <Icon icon="carbon:recommend" fontSize={10} style={{ marginRight: '5px' }} />
                  System rate
                </Typography>
                <Typography
                  component="div"
                  sx={{
                    fontSize: '12px',
                    fontWeight: 'bold',
                  }}
                >
                  {department.recommended ? 'Recommended' : 'Regular'}
                </Typography>
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
            {department.description}
          </Typography>
        </Box>
      </Box>
    </BoxWrapper>
  )
}
