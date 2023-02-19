import React from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';

import PageWrapper from '@/components/PageWrapper';
import Avatar from '@/components/Avatar';
import { ENDPOINTS } from '@/common/api/endpoints';
import { ProfileDto } from '@/common/api/types';
import { fetcher, ApiResponse } from '@/common/lib/fetcher';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const router = useRouter();

  const {
    data: users,
    isLoading,
    error,
  } = useSWR<ApiResponse<ProfileDto[]>>(ENDPOINTS.USER.USERS, fetcher);

  return (
    <PageWrapper title={'Главная'}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Список аккаунтов</h1>
          {isLoading ? (
            <h1>Loading...</h1>
          ) : error ? (
            <h1>Что-то пошло не так - {error.message}</h1>
          ) : !users?.data.length ? (
            <h1>Пользователей нет</h1>
          ) : (
            <div>
              <div className={styles.line} />
              {users.data.map((user: ProfileDto) => (
                <React.Fragment key={user.slug}>
                  <User
                    user={user}
                    redirectToUser={() => router.push(`/${user.slug}`)}
                  />
                  <div className={styles.line} />
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}

type UserProps = {
  user: ProfileDto;
  redirectToUser: () => void;
};

const User = ({ user, redirectToUser }: UserProps) => {
  return (
    <div className={styles.user} onClick={redirectToUser}>
      <Avatar image={user.image} name={user.name} className={styles.avatar} />
      <p className={styles.userName}>{user.name}</p>
      <p className={styles.userEmail}>{user.email}</p>
    </div>
  );
};
