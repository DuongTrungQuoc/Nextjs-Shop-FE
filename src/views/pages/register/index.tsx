// ** Next
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** React
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

// ** MUI
import { Box, CssBaseline, Typography, Button, InputAdornment, IconButton, useTheme } from '@mui/material'

// ** components
import CustomTextField from 'src/components/text-field'
import Icon from 'src/components/Icon'
import FallbackSpinner from 'src/components/fall-back'

// ** react-hook-form
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// ** config
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex'
import { ROUTE_CONFIG } from 'src/configs/route'

// ** Images
import RegisterDark from '/public/images/yugioh/chazz-register-dark.png'
import RegisterLight from '/public/images/yugioh/yugi-register-light.png'

// ** redux
import { useDispatch, useSelector } from 'react-redux'
import { registerAuthAsync } from 'src/stores/auth/actions'
import { AppDispatch, RootState } from 'src/stores'
import { resetInitialState } from 'src/stores/auth'

type TProps = {}
type TDefaultValue = {
  email: string
  password: string
  confirmPassword: string
}
const RegisterPage: NextPage<TProps> = () => {
  //State
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // ** tranlate
  const { t } = useTranslation()

  // ** router
  const router = useRouter()

  // ** redux
  const dispatch: AppDispatch = useDispatch()
  const { isLoading, isError, isSuccess, message } = useSelector((state: RootState) => state.auth)

  // ** theme
  const theme = useTheme()

  const schema = yup.object().shape({
    email: yup.string().required(t('Required_field')).matches(EMAIL_REG, t('Rules_email')),
    password: yup.string().required(t('Required_field')).matches(PASSWORD_REG, t('Rules_password')),
    confirmPassword: yup
      .string()
      .required(t('Required_field'))
      .matches(PASSWORD_REG, t('Rules_password'))
      .oneOf([yup.ref('password'), ''], t('Rules_confirm_password'))
  })

  const defaultValues: TDefaultValue = {
    email: '',
    password: '',
    confirmPassword: ''
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
    if (!Object.keys(errors)?.length) {
      dispatch(registerAuthAsync({ email: data.email, password: data.password }))
    }
  }

  useEffect(() => {
    if (message) {
      if (isError) {
        toast.error(message)
      } else if (isSuccess) {
        toast.success(message)
        router.push(ROUTE_CONFIG.LOGIN)
      }
      dispatch(resetInitialState())
    }
  }, [isError, isSuccess, message])

  return (
    <>
      {isLoading && <FallbackSpinner />}
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
            src={theme.palette.mode === 'light' ? RegisterLight : RegisterDark}
            alt='register image'
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
              {t('Register')}
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
                      label={t('Email')}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder={t('Enteremail')}
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
                      label={t('Password')}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder={t('Enterpassword')}
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
                      label={t('Confirm_password')}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder={t('Enterconfirm_password')}
                      error={Boolean(errors?.confirmPassword)}
                      helperText={errors?.confirmPassword?.message}
                      type={showConfirmPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton edge='end' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                              {showConfirmPassword ? (
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
                  name='confirmPassword'
                />
              </Box>

              <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                {t('Register')}
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <Typography>{t('Do_you_have_already_account?')}</Typography>

                <Link
                  href='/login'
                  style={{
                    color: theme.palette.primary.main
                  }}
                >
                  {t('Login')}
                </Link>
              </Box>
              <Typography sx={{ textAlign: 'center', mt: 2, mb: 2 }}>{t('Or')}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                <Icon icon='devicon:google' />
                <Icon icon='logos:facebook' />
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default RegisterPage

// https://github.com/mui/material-ui/blob/v5.17.1/docs/data/material/getting-started/templates/sign-in/SignIn.tsx
