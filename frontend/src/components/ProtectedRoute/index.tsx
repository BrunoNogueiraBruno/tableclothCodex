import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { data: isAuthenticated, isLoading, error } = useAuth();

  if (isLoading) return <p>Carregando...</p>;

  if (error || !isAuthenticated) {
    // Se não está autenticado, redireciona para login
    return <Navigate to="/login" replace />;
  }

  // Se autenticado, renderiza o conteúdo protegido
  return <>{children}</>;
}
