// ** Import Next
import { NextPage } from 'next'
import { ReactNode } from 'react'

// ** view
import BlankLayout from 'src/views/layouts/BlankLayout'
import RegisterPage from 'src/views/pages/register'

type TProps = {}

const Register: NextPage<TProps> = () => {
  return <RegisterPage />
}

export default Register

Register.getLayout = (pages: ReactNode) => <BlankLayout>{pages}</BlankLayout>
