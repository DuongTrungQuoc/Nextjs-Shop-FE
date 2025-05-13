// ** Import Next
import { NextPage } from 'next'
import { ReactNode } from 'react'

// ** view
import LayoutNotApp from 'src/views/layouts/LayoutNotApp'
import ChangePasswordPage from 'src/views/pages/change-password'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return <ChangePasswordPage />
}

export default Index

Index.getLayout = (pages: ReactNode) => <LayoutNotApp>{pages}</LayoutNotApp>
