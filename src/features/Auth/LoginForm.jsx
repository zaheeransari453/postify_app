import { loginFormValidation } from '../../utils/validation';
import { useEffect, useRef, useState } from 'react';
import CryptoJS from 'crypto-js';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { IoMdLogIn } from 'react-icons/io';

import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import styles from './LoginForm.module.css';
import ForgetPasswordPopup from '../../components/dialoges/ForgetPasswordPopup';
import { loginUserThunk } from '../../store/thunks/usersThunks';
import store from '../../store/store';
import NewPasswordDialog from '../../components/dialoges/NewPasswordDialog';

const LoginForm = () => {
  const loginPassword = useRef();
  const loginEmail = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState({ emailError: '', passError: '' });

  // Handle input change
  const onEmailChange = (event) => {
    setError({ ...error, emailError: '' });
  };
  const onPasswordChange = (event) => {
    setError({ ...error, passError: '' });
  };

  // handle on Login button
  const handleLogin = (event) => {
    event.preventDefault();

    const newError = loginFormValidation(
      loginEmail.current.value,
      loginPassword.current.value
    );

    if (!newError.emailError && !newError.passError) {
      const email = loginEmail.current.value;
      const password = loginPassword.current.value;

      dispatch(loginUserThunk({ email, password }));

      const users = store.getState().users;

      if (users.currentUser && users.role === 'user') {
        navigate('/user-dashboard');
      } else if (users.role === 'admin') {
        navigate('/admin-dashboard');
      }
      // else {
      //   dispatch(
      //     notificationSliceAction.showNotification({
      //       message: "User Don't Registered!",
      //     })
      //   );
      // }
    }
    setError(newError);
    loginEmail.current.value = '';
    loginPassword.current.value = '';
  };

  // Show hide Password
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { otpVerified } = useSelector((store) => store.users);

  // console.log(users.otpVerified);
  //   const dispatch = useDispatch();

  const [showOtpPopup, setShowOtpPopup] = useState(false);
  //   const navigate = useNavigate();

  const [showForgetPasswordDialog, setShowForgetPasswordDialog] =
    useState(false);
  useEffect(() => {
    if (otpVerified) {
      setShowForgetPasswordDialog(false);
    }
  }, [otpVerified]);

  return (
    <>
      {showForgetPasswordDialog && (
        <ForgetPasswordPopup
          setShowForgetPasswordDialog={setShowForgetPasswordDialog}
        ></ForgetPasswordPopup>
      )}
      {otpVerified && <NewPasswordDialog />}
      <form className='w-100 my-5' onSubmit={handleLogin}>
        {/* <!-- Email input --> */}
        <div data-mdb-input-init className='form-outline w-100 mb-4'>
          <input
            type='email'
            id='form2Example1'
            className='w-100'
            placeholder='Email'
            ref={loginEmail}
            onChange={onEmailChange}
          />
          {error.emailError && (
            <small className='text-light text-start'>{error.emailError}</small>
          )}
        </div>

        {/* <!-- Password input --> */}
        <div
          data-mdb-input-init
          className='form-outline mb-4 w-100'
          style={{ position: 'relative', display: 'inline-block' }}
        >
          <input
            id='form2Example2'
            className='w-100'
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            ref={loginPassword}
            onChange={onPasswordChange}
            style={{
              paddingRight: '2rem',
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
          <span
            onClick={togglePasswordVisibility}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-60%)',
              cursor: 'pointer',
            }}
          >
            {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
          </span>
          {error.passError && (
            <small className='text-light text-start'>{error.passError}</small>
          )}
        </div>

        <div className='row mb-4'>
          <div className='col'>
            <p
              href='#'
              className={`text-decoration-underline ${styles.forgetPasswordLink} d-inline-block`}
              onClick={() => {
                setShowForgetPasswordDialog(true);
              }}
            >
              Forgot password?
            </p>
          </div>
        </div>

        <button
          type='submit'
          data-mdb-button-init
          data-mdb-ripple-init
          className='Btn text-white btn-block mb-4'
        >
          Sign in
        </button>

        <div className='text-center text-light'>
          <p>
            Not a member?{' '}
            <Link to='/registration' className={`${styles.registerLink}`}>
              Register
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
