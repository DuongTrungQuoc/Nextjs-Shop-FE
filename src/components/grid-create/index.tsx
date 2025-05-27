// ** React
import React from 'react'
import { useTranslation } from 'react-i18next'

// ** Mui
import { IconButton, Tooltip, useTheme } from '@mui/material'
import IconifyIcon from 'src/components/Icon'

interface TGridCreate {
  onClick: () => void
  disabled?: boolean
}

const GridCreate = (props: TGridCreate) => {
  // ** Props
  const { onClick, disabled } = props

  // Translation
  const { t } = useTranslation()

  // Theme
  const theme = useTheme()

  return (
    <Tooltip title={t('Create')}>
      <IconButton
        onClick={onClick}
        disabled={disabled}
        sx={{ backgroundColor: `${theme.palette.primary.main} !important`, color: `${theme.palette.common.white}` }}
      >
        <IconifyIcon icon='material-symbols:add' />
      </IconButton>
    </Tooltip>
  )
}

export default GridCreate
