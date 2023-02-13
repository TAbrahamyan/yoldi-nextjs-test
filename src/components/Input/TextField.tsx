import { useState, useRef, HTMLInputTypeAttribute } from 'react';
import Image from 'next/image';

import styles from './TextField.module.css';

type TextFieldProps = {
  type?: HTMLInputTypeAttribute;
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  icon?: string;
  className?: string;
};

export const TextField = ({
  type = 'text',
  value,
  setValue,
  placeholder,
  icon,
  className,
}: TextFieldProps) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.inputContent}>
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
};
