import '../UnauthenticatedAccount.css'
import { useForm } from 'react-hook-form';
import agent from '../../../api/agent';
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LoadingButton from '../../../layout/LoadingButton/LoadingButton';


function ResetPassword() {
    const navigate = useNavigate();
    const { token } = useParams();

   const {register, handleSubmit, setError, getValues, formState: {isSubmitting, errors}} = useForm({ mode: 'onSubmit'});
   
   function checkPasswords() {
        const {password, password2} = getValues();
        if (password !== password2)
        {
            setError('password2', { message: 'Parolele trebuie sa fie identice' })
            return false;
        }
        return true;
    }

  return (
    <div className="login-container">
    <h2 id="headline-phrase">Resetează parola</h2>
    <div className="login-form">
      <form onSubmit={handleSubmit(async data => {
        if (!checkPasswords()) return;
        agent.Account.resetPassword({...data, token})
        .then(() => {
            toast.success('Parola schimbata cu succes');
            navigate('/login');
        })
        .catch(error => console.log(error))

        } )}>

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

        <div className="form-group">
          <label htmlFor="password2">Confirmare parolă:</label>
          <input
            type="password"
            id="password2"
            {...register('password2',{
              required: 'Nu uita de parolă',
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
                message: 'Password does not meet complexity requirements'
            }
            })}
          />
          {errors.password2 && <div className="validation-error"><p role="alert" className="validation-error">{errors.password2?.message?.toString()}</p></div>}
        </div>

        <LoadingButton text='Schimbă parola' isLoading={isSubmitting}/>
      </form>
      <div className='bottom-links'>
        <Link to='/login' className="bottom-links"> Ai deja cont? </Link>
      </div>
    </div>
    </div>
  );
}

export default ResetPassword;
