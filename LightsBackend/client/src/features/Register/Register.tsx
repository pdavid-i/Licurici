import React, { useContext, useState } from 'react';
import './Register.css'
import { FieldValues, useForm } from 'react-hook-form';
import { UserContext } from '../../helpers/UserContextProvider';
import agent from '../../api/agent';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();

   const {register, handleSubmit, setError, formState: {isSubmitting, errors, isValid}} = useForm({ mode: 'onBlur'});

   function handleApiErrors(errors: any) {
    console.log(errors);
    if (errors) {
        errors.forEach((error: string) => {
            if (error.includes('Password')) {
                setError('password', { message: error })
            } else if (error.includes('Email')) {
                setError('email', { message: error })
            } else if (error.includes('Username')) {
                setError('username', { message: error })
            }
        });
    }
}

   
  return (
    <>
    <h1>Register</h1>
    <div className="login-form">
      <form onSubmit={handleSubmit(async data => {

        agent.Account.register(data)
        .then(() => {
            toast.success('Registration successful - you can now login');
            navigate('/login');
        })
        .catch(error => handleApiErrors(error))

        } )}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            autoFocus
            id="username"
            {...register('username', {
              required: 'Username is required'
            })}
          />
          {errors.username && <p role="alert">{errors.username?.message?.toString()}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
                message: 'Not a valid email address'
            }
            })}
          />
          {errors.email && <p role="alert">{errors.email?.message?.toString()}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            {...register('password',{
              required: 'Password is required',
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
                message: 'Password does not meet complexity requirements'
            }
            })}
          />
          {errors.password && <p role="alert">{errors.password?.message?.toString()}</p>}
        </div>
        <button type="submit" disabled={!isValid}>Register</button>
      </form>
    </div>
    </>
  );
}

export default Register;
