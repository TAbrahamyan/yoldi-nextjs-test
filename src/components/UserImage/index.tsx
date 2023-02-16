import Image from 'next/image';

import { ImageDto } from '@/common/api/types';
import styles from './UserImage.module.css';

type UserImageProps = {
  image: ImageDto | null;
  name: string;
};

export default function UserImage({ image, name }: UserImageProps) {
  return image ? (
    <Image
      className={styles.image}
      src={image.url}
      width={50}
      height={50}
      alt={name}
    />
  ) : (
    <div className={`${styles.image} ${styles.nameImage}`}>
      {name[0].toUpperCase()}
    </div>
  );
}
