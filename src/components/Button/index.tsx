import Image from 'next/image';

import styles from './style.module.css';

type ButtonProps = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  iconLeft?: string;
  iconRight?: string;
  className?: string;
};

export const Button = ({
  text,
  onClick,
  iconLeft,
  iconRight,
  disabled,
  className = '',
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {iconLeft && (
        <Image
          className={styles.iconLeft}
          src={iconLeft}
          width={25}
          height={25}
          alt={''}
        />
      )}
      <p
        className={`${styles.text} ${iconLeft ? styles.iconLeftText : ''} ${
          iconRight ? styles.iconRightText : ''
        }`}
      >
        {text}
      </p>
      {iconRight && (
        <Image
          className={styles.iconRight}
          src={iconRight}
          width={25}
          height={25}
          alt={''}
        />
      )}
    </button>
  );
};

export const PrimaryButton = ({
  text,
  onClick,
  iconLeft,
  iconRight,
  disabled,
  className,
}: ButtonProps) => {
  return (
    <Button
      className={`${styles.primaryButton} ${className}`}
      onClick={onClick}
      text={text}
      iconLeft={iconLeft}
      iconRight={iconRight}
      disabled={disabled}
    />
  );
};
