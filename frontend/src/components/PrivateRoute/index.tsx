import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

type Props = {
  children: JSX.Element;
  adminOnly?: boolean;
  blockAdmin?: boolean;
};

function PrivateRoute({ children, adminOnly = false, blockAdmin = false }: Props) {
  const { authenticated, isAdmin } = useAuth();
  const location = useLocation();

  if (!authenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (blockAdmin && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}

export default PrivateRoute;