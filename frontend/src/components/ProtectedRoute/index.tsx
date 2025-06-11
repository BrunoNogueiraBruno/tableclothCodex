import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'
import type { ReactNode } from 'react';
import { ProtectedContextProvider } from '../../context/ProtectedContext';
import Header from '../Header';
// import ActionButton from '../ActionButton';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  try {
    const auth = useAuth()
  const { isLoading, error } = auth
  if (isLoading) return "Loading..."

  if (error || typeof auth.data === "undefined") {
    throw(error)
  }

  return (
    <ProtectedContextProvider user={auth.data.user} >
      <div className="flex min-h-screen w-screen flex-col bg-gray-100 text-gray-900">
      <Header />
      {children}

      {/* <div className='fixed bottom-4 w-full flex justify-center'>
        <ActionButton 
          children={"+"}
          size='large'
        />
      </div> */}
      </div>
    </ProtectedContextProvider>
  )
  } catch (error) {
    console.error(error)
    return <Navigate to="/login" replace />
  }
}
