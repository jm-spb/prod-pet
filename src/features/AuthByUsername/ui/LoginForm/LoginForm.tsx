import { memo, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Eye, EyeOff } from 'react-feather';
import { ReducersList } from 'app/providers/StoreProvider';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { Loader } from 'shared/ui/Loader/Loader';
import { Text, TextVariant } from 'shared/ui/Text/Text';
import { useDynamicModuleLoader } from 'shared/hooks/useDynamicReducerLoader/useDynamicReducerLoader';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { loginReducer } from '../../model/slice/loginSlice';
import styles from './LoginForm.module.scss';

interface LoginFormProps {
  className?: string;
}

interface LoginFormInputs {
  username: string;
  password: string;
}

const initialReducers: ReducersList = {
  loginForm: loginReducer,
};

const LoginForm: React.FC<LoginFormProps> = memo((props) => {
  const { className } = props;
  const { t } = useTranslation('translation');
  const {
    register,
    formState: { errors, isValid, isSubmitSuccessful },
    handleSubmit,
    reset,
  } = useForm<LoginFormInputs>({
    mode: 'onBlur',
  });

  // Handle async reducers: add loginForm data in store on mount, remove on unmount
  useDynamicModuleLoader(initialReducers);

  const dispatch = useDispatch();
  const isLoading = useSelector(getLoginIsLoading);
  const error = useSelector(getLoginError);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ username: '', password: '' });
    }
  }, [isSubmitSuccessful, reset]);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleSubmitButton: SubmitHandler<LoginFormInputs> = ({ username, password }) => {
    dispatch(loginByUsername({ username, password }));
  };

  return (
    <div className={styles.wrapper}>
      <Text variant={TextVariant.PRIMARY} title={t('auth')} />
      {error && <Text className={styles.submitError} variant={TextVariant.ERROR} text={t('login_error')} />}

      <form className={classNames(styles.loginForm, {}, [className])} onSubmit={handleSubmit(handleSubmitButton)}>
        <label className={styles.label} htmlFor="username">
          {t('username')}
          <input
            {...register('username', {
              required: t('username_error'),
            })}
            className={styles.input}
            id="username"
            type="text"
            placeholder={t('username_enter')}
          />
          {errors?.username && <span className={styles.inputError}>{errors?.username.message}</span>}
        </label>

        <label className={styles.label} htmlFor="password">
          {t('password')}
          <div className={styles.group}>
            <input
              {...register('password', {
                required: t('password_error'),
              })}
              className={styles.input}
              id="password"
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder={t('password_enter')}
            />
            <span className={styles.togglePassword} onClick={togglePasswordVisibility}>
              {isPasswordVisible ? <EyeOff /> : <Eye />}
            </span>
          </div>
          {errors?.password && <span className={styles.inputError}>{errors?.password.message}</span>}
        </label>

        <Button className={styles.submit} type="submit" disabled={!isValid || isLoading}>
          <div className={styles.submitWrapper}>
            <span>{t('login')}</span>
            {isLoading ? <Loader size="30" inButton /> : null}
          </div>
        </Button>
      </form>
    </div>
  );
});

// show component name in stack trace
LoginForm.displayName = 'LoginForm';

export default LoginForm;
