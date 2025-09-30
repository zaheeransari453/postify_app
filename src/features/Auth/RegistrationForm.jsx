import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registrationFormValidation } from '../../utils/validation';
import { addUserThunk } from '../../store/thunks/usersThunks';

import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';

// import styles from "./RegistrationForm.module.css";

const RegistrationForm = () => {
  const { users } = useSelector((store) => store.users);
  // const { message } = useSelector((store) => store.notification);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useRef();
  const password = useRef();
  const name = useRef();
  const username = useRef();
  const [error, setError] = useState({
    emailError: '',
    nameError: '',
    usernameError: '',
    passwordError: '',
  });

  const handleOnAddButtonClick = (event) => {
    event.preventDefault();

    const newError = registrationFormValidation(
      email.current.value,
      name.current.value,
      username.current.value,
      password.current.value
    );
    setError(newError);

    if (
      !newError.emailError &&
      !newError.nameError &&
      !newError.usernameError &&
      !newError.passwordError
    ) {
      setError({
        emailError: '',
        nameError: '',
        usernameError: '',
        passwordError: '',
      });

      dispatch(
        addUserThunk({
          newEmail: email.current.value,
          newName: name.current.value,
          newUserName: username.current.value,
          newPassword: password.current.value,
        })
      );

      navigate('/login');
      email.current.value = '';
      password.current.value = '';
      name.current.value = '';
      username.current.value = '';
    }
  };

  // Handle input change
  const onEmailChange = (event) => {
    setError({ ...error, emailError: '' });
  };
  const onPasswordChange = (event) => {
    setError({ ...error, passwordError: '' });
  };
  const onNameChange = (event) => {
    setError({ ...error, nameError: '' });
  };
  const onUsernameChange = (event) => {
    setError({ ...error, usernameError: '' });
  };
  // Show Password Icon Handling
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <form onSubmit={handleOnAddButtonClick}>
      <div className='row gap-4'>
        <div className='col-md-12'>
          <input
            type='email'
            className=' w-100'
            placeholder='Enter your email'
            ref={email}
            onChange={onEmailChange}
          />
          {error.emailError && <small>{error.emailError}</small>}
        </div>
        <div className='col-md-12'>
          <input
            type='text'
            className='w-100'
            placeholder='Enter your Name'
            ref={name}
            onChange={onNameChange}
          />
          {error.nameError && <small>{error.nameError}</small>}
        </div>
        <div className='col-md-12'>
          <input
            type='text'
            className='w-100'
            placeholder='Enter your UserName'
            ref={username}
            onChange={onUsernameChange}
          />
          {error.usernameError && <small>{error.usernameError}</small>}
        </div>
        <div className='col-md-12 '>
          <div
            className='w-100'
            style={{ position: 'relative', display: 'inline-block' }}
          >
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Enter your password'
              className='w-100 '
              ref={password}
              onChange={onPasswordChange}
              style={{
                paddingRight: '2rem',
                width: '100%',
                boxSizing: 'border-box',
              }}
            />
            <span
              onClick={togglePasswordVisibility}
              className='fs-5'
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-60%)',
                cursor: 'pointer',
              }}
            >
              {showPassword ? (
                <IoEyeOutline className='text-light' />
              ) : (
                <IoEyeOffOutline className='text-light' />
              )}
            </span>
          </div>
          {error.passwordError && (
            <small className=''>{error.passwordError}</small>
          )}
        </div>

        <div className='col align-self-start'>
          <button
            type='submit'
            className='   Btn text-white'
            // style={{ background: "#040321" }}
          >
            Register
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegistrationForm;
