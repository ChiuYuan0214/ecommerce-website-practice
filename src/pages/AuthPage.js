
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import AuthForm from '../components/AuthPage/AuthForm/AuthForm';

const AuthPage = () => {
    const isAuth = useSelector(state => state.auth.isAuth);

    return (
        <>
        {isAuth && <Navigate to="/center" />}
        {!isAuth && <AuthForm />}
        </>
    );
};

export default AuthPage;