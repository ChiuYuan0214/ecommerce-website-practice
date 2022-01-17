import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import AuthForm from '../components/AuthPage/AuthForm/AuthForm';

const AuthPage = () => {
    const isAuth = useSelector(state => state.auth.isAuth);

    const [isLogin, setIsLogin] = useState(true);

    const toggleLoginHandler = () => {
        setIsLogin(prev => !prev);
    };

    return (
        <>
        {isAuth && <Navigate to="/center" />}
        {!isAuth && <AuthForm isLogin={isLogin} toggleLogin={toggleLoginHandler} />}
        </>
    );
};

export default AuthPage;