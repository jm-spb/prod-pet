import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff } from 'react-feather';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { Loader } from 'shared/ui/Loader/Loader';
import styles from './LoginForm.module.scss';

interface LoginFormProps {
  className?: string;
  isLoading?: boolean;
}

interface LoginFormInputs {
  username: string;
  password: string;
}

export const LoginForm: React.FC<LoginFormProps> = (props) => {
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

  // Reset form inputs if isSubmitSuccessful
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  // Get password value
  const password = useRef({});
  password.current = watch('password', '');

  const handleSubmitButton = ({ username, password }: LoginFormInputs) => {
    console.log(username, password);
  };

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
};
