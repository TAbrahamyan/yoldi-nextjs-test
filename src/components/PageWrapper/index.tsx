import Head from 'next/head';
import { useRouter } from 'next/router';
import { Inter } from '@next/font/google';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import styles from './PageWrapper.module.css';

type PageWrapperProps = {
  title: string;
  className?: string;
  children: React.ReactNode;
};

const inter = Inter({ subsets: ['latin'] });

export default function PageWrapper({
  title,
  className,
  children,
}: PageWrapperProps) {
  const router = useRouter();

  return (
    <div className={`${inter.className} ${styles.container} ${className}`}>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      {children}
      {['/login', '/signup'].includes(router.route) && <Footer />}
    </div>
  );
}
