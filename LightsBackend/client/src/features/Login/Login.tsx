import React, { useContext, useState } from 'react';
import agent from '../../api/agent';
import './Login.css'
import { FieldValues, useForm } from 'react-hook-form';
import { UserContext } from '../../helpers/UserContextProvider';

function Login() {
   const {register, handleSubmit, formState: {isSubmitting, errors, isValid}} = useForm({ mode: 'onBlur'});

  async function submitLogin(data: FieldValues) {
    console.log(data)
    await agent.Account.login(data);
  }

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit(submitLogin)}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            {...register('username', {
              required: 'Username is required'
            })}
          />
          {errors.username && <p role="alert">{errors.username?.message?.toString()}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            {...register('password',{
              required: 'Password is required'
            })}
          />
          {errors.password && <p role="alert">{errors.password?.message?.toString()}</p>}
        </div>
        <button type="submit" disabled={!isValid}>Login</button>
      </form>
    </div>
  );
}

export default Login;
