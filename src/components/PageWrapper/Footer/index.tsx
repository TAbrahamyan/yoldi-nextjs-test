import { useRouter } from 'next/router';
import Link from 'next/link';

import styles from './style.module.css';

export default function Footer() {
  const router = useRouter();

  return (
    <footer className={styles.footer}>
      <p>
        {router.route === '/login' ? 'Еще нет аккаунта?' : 'Уже есть аккаунт?'}
      </p>
      <Link
        href={router.route === '/login' ? '/signup' : '/login'}
        className={styles.actionText}
      >
        {router.route === '/login' ? 'Зарегистрироваться' : 'Войти'}
      </Link>
    </footer>
  );
}
