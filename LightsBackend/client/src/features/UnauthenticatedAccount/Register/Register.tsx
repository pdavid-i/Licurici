import '../UnauthenticatedAccount.css'
import { useForm } from 'react-hook-form';
import agent from '../../../api/agent';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import LoadingButton from '../../../layout/LoadingButton/LoadingButton';

function Register() {
    const navigate = useNavigate();

   const {register, handleSubmit, setError, formState: {isSubmitting, errors}} = useForm({ mode: 'onSubmit'});

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
    <div className="login-container">
    <h2 id="headline-label" className="long-ahh-word">Înregistrare</h2>
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
          <label htmlFor="username">Nume utilizator:</label>
          <input
            type="text"
            autoFocus
            id="username"
            {...register('username', {
              required: 'Nu uita de nume'
            })}
          />
          {errors.username && <div className="validation-error"><p role="alert" className="validation-error">{errors.username?.message?.toString()}</p></div>}
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
                message: 'Nu uita de email'
            }
            })}
          />
          {errors.email && <div className="validation-error"><p role="alert" className="validation-error">{errors.email?.message?.toString()}</p></div>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Parolă:</label>
          <input
            type="password"
            id="password"
            {...register('password',{
              required: 'Nu uita de parolă',
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
                message: 'Password does not meet complexity requirements'
            }
            })}
          />
          {errors.password && <div className="validation-error"><p role="alert" className="validation-error">{errors.password?.message?.toString()}</p></div>}
        </div>
        <LoadingButton text='Creează cont' isLoading={isSubmitting}/>
      </form>
      <div className='bottom-links'>
        <Link to='/login' className="bottom-links"> Ai deja cont? </Link>
      </div>
    </div>
    </div>
  );
}

export default Register;
