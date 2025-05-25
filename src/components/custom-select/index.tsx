import { Box, MenuItem, MenuItemProps, Select, SelectProps, styled } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface TCustomSelect extends Omit<SelectProps, 'children'> {
  options: { label: string; value: string }[]
  value?: string | number | null
  label?: string
  onChange?: (event: any) => void
  fullWidth?: boolean
}

const StyleSelect = styled(Select)<SelectProps>(({ theme }) => ({
  '& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input': {
    padding: '8px 8px 8px 10px',
    height: '38px',
    boxSizing: 'border-box'
  }
}))

const StyleMenuItem = styled(MenuItem)<MenuItemProps>(({ theme }) => ({}))

const CustomSelect = (props: TCustomSelect) => {
  const { value, label, onChange, options, fullWidth, ...rest } = props
  const { t } = useTranslation()

  return (
    <Box sx={{ width: '100%', heigth: '100%', position: 'relative' }}>
      <StyleSelect fullWidth={fullWidth} value={value ?? ''} label={label} onChange={onChange} {...rest}>
        {options.length > 0 ? (
          options?.map(opt => {
            return (
              <StyleMenuItem value={opt.value} key={opt.value}>
                {opt.label}
              </StyleMenuItem>
            )
          })
        ) : (
          <StyleMenuItem>{t('no_data')}</StyleMenuItem>
        )}
      </StyleSelect>
    </Box>
  )
}

export default CustomSelect
