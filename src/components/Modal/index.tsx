import ReactDOM from 'react-dom';
import { Inter } from '@next/font/google';

import styles from './style.module.css';

type ModalProps = {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
};

const inter = Inter({ subsets: ['latin'] });

export default function Modal({
  isVisible,
  onClose,
  title,
  children,
  className = '',
}: ModalProps) {
  if (!isVisible) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <div className={styles.modalOverlay} onClick={onClose} />
      <div className={styles.modalWrapper}>
        <div
          className={`${inter.className} ${styles.modalContent} ${className}`}
        >
          <h1 className={styles.title}>{title}</h1>
          {children}
        </div>
      </div>
    </>,
    document.body,
  );
}
