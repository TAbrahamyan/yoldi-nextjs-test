import { useState, FormEvent } from 'react';
import useSWRMutation from 'swr/mutation';

import { PrimaryButton } from '@/components/Button';
import { TextField } from '@/components/Input';
import PageWrapper from '@/components/PageWrapper';
import { fetcherMutation } from '@/lib/fetcher';
import styles from '@/styles/Auth.module.css';

interface SignupRequestType {
  name: string;
  email: string;
  password: string;
}

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { trigger, isMutating, error } = useSWRMutation<SignupRequestType>(
    'https://frontend-test-api.yoldi.agency/api/auth/sign-up',
    fetcherMutation,
  );

  const signup = (event: FormEvent) => {
    event.preventDefault();
    trigger({
      method: 'POST',
      data: { name, email, password },
    });
  };

  const buttonDisabled = (): boolean => {
    return !Boolean(
      (name.length && email.length && password.length) || isMutating,
    );
  };

  return (
    <PageWrapper title={'Создать аккаунт'} className={styles.pageWrapper}>
      <form className={styles.form} onSubmit={signup}>
        <h1 className={styles.title}>
          Регистрация <br /> в Yoldi Agency
        </h1>
        <div className={styles.inputs}>
          <TextField
            placeholder={'Имя'}
            value={name}
            setValue={setName}
            icon={'/svg/user.svg'}
          />
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
          text={'Создать аккаунт'}
          disabled={buttonDisabled()}
        />
      </form>
    </PageWrapper>
  );
}
