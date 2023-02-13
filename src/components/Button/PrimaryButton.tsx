import { BasicButton } from './BasicButton';
import { BasicButtonProps } from './types';
import styles from './Button.module.css';

export const PrimaryButton = ({
  text,
  onClick,
  className,
  disabled,
}: BasicButtonProps) => {
  return (
    <BasicButton
      className={`${styles.primaryButton} ${className}`}
      onClick={onClick}
      text={text}
      disabled={disabled}
    />
  );
};
