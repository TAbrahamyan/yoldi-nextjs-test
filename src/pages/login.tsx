import { useState, FormEvent } from 'react';
import useSWRMutation from 'swr/mutation';

import { PrimaryButton } from '@/components/Button';
import { TextField } from '@/components/Input';
import PageWrapper from '@/components/PageWrapper';
import { fetcherMutation } from '@/lib/fetcher';
import styles from '@/styles/Auth.module.css';

interface LoginRequestType {
  email: string;
  password: string;
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { trigger, isMutating, error } = useSWRMutation<LoginRequestType>(
    'https://frontend-test-api.yoldi.agency/api/auth/login',
    fetcherMutation,
  );

  const login = (event: FormEvent) => {
    event.preventDefault();
    trigger({
      method: 'POST',
      data: { email, password },
    });
  };

  const buttonDisabled = (): boolean => {
    return !Boolean((email.length && password.length) || isMutating);
  };

  return (
    <PageWrapper title={'Войти'} className={styles.pageWrapper}>
      <form className={styles.form} onSubmit={login}>
        <h1 className={styles.title}>Вход в Yoldi Agency</h1>
        <div className={styles.inputs}>
          <TextField
            placeholder={'E-mail'}
            value={email}
            setValue={setEmail}
            icon={'/svg/email.svg'}
          />
          <TextField
            type={'password'}
            placeholder={'Пароль'}
            value={password}
            setValue={setPassword}
            icon={'/svg/lock.svg'}
          />
        </div>
        {error?.message && (
          <p className={styles.errorMessage}>{error.message}</p>
        )}
        <PrimaryButton
          className={styles.button}
          text={'Войти'}
          disabled={buttonDisabled()}
        />
      </form>
    </PageWrapper>
  );
}
