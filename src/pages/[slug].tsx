import useSWR from 'swr';
import { useRouter } from 'next/router';
import Image from 'next/image';

import PageWrapper from '@/components/PageWrapper';
import Avatar from '@/components/Avatar';
import { fetcher, ApiResponse } from '@/common/lib/fetcher';
import { ENDPOINTS } from '@/common/api/endpoints';
import { ProfileDto } from '@/common/api/types';
import styles from '@/styles/User.module.css';

export default function User() {
  const router = useRouter();

  const {
    data: user,
    isLoading,
    error,
  } = useSWR<ApiResponse<ProfileDto>>(
    () =>
      router.query.slug
        ? ENDPOINTS.USER.USER(router.query.slug as string)
        : null,
    fetcher,
  );

  return (
    <PageWrapper title={user?.data.name ?? ''}>
      <div className={styles.container}>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>Что-то пошло не так - {error.message}</h1>
        ) : (
          user && (
            <>
              {user.data.cover ? (
                <Image
                  className={styles.userCover}
                  src={user.data.cover.url}
                  width={0}
                  height={0}
                  alt={''}
                />
              ) : (
                <div className={styles.userCover} />
              )}
              <div className={styles.content}>
                <Avatar
                  name={user.data.name}
                  image={user.data.image}
                  className={styles.avatar}
                />
                <h1 className={styles.userName}>{user.data.name}</h1>
                <p className={styles.userEmail}>{user.data.email}</p>
                <p className={styles.description}>{user.data.description}</p>
              </div>
            </>
          )
        )}
      </div>
    </PageWrapper>
  );
}
