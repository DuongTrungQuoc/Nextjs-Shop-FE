// ** react
import React from 'react'
import { useTranslation } from 'react-i18next'

// ** Mui
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  styled,
  Typography,
  useTheme
} from '@mui/material'
import IconifyIcon from '../Icon'

// ** Components

interface TConfirmationDialog {
  open: boolean
  handleClose: () => void
  title: string
  description: string
  handleConfirm: () => void
  handleCancel: () => void
}

const CustomStyleContent = styled(DialogContentText)(() => ({
  padding: '10px 20px'
}))

const StyleDialog = styled(Dialog)(() => ({
  '.MuiPaper-root.MuiPaper-elevation': {
    width: '400px'
  }
}))

const ConfirmationDialog = (props: TConfirmationDialog) => {
  // ** Props
  const { open, handleClose, title, description, handleConfirm, handleCancel } = props

  // ** Translation
  const { t } = useTranslation()

  // ** Theme
  const theme = useTheme()

  return (
    <StyleDialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <IconifyIcon icon='si:warning-line' fontSize={80} color={theme.palette.warning.main} />
      </Box>
      <DialogTitle sx={{ textAlign: 'center' }}>
        <Typography variant='h4' sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
      </DialogTitle>

      <CustomStyleContent>
        <DialogContentText sx={{ textAlign: 'center', marginBottom: '20px' }}>{description}</DialogContentText>
      </CustomStyleContent>
      <DialogActions>
        <Button variant='contained' onClick={handleConfirm}>
          {t('confirm')}
        </Button>
        <Button color='error' variant='outlined' onClick={handleCancel} autoFocus>
          {t('cancel')}
        </Button>
      </DialogActions>
    </StyleDialog>
  )
}

export default ConfirmationDialog
