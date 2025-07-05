import React ,{useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { loginSuccess } from '../login/loginSlice';
import { fetchNewAccessJWT } from '../../api/userApi';
 // Replace with real auth logic

const PrivateRoute = ({ children, ...rest}) => {
  const dispatch=useDispatch()
  const{ isAuth }=useSelector(state=>state.login)

  useEffect(()=>{
    const updateAccessJWT = async () => {
			const result = await fetchNewAccessJWT();
			result && dispatch(loginSuccess());
		};

 !sessionStorage.getItem('accessJWT') && localStorage.getItem('crmSite')&& updateAccessJWT();
  !isAuth&& sessionStorage.getItem("accessJWT") && dispatch(loginSuccess())
  },[dispatch,isAuth])
  return isAuth ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
