import React from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Image from 'next/image';

import PageWrapper from '@/components/PageWrapper';
import Avatar from '@/components/Avatar';
import { fetcher, ApiResponse } from '@/common/lib/fetcher';
import { getToken } from '@/common/lib/auth';
import { ENDPOINTS } from '@/common/api/endpoints';
import { ProfileDto, ImageDto } from '@/common/api/types';
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

  const { data: profile } = useSWR<ApiResponse<ProfileDto>>(
    () => (Boolean(getToken()) ? ENDPOINTS.PROFILE.GET : null),
    (url: string) => fetcher(url, { headers: { 'X-API-KEY': getToken() } }),
  );

  React.useEffect(() => {
    if (user?.data && profile?.data && user?.data.slug === profile?.data.slug) {
      router.replace('/profile');
    }
  }, [user?.data.slug, profile?.data.slug]);

  return (
    <PageWrapper title={user?.data.name ?? ''}>
      <div className={styles.container}>
        {isLoading || !user ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>Что-то пошло не так - {error.message}</h1>
        ) : (
          <>
            <UserCover cover={user.data.cover} />
            <div className={styles.content}>
              <Avatar
                name={user.data.name}
                image={user.data.image}
                className={styles.avatar}
              />
              <UserInfo
                name={user.data.name}
                email={user.data.email}
                description={user.data.description}
              />
            </div>
          </>
        )}
      </div>
    </PageWrapper>
  );
}

const UserCover = ({ cover }: { cover?: ImageDto }) => {
  return cover ? (
    <Image
      className={styles.userCover}
      src={cover.url}
      width={0}
      height={0}
      alt={''}
    />
  ) : (
    <div className={styles.userCover} />
  );
};

const UserInfo = ({
  name,
  email,
  description,
}: {
  name: string;
  email: string;
  description?: string;
}) => {
  return (
    <>
      <div className={styles.userNameEmail}>
        <h1 className={styles.userName}>{name}</h1>
        <p className={styles.userEmail}>{email}</p>
      </div>
      {description && <p className={styles.description}>{description}</p>}
    </>
  );
};
