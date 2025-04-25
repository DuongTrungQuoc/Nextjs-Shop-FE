// ** Next
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

// ** React
import { useState } from 'react'

// ** MUI
import {
  Box,
  CssBaseline,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
  useTheme
} from '@mui/material'

// ** components
import CustomTextField from 'src/components/text-field'
import Icon from 'src/components/Icon'

// ** react-hook-form
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// ** config
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex'

// ** Images
import LoginDark from '/public/images/yugioh/marik-login-dark.png'
import LoginLight from '/public/images/yugioh/yugi-login-light.png'

type TProps = {}
type TDefaultValue = {
  email: string
  password: string
}
const LoginPage: NextPage<TProps> = () => {
  //State
  const [showPassword, setShowPassword] = useState(false)
  const [isRemember, setIsRemember] = useState(true)

  // ** theme
  const theme = useTheme()

  const schema = yup.object().shape({
    email: yup.string().required('The field is required').matches(EMAIL_REG, 'The field is must email type'),
    password: yup
      .string()
      .required('The field is required')
      .matches(PASSWORD_REG, 'The password is contain character, special character, number')
  })
  const defaultValues: TDefaultValue = {
    email: '',
    password: ''
  }
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  //console.log('error login', { errors })
  const onSubmit = (data: { email: string; password: string }) => {
    console.log('data login', { data })
  }

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Box
        display={{
          sm: 'flex',
          xs: 'none'
        }}
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.palette.customColors.bodyBg,
          height: '100%',
          maxWidth: '50vw',
          overflow: 'hidden'
        }}
      >
        <Image
          src={theme.palette.mode === 'light' ? LoginLight : LoginDark}
          alt='login image'
          priority // Nếu đây là hình ảnh quan trọng, có thể thêm thuộc tính này để tải trước
          style={{
            height: '100%',
            width: 'auto'
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
            <Box sx={{ mt: 2, width: '300px' }}>
              <Controller
                control={control}
                rules={{
                  required: true
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    required
                    fullWidth
                    label='Email'
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder='dtquoc@gmail.com'
                    error={Boolean(errors?.email)}
                    helperText={errors?.email?.message}
                  />
                )}
                name='email'
              />
            </Box>

            <Box sx={{ mt: 2, width: '300px' }}>
              <Controller
                control={control}
                rules={{
                  required: true
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    required
                    fullWidth
                    label='Password'
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder='Quoc12022002&'
                    error={Boolean(errors?.password)}
                    helperText={errors?.password?.message}
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton edge='end' onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? (
                              <Icon icon='material-symbols:visibility-outline' />
                            ) : (
                              <Icon icon='material-symbols:visibility-off-outline' />
                            )}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
                name='password'
              />
            </Box>

            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    name='rememberMe'
                    checked={isRemember}
                    color='primary'
                    onChange={e => setIsRemember(e.target.checked)}
                  />
                }
                label='Remember me'
              />
              <Link
                href='#'
                style={{
                  color: theme.palette.primary.main
                }}
              >
                Forgot password?
              </Link>
            </Box>

            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
              <Typography>{"Don't have an account?"}</Typography>

              <Link
                href='/register'
                style={{
                  color: theme.palette.primary.main
                }}
              >
                {'Register'}
              </Link>
            </Box>
            <Typography sx={{ textAlign: 'center', mt: 2, mb: 2 }}>Or</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
              <Icon icon='devicon:google' />
              <Icon icon='logos:facebook' />
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  )
}

export default LoginPage

// https://github.com/mui/material-ui/blob/v5.17.1/docs/data/material/getting-started/templates/sign-in/SignIn.tsx
