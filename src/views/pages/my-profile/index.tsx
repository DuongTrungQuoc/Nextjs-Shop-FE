// ** Next
import { NextPage } from 'next'

// ** React
import { useEffect, useState } from 'react'

// ** MUI
import { Box, Button, IconButton, useTheme, Grid, Avatar, InputLabel, FormHelperText } from '@mui/material'

// ** components
import CustomTextField from 'src/components/text-field'
import IconifyIcon from 'src/components/Icon'
import WrapperFileUpload from 'src/components/wrapper-file-upload'
import FallbackSpinner from 'src/components/fall-back'

// ** react-hook-form
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// ** config
import { EMAIL_REG } from 'src/configs/regex'

// ** Translate
import { t } from 'i18next'
import { useTranslation } from 'react-i18next'

// ** Services
import { getAuthMe } from 'src/services/auth'

// ** utils
import { convertBase64, separationFullName, toFullName } from 'src/utils'

// ** redux
import { resetInitialState } from 'src/stores/apps/auth'
import { updateAuthMeAsync } from 'src/stores/apps/auth/actions'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'

// ** order
import toast from 'react-hot-toast'
import Spinner from 'src/components/spinner'
import CustomSelect from 'src/components/custom-select'

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
  const [loading, setLoading] = useState(false)
  const [avatar, setAvatar] = useState('')
  const [roleId, setRoleId] = useState('')

  // **Translate
  const { i18n } = useTranslation()

  // ** theme
  const theme = useTheme()

  // ** redux
  const dispatch: AppDispatch = useDispatch()
  const { isLoading, isErrorUpdateMe, isSuccessUpdateMe, messageUpdateMe } = useSelector(
    (state: RootState) => state.auth
  )

  const schema = yup.object().shape({
    email: yup.string().required('The field is required').matches(EMAIL_REG, 'The field is must email type'),
    fullName: yup.string().notRequired(),
    phoneNumber: yup.string().required('The field is required').min(9, 'The phone number has a minimum of 9 digits.'),
    role: yup.string().required('The field is required'),
    address: yup.string().notRequired(),
    city: yup.string().notRequired()
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

  const fetchGetAuthMe = async () => {
    setLoading(true)
    await getAuthMe()
      .then(async response => {
        setLoading(false)
        const data = response?.data
        console.log('response getAuthMe', { response })
        if (data) {
          setRoleId(data?.role?._id)
          setAvatar(data?.avatar)
          reset({
            email: data?.email,
            address: data?.address,
            city: data?.city,
            phoneNumber: data?.phoneNumber,
            role: data?.role?.name,
            fullName: toFullName(data?.lastName, data?.middleName, data?.firstName, i18n.language)
          })
        }
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchGetAuthMe()
  }, [i18n.language])

  useEffect(() => {
    if (messageUpdateMe) {
      if (isErrorUpdateMe) {
        toast.error(messageUpdateMe)
      } else if (isSuccessUpdateMe) {
        toast.success(messageUpdateMe)
        fetchGetAuthMe()
      }
      dispatch(resetInitialState())
    }
  }, [isErrorUpdateMe, isSuccessUpdateMe, messageUpdateMe])

  //console.log('error login', { errors })
  //console.log('user', { user })
  const onSubmit = (data: any) => {
    console.log('data được cập nhật', { data })
    const { firstName, middleName, lastName } = separationFullName(data.fullName, i18n.language)
    dispatch(
      updateAuthMeAsync({
        email: data.email,
        address: data.address,
        //city: data.city,
        phoneNumber: data.phoneNumber,
        role: roleId,
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        avatar: avatar
      })
    )
  }

  const handleUploadAvatar = async (file: File) => {
    const base64 = await convertBase64(file)
    setAvatar(base64 as string)

    //console.log('file', { file })
  }

  console.log('avatar', { avatar })

  return (
    <>
      {loading || (isLoading && <Spinner />)}
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
                    <Box sx={{ position: 'relative' }}>
                      {avatar && (
                        <IconButton
                          edge='start'
                          color='inherit'
                          aria-label='open drawer'
                          sx={{
                            position: 'absolute',
                            bottom: -4,
                            right: -6,
                            zIndex: 2,
                            color: theme.palette.error.main
                          }}
                          onClick={() => setAvatar('')}
                        >
                          <IconifyIcon icon='material-symbols-light:delete-outline' />
                        </IconButton>
                      )}

                      {avatar ? (
                        <Avatar src={avatar} sx={{ width: 100, height: 100 }}>
                          <IconifyIcon icon='ph:user-thin' fontSize={70} />
                        </Avatar>
                      ) : (
                        <Avatar sx={{ width: 100, height: 100 }}>
                          <IconifyIcon icon='ph:user-thin' fontSize={70} />
                        </Avatar>
                      )}
                    </Box>
                    <WrapperFileUpload
                      uploadFunc={handleUploadAvatar}
                      objectAcceptFile={{
                        'image/jpeg': ['.jpg', '.jpeg'],
                        'image/png': ['.png']
                      }}
                    >
                      <Button variant='outlined' sx={{ width: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconifyIcon icon='ph:camera-thin' />
                        {avatar ? t('change_avatar') : t('upload_avatar')}
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
                        disabled
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
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <InputLabel
                          sx={{
                            marginBottom: '2px',
                            fontSize: '13px',
                            color: errors?.role
                              ? theme.palette.error.main
                              : `rgba(${theme.palette.customColors.main},0.42)`
                          }}
                        >
                          {t('Role')}
                        </InputLabel>
                        <CustomSelect
                          fullWidth
                          onChange={onChange}
                          value={value}
                          options={[]}
                          error={Boolean(errors?.role)}
                          onBlur={onBlur}
                          placeholder={t('enter_your_role')}
                        />
                        {errors?.role?.message && (
                          <FormHelperText
                            sx={{
                              color: errors?.role
                                ? theme.palette.error.main
                                : `rgba(${theme.palette.customColors.main},0.42)`
                            }}
                            id='my-helper-text'
                          >
                            {errors?.role?.message}
                          </FormHelperText>
                        )}
                      </Box>
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
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CustomTextField
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
                    name='address'
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CustomTextField
                        fullWidth
                        label={t('Address')}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        placeholder={t('enter_your_address')}
                      />
                    )}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <Controller
                    control={control}
                    name='city'
                    render={({ field: { onChange, onBlur, value } }) => (
                      // <CustomTextField
                      //   fullWidth
                      //   label={t('City')}
                      //   onChange={onChange}
                      //   onBlur={onBlur}
                      //   value={value}
                      //   placeholder={t('enter_your_city')}
                      // />
                      <Box>
                        <InputLabel
                          sx={{
                            marginBottom: '2px',
                            fontSize: '13px',
                            color: errors?.role
                              ? theme.palette.error.main
                              : `rgba(${theme.palette.customColors.main},0.42)`
                          }}
                        >
                          {t('City')}
                        </InputLabel>
                        <CustomSelect
                          fullWidth
                          onChange={onChange}
                          value={value}
                          options={[]}
                          error={Boolean(errors?.role)}
                          onBlur={onBlur}
                          placeholder={t('enter_your_city')}
                        />
                        {errors?.role?.message && (
                          <FormHelperText
                            sx={{
                              color: errors?.role
                                ? theme.palette.error.main
                                : `rgba(${theme.palette.customColors.main},0.42)`
                            }}
                            id='my-helper-text'
                          >
                            {errors?.role?.message}
                          </FormHelperText>
                        )}
                      </Box>
                    )}
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
                        onChange={e => {
                          const numValue = e.target.value.replace(/\D/g, '')
                          onChange(numValue)
                        }}
                        inputProps={{
                          inputMode: 'numeric',
                          pattern: '[0-9]*',
                          minLength: 9,
                          maxLength: 11
                        }}
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
    </>
  )
}

export default MyProfilePage

// https://github.com/mui/material-ui/blob/v5.17.1/docs/data/material/getting-started/templates/sign-in/SignIn.tsx
