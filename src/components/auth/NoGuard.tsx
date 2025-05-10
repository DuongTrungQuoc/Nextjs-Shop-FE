// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react'

// ** hooks
import { useAuth } from 'src/hooks/useAuth'

interface NoGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const NoGuard = (props: NoGuardProps) => {
  const { children, fallback } = props

  // ** auth
  const auth = useAuth()

  if (auth.loading) {
    return fallback
  }

  return <>{children}</>
}

export default NoGuard
