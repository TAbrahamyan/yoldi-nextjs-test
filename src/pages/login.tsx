import React from 'react';
import useSWRMutation from 'swr/mutation';
import { useRouter } from 'next/router';

import TextField from '@/components/TextField';
import PageWrapper from '@/components/PageWrapper';
import { PrimaryButton } from '@/components/Button';
import { fetcherMutation, ApiResponse } from '@/common/lib/fetcher';
import { setToken } from '@/common/lib/auth';
import { ENDPOINTS } from '@/common/api/endpoints';
import { ApiKeyDto } from '@/common/api/types';
import styles from '@/styles/Auth.module.css';

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const router = useRouter();

  const {
    trigger: login,
    isMutating,
    error,
  } = useSWRMutation<ApiResponse<ApiKeyDto>>(
    ENDPOINTS.AUTH.LOGIN,
    fetcherMutation,
  );

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response: ApiResponse<ApiKeyDto> | undefined = await login({
      method: 'POST',
      data: { email, password },
    });

    if (response && response.data) {
      setToken(response.data.value);
      router.push('/');
    }
  };

  const buttonDisabled = !Boolean(
    (email.length && password.length) || isMutating,
  );

  return (
    <PageWrapper title={'Войти'} className={styles.pageWrapper}>
      <form className={styles.form} onSubmit={onSubmit}>
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
          disabled={buttonDisabled}
        />
      </form>
    </PageWrapper>
  );
}
