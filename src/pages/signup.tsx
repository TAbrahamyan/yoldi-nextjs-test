import React from 'react';
import useSWRMutation from 'swr/mutation';
import { useRouter } from 'next/router';

import { PrimaryButton } from '@/components/Button';
import { TextField } from '@/components/Input';
import PageWrapper from '@/components/PageWrapper';
import { fetcherMutation, ApiResponse } from '@/common/lib/fetcher';
import { ENDPOINTS } from '@/common/api/endpoints';
import { ApiKeyDto } from '@/common/api/types';
import { setToken } from '@/common/auth';
import styles from '@/styles/Auth.module.css';

export default function Signup() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const router = useRouter();

  const {
    trigger: signup,
    isMutating,
    error,
  } = useSWRMutation<ApiResponse<ApiKeyDto>>(
    ENDPOINTS.AUTH.SIGNUP,
    fetcherMutation,
  );

  const onSignup = async (event: React.FormEvent) => {
    event.preventDefault();

    const response: ApiResponse<ApiKeyDto> | undefined = await signup({
      method: 'POST',
      data: { name, email, password },
    });

    if (response && response.data) {
      setToken(response.data.value);
      router.push('/');
    }
  };

  const buttonDisabled = (): boolean => {
    return !Boolean(
      (name.length && email.length && password.length) || isMutating,
    );
  };

  return (
    <PageWrapper title={'Создать аккаунт'} className={styles.pageWrapper}>
      <form className={styles.form} onSubmit={onSignup}>
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
