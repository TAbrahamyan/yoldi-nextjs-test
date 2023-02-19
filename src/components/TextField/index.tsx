import React from 'react';
import Image from 'next/image';

import styles from './style.module.css';

type TextFieldProps = {
  type?: React.HTMLInputTypeAttribute;
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  icon?: string;
  className?: string;
};

export default function TextField({
  type = 'text',
  value,
  setValue,
  placeholder,
  icon,
  className,
}: TextFieldProps) {
  const [passwordVisibility, setPasswordVisibility] = React.useState(false);
  const ref = React.useRef<HTMLInputElement>(null);

  return (
    <div className={styles.content}>
      {icon && (
        <Image
          className={styles.icon}
          src={icon}
          width={25}
          height={25}
          alt={''}
          onClick={() => ref.current?.focus()}
        />
      )}
      <input
        className={`${styles.input} ${className}`}
        ref={ref}
        type={type === 'password' && passwordVisibility ? 'text' : type}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
      />
      {type === 'password' && (
        <Image
          src={'/svg/eye.svg'}
          className={styles.eye}
          width={25}
          height={25}
          alt={'eye-icon'}
          onClick={() => setPasswordVisibility(!passwordVisibility)}
        />
      )}
    </div>
  );
}
