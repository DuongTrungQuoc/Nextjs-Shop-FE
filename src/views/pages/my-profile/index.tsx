// ** Next
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

// ** React
import { useEffect, useState } from 'react'

// ** MUI
import {
  Box,
  CssBaseline,
  Typography,
  Button,
  InputAdornment,
  IconButton,
  useTheme,
  Grid,
  Card,
  Avatar
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
import RegisterDark from '/public/images/yugioh/chazz-register-dark.png'
import RegisterLight from '/public/images/yugioh/yugi-register-light.png'
import IconifyIcon from 'src/components/Icon'
import { t } from 'i18next'
import WrapperFileUpload from 'src/components/wrapper-file-upload'
import { useAuth } from 'src/hooks/useAuth'

type TProps = {}
type TDefaultValue = {
  email: string
  address: string
  city: string
  phoneNumber: string
  role: string
  fullName: string
}
const MyProfilePage: NextPage<TProps> = () => {
  //State
  const { user } = useAuth()

  // ** theme
  const theme = useTheme()

  const schema = yup.object().shape({
    email: yup.string().required('The field is required').matches(EMAIL_REG, 'The field is must email type'),
    fullName: yup.string().required('The field is required'),
    address: yup.string().required('The field is required'),
    city: yup.string().required('The field is required'),
    phoneNumber: yup.string().required('The field is required'),
    role: yup.string().required('The field is required')
  })

  const defaultValues: TDefaultValue = {
    email: '',
    address: '',
    city: '',
    phoneNumber: '',
    role: '',
    fullName: ''
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (user) {
      reset({
        email: '',
        address: '',
        city: '',
        phoneNumber: '',
        role: user?.role?.name,
        fullName: ''
      })
    }
  }, [user])

  //console.log('error login', { errors })
  console.log('user', { user })
  const onSubmit = (data: any) => {
    console.log('data register', { data })
  }

  const handleUploadAvatar = (file: File) => {
    console.log('file', { file })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
      <Grid container>
        {/* -----Grid container bên trái----------  */}
        <Grid
          container
          item
          md={6}
          xs={12}
          sx={{ backgroundColor: theme.palette.background.paper, borderRadius: '15px', py: 5, px: 4 }}
        >
          <Box sx={{ width: '100%', height: '100%' }}>
            <Grid container spacing={4}>
              <Grid item md={12} xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%'
                  }}
                >
                  <Avatar sx={{ width: 100, height: 100 }}>
                    {/* {user?.avatar ? (
                <Image
                  src={user?.avatar || ''}
                  alt='avatar'
                  style={{
                    height: 'auto',
                    width: 'auto'
                  }}
                />
              ) : ( */}
                    <IconifyIcon icon='ph:user-thin' fontSize={70} />
                    {/* )} */}
                  </Avatar>
                  <WrapperFileUpload
                    uploadFunc={handleUploadAvatar}
                    objectAcceptFile={{
                      'image/jpeg': ['.jpg', '.jpeg'],
                      'image/png': ['.png']
                    }}
                  >
                    <Button variant='outlined' sx={{ width: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconifyIcon icon='ph:camera-thin' />
                      {t('upload_avatar')}
                    </Button>
                  </WrapperFileUpload>
                </Box>
              </Grid>
              <Grid item md={6} xs={12}>
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
                      placeholder={t('enter_your_email')}
                      error={Boolean(errors?.email)}
                      helperText={errors?.email?.message}
                    />
                  )}
                  name='email'
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      required
                      fullWidth
                      disabled
                      label={t('Role')}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder={t('enter_your_role')}
                      error={Boolean(errors?.role)}
                      helperText={errors?.role?.message}
                    />
                  )}
                  name='role'
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* -----Grid container bên phải----------  */}
        <Grid container item md={6} xs={12} marginTop={{ md: 0, xs: 5 }}>
          <Box
            sx={{
              height: '100%',
              width: '100%',
              backgroundColor: theme.palette.background.paper,
              borderRadius: '15px',
              py: 5,
              px: 4
            }}
            marginLeft={{ md: 5, xs: 0 }}
          >
            <Grid container spacing={4}>
              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      required
                      fullWidth
                      label={t('Full_name')}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder={t('enter_your_full_name')}
                      error={Boolean(errors?.fullName)}
                      helperText={errors?.fullName?.message}
                    />
                  )}
                  name='fullName'
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      required
                      fullWidth
                      label={t('Address')}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder={t('enter_your_address')}
                      error={Boolean(errors?.address)}
                      helperText={errors?.address?.message}
                    />
                  )}
                  name='address'
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      required
                      fullWidth
                      label={t('City')}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder={t('enter_your_city')}
                      error={Boolean(errors?.city)}
                      helperText={errors?.city?.message}
                    />
                  )}
                  name='city'
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      required
                      fullWidth
                      label={t('Phone_number')}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder={t('enter_your_phone_number')}
                      error={Boolean(errors?.phoneNumber)}
                      helperText={errors?.phoneNumber?.message}
                    />
                  )}
                  name='phoneNumber'
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', height: '100%' }}>
        <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
          {t('Update')}
        </Button>
      </Box>
    </form>
  )
}

export default MyProfilePage

// https://github.com/mui/material-ui/blob/v5.17.1/docs/data/material/getting-started/templates/sign-in/SignIn.tsx
