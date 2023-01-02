import { Backdrop, Box, Fade, Modal, SxProps, Theme } from '@mui/material'
import React from 'react'

export interface CustomModalProps {
  open: boolean
  sx?: SxProps<Theme>
  disableBackdropClick: boolean
  children: React.ReactNode
  handleCloseModal: () => void
}

export const CustomModal = ({
  open,
  sx,
  disableBackdropClick,
  children,
  handleCloseModal,
}: CustomModalProps) => (
  <Modal
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    open={open}
    onClose={(_, reason) => {
      if (reason === 'backdropClick' && disableBackdropClick) return
      handleCloseModal()
    }}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
  >
    <Fade in={open}>
      <Box sx={sx}>{children}</Box>
    </Fade>
  </Modal>
)
