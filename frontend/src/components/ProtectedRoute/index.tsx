import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'
import type { ReactNode } from 'react';
import { ProtectedContextProvider } from '../../context/ProtectedContext';
import Header from '../Header';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  try {
    const auth = useAuth()
  const { isLoading, error } = auth
  if (isLoading) return <p>Carregando...</p>

  if (error || typeof auth.data === "undefined") {
    throw(error)
  }

  console.log(auth.data)
  return (
    <ProtectedContextProvider user={auth.data.user} >
      <Header />
      {children}
    </ProtectedContextProvider>
  )
  } catch (error) {
    console.error(error)
    return <Navigate to="/login" replace />
  }
}
