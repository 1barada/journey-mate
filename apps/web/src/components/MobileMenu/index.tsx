import { useSelector } from 'react-redux';

import { selectIsAuthenticated } from '../../store/auth/authSlice';

export const MobileMenu = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return <div>index</div>;
};
