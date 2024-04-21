import { useContext } from 'react';
import '../UnauthenticatedAccount.css';
import { FieldValues, useForm } from 'react-hook-form';
import { UserContext } from '../../../helpers/UserContextProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LoadingButton from '../../../layout/LoadingButton/LoadingButton';

function Login() {
	const { login } = useContext(UserContext);
	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm({ mode: 'onSubmit' });
	const navigate = useNavigate();
	const location = useLocation();

	async function submitLogin(data: FieldValues) {
		login(data)
			.then((res) => {
				if (res) navigate(location.state?.from || '/game');
			})
			.catch((err) => console.log(err.response));
	}

	return (
		<div className='login-container'>
			<h2 id='headline-label'>Login</h2>
			<div className='login-form'>
				<form onSubmit={handleSubmit(submitLogin)}>
					<div className='form-group'>
						<label htmlFor='username'>Nume utilizator:</label>
						<input
							placeholder='utilizator'
							type='text'
							id='username'
							autoFocus
							{...register('username', {
								required: 'Username is required',
							})}
						/>
						{errors.username && (
							<div className='validation-error'>
								<p role='alert'>{errors.username?.message?.toString()}</p>
							</div>
						)}
					</div>
					<div className='form-group'>
						<label htmlFor='password'>Parolă:</label>
						<input
							placeholder='parola'
							type='password'
							id='password'
							{...register('password', {
								required: 'Password is required',
							})}
						/>
						{errors.password && (
							<div className='validation-error'>
								<p role='alert'>{errors.password?.message?.toString()}</p>
							</div>
						)}
					</div>
					<LoadingButton text='Login' isLoading={isSubmitting} />
				</form>
				<div className='bottom-links'>
					<Link to='/register'> Creează cont </Link>
					<br></br>
					<Link to='/forgot-password'> Ai uitat parola? </Link>
				</div>
			</div>
		</div>
	);
}

export default Login;
