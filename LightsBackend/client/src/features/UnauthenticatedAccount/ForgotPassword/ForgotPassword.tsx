import '../UnauthenticatedAccount.css'
import { useForm } from 'react-hook-form';
import agent from '../../../api/agent';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import LoadingButton from '../../../layout/LoadingButton/LoadingButton';

function ForgotPassword() {
    const navigate = useNavigate();

   const {register, handleSubmit, formState: {isSubmitting, errors}} = useForm({ mode: 'onSubmit'});
   
  return (
    <div className="login-container">
    <h2 id="headline-phrase" className="long-ahh-word">Ai uitat parola?</h2>
    <div className="login-form">
      <form onSubmit={handleSubmit(async data => {
        agent.Account.forgotPassword(data)
        .then(() => {
            toast.success('Un email cu instructiuni a fost trimis');
        })
        .catch(error => console.log(error))

        } )}>

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

        <LoadingButton text='Trimite email' isLoading={isSubmitting}/>
      </form>
      <div className='bottom-links'>
        <Link to='/login' className="bottom-links"> Ai deja cont? </Link>
      </div>
    </div>
    </div>
  );
}

export default ForgotPassword;
