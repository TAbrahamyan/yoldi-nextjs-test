import Image from 'next/image';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import Avatar from '@/components/Avatar';
import { Button } from '@/components/Button';
import { ENDPOINTS } from '@/common/api/endpoints';
import { ProfileDto } from '@/common/api/types';
import { fetcher, ApiResponse } from '@/common/lib/fetcher';
import { getToken } from '@/common/lib/auth';
import styles from './style.module.css';

export default function Header() {
  const router = useRouter();

  const { data: profile } = useSWR<ApiResponse<ProfileDto>>(
    () => (Boolean(getToken()) ? ENDPOINTS.PROFILE.GET : null),
    (url: string) => fetcher(url, { headers: { 'X-API-KEY': getToken() } }),
  );

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={() => router.push('/')}>
        <Image src="/images/logo.png" width={80} height={50} alt="Logo" />
        <p className={styles.logoText}>
          Разрабатываем и запускаем сложные веб проекты
        </p>
      </div>
      {profile ? (
        <div className={styles.profile}>
          <p className={styles.name}>{profile.data.name}</p>
          <Avatar image={profile.data.image} name={profile.data.name} />
        </div>
      ) : (
        <Button
          text={'Войти'}
          onClick={() => router.push('/login')}
          className={styles.button}
        />
      )}
    </header>
  );
}
