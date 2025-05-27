// ** React
import React from 'react'
import { useTranslation } from 'react-i18next'

// ** Mui
import { IconButton, Tooltip } from '@mui/material'
import IconifyIcon from 'src/components/Icon'

interface TGridDelete {
  onClick: () => void
  disabled?: boolean
}

const GridDelete = (props: TGridDelete) => {
  // ** Props
  const { onClick, disabled } = props

  const { t } = useTranslation()

  return (
    <Tooltip title={t('Delete')}>
      <IconButton onClick={onClick} disabled={disabled}>
        <IconifyIcon icon='material-symbols:delete-outline' />
      </IconButton>
    </Tooltip>
  )
}

export default GridDelete
