import Image from 'next/image';

import { ImageDto } from '@/common/api/types';
import styles from './style.module.css';

type AvatarProps = {
  name: string;
  image?: ImageDto;
  className?: string;
};

export default function Avatar({ image, name, className = '' }: AvatarProps) {
  return (
    <div className={className}>
      {image ? (
        <Image
          className={styles.avatar}
          src={image.url}
          width={0}
          height={0}
          alt={name}
        />
      ) : (
        <div className={`${styles.avatar} ${styles.userNameAvatar}`}>
          {name[0].toUpperCase()}
        </div>
      )}
    </div>
  );
}
