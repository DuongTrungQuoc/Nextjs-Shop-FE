// ** react
import React from 'react'
import { useTranslation } from 'react-i18next'

// ** Mui
import { InputBase, styled, useTheme } from '@mui/material'

// ** Components
import IconifyIcon from '../Icon'

interface TInputSearch {}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  marginLeft: '0px !important',
  width: '100%',
  height: '38px',
  border: `1px solid ${theme.palette.customColors.borderColor}`,
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto'
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  height: '100%',
  '& .MuiInputBase-input': {
    width: '100%',
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`
  }
}))

const InputSearch = (props: TInputSearch) => {
  const { t } = useTranslation()
  const theme = useTheme()

  return (
    <Search>
      <SearchIconWrapper>
        <IconifyIcon icon='iconamoon:search' />
      </SearchIconWrapper>
      <StyledInputBase placeholder='Search…' inputProps={{ 'aria-label': 'search' }} />
    </Search>
  )
}

export default InputSearch
