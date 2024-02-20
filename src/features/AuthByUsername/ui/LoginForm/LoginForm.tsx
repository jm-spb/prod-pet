import { memo, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Eye, EyeOff } from 'react-feather';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { Loader } from 'shared/ui/Loader/Loader';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import { loginActions } from '../../model/slice/loginSlice';
import styles from './LoginForm.module.scss';

interface LoginFormProps {
  className?: string;
  isLoading?: boolean;
}

interface LoginFormInputs {
  username: string;
  password: string;
}

export const LoginForm: React.FC<LoginFormProps> = memo((props) => {
  const { className, isLoading } = props;
  const {
    register,
    watch,
    formState: { errors, isValid, isSubmitSuccessful },
    handleSubmit,
    reset,
  } = useForm<LoginFormInputs>({
    mode: 'onBlur',
  });
  const { t } = useTranslation('translation');

  const dispatch = useDispatch();
  const { username, password } = useSelector(getLoginState);

  const handleChangeUsername = useCallback(
    (value: string) => {
      dispatch(loginActions.setUsername(value));
    },
    [dispatch]
  );

  const handleChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value));
    },
    [dispatch]
  );

  const handleSubmitButton = useCallback(() => {
    dispatch(loginByUsername({ username, password }));
  }, [dispatch, username, password]);

  // Reset form inputs if isSubmitSuccessful
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ username: '', password: '' });
    }
  }, [isSubmitSuccessful, reset]);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  // Get password value
  // const password = useRef({});
  // password.current = watch('password', '');

  return (
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
          onChange={(e) => handleChangeUsername(e.target.value)}
          // value={username}
        />
        {errors?.username && <span className={styles.error}>{errors?.username.message}</span>}
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
            onChange={(e) => handleChangePassword(e.target.value)}
            // value={password}
          />
          <span className={styles.togglePassword} onClick={togglePasswordVisibility}>
            {isPasswordVisible ? <EyeOff /> : <Eye />}
          </span>
        </div>
        {errors?.password && <span className={styles.error}>{errors?.password.message}</span>}
      </label>

      <Button className={styles.submit} type="submit" disabled={!isValid || isLoading}>
        <div className={styles.submitWrapper}>
          <span>{t('login')}</span>
          {isLoading ? <Loader size="30" inButton /> : null}
        </div>
      </Button>
    </form>
  );
});
