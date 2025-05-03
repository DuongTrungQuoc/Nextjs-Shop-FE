// ** React
import React from 'react'

// ** next
import { useTranslation } from 'react-i18next'

// ** Mui Imports
import IconButton from '@mui/material/IconButton'
import { Menu, MenuItem } from '@mui/material'

// ** components
import IconifyIcon from 'src/components/Icon'

// ** config
import { LANGUAGE_OPTIONS } from 'src/configs/i18n'

type TProps = {}

const LanguageDropdown = (props: TProps) => {
  // ** State
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  // ** hook
  const { i18n } = useTranslation()

  const open = Boolean(anchorEl)

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleOnChangeLang = (lang: string) => {
    i18n.changeLanguage(lang)
  }
  console.log('i18n', i18n.language)

  return (
    <>
      <IconButton color='inherit' onClick={handleOpen} id='language-dropdown'>
        <IconifyIcon icon='material-symbols:translate' />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id='language-dropdown'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {LANGUAGE_OPTIONS.map(lang => (
          <MenuItem
            selected={lang.value === i18n.language}
            key={lang.value}
            onClick={() => handleOnChangeLang(lang.value)}
          >
            {lang?.lang}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default LanguageDropdown
