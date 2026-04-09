import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess } from '../login/loginSlice';
import { fetchNewAccessJWT } from '../../api/userApi';
import { getUserProfile } from "../../page/dashboard/userAction"

/**
 * PrivateRoute Component
 * Protects routes and enforces authentication and role-based access
 */
const PrivateRoute = ({ children, requiredRoles = null, ...rest }) => {
  const dispatch = useDispatch()
  const { isAuth } = useSelector(state => state.login)
  const { user } = useSelector(state => state.user)

  useEffect(() => {
    const updateAccessJWT = async () => {
      try {
        const result = await fetchNewAccessJWT();
        result && dispatch(loginSuccess());
      } catch (error) {
        console.error('Token refresh failed:', error);
      }
    };
    
    if (!user._id) {
      dispatch(getUserProfile());
    }
    
    if (!sessionStorage.getItem('accessJWT') && localStorage.getItem('crmSite')) {
      updateAccessJWT();
    }
    
    if (!isAuth && sessionStorage.getItem("accessJWT")) {
      dispatch(loginSuccess());
    }
  }, [dispatch, isAuth, user._id])

  // Check authentication
  if (!isAuth) {
    return <Navigate to="/" replace />;
  }

  // Check role-based access
  if (requiredRoles && user?.role) {
    const hasRequiredRole = Array.isArray(requiredRoles) 
      ? requiredRoles.includes(user.role)
      : user.role === requiredRoles;

    if (!hasRequiredRole) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
};

export default PrivateRoute;
