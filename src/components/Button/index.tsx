import styles from './style.module.css';

type ButtonProps = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export const Button = ({ text, onClick, disabled, className }: ButtonProps) => {
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

export const PrimaryButton = ({
  text,
  onClick,
  className,
  disabled,
}: ButtonProps) => {
  return (
    <Button
      className={`${styles.primaryButton} ${className}`}
      onClick={onClick}
      text={text}
      disabled={disabled}
    />
  );
};
