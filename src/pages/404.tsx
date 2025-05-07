// ** React Imports

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { ReactNode } from 'react'
import BlankLayout from 'src/views/layouts/BlankLayout'

const Error404 = () => {
  return (
    <Box className='content-center'>
      <Typography variant='h2' sx={{ mb: 1.5 }}>
        Page Not Found
      </Typography>
    </Box>
  )
}

export default Error404

Error404.getLayout = (pages: ReactNode) => <BlankLayout>{pages}</BlankLayout>
