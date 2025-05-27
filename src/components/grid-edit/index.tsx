// ** React
import React from 'react'
import { useTranslation } from 'react-i18next'

// ** Mui
import { IconButton, Tooltip } from '@mui/material'
import IconifyIcon from 'src/components/Icon'

interface TGridEdit {
  onClick: () => void
  disabled?: boolean
}

const GridEdit = (props: TGridEdit) => {
  // ** Props
  const { onClick, disabled } = props

  const { t } = useTranslation()

  return (
    <Tooltip title={t('Edit')}>
      <IconButton onClick={onClick} disabled={disabled}>
        <IconifyIcon icon='fa-regular:edit' />
      </IconButton>
    </Tooltip>
  )
}

export default GridEdit
