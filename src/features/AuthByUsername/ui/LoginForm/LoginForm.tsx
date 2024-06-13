import { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Eye, EyeOff } from 'react-feather';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { Loader } from 'shared/ui/Loader/Loader';
import { Text, TextVariant } from 'shared/ui/Text/Text';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import { loginActions } from '../../model/slice/loginSlice';
import styles from './LoginForm.module.scss';

interface LoginFormProps {
  className?: string;
  onClose?: () => void;
}

interface LoginFormInputs {
  username: string;
  password: string;
}

export const LoginForm: React.FC<LoginFormProps> = memo((props) => {
  const { className } = props;
  const {
    register,
    formState: { errors, isValid, isSubmitSuccessful },
    handleSubmit,
    reset,
  } = useForm<LoginFormInputs>({
    mode: 'onBlur',
  });
  const { t } = useTranslation('translation');
  const dispatch = useDispatch();
  const { username, password, error, isLoading } = useSelector(getLoginState);

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

  // TODO: refactor to remove rerender on every input change
  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(loginActions.setUsername(e.target.value));

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(loginActions.setPassword(e.target.value));
  };

  const handleSubmitButton = () => {
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
            onChange={handleChangeUsername}
            value={username}
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
              onChange={handleChangePassword}
              value={password}
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
