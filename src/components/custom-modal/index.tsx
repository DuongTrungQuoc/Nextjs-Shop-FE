import { Box, Modal, ModalProps, styled } from '@mui/material'

interface TCustomModal extends ModalProps {}

const StyleModal = styled(Modal)<ModalProps>(({ theme }) => ({
  zIndex: 1202
}))

const CustomModal = (props: TCustomModal) => {
  const { children, open, onClose } = props

  return (
    <StyleModal open={open} onClose={onClose} aria-labelledby='modal-modal-title'>
      <Box
        sx={{
          height: '100%',
          width: '100vw'
        }}
      >
        <Box sx={{ maxHeight: '100vh', overflow: 'auto' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '100vh',
              height: '100%',
              width: '100%'
            }}
          >
            <Box sx={{ margin: '40px 0' }}>{children}</Box>
          </Box>
        </Box>
      </Box>
    </StyleModal>
  )
}

export default CustomModal
