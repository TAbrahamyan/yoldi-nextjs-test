import { BasicButtonProps } from './types';
import styles from './Button.module.css';

export const BasicButton = ({
  text,
  onClick,
  disabled,
  className,
}: BasicButtonProps) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
