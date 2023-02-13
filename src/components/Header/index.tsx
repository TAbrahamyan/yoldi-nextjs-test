import Image from 'next/image';
import { useRouter } from 'next/router';

import { BasicButton } from '@/components/Button';
import styles from './Header.module.css';

export default function Header() {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={() => router.push('/')}>
        <Image src="/images/logo.png" width={80} height={50} alt="Logo" />
        <p className={styles.logoText}>
          Разрабатываем и запускаем сложные веб проекты
        </p>
      </div>
      <div>
        <BasicButton
          text={'Войти'}
          onClick={() => router.push('/login')}
          className={styles.button}
        />
      </div>
    </header>
  );
}
