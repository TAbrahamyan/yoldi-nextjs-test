import React from 'react';

import styles from './style.module.css';

type TextAreaProps = {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  className?: string;
};

export default function TextArea({
  value,
  setValue,
  placeholder,
  className = '',
}: TextAreaProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (ref.current && value) {
      ref.current.textContent = value;
    }
  }, [value]);

  return (
    <div className={styles.content}>
      {value.length === 0 && (
        <p className={styles.placeholder} onClick={() => ref.current?.focus()}>
          {placeholder}
        </p>
      )}
      <div
        ref={ref}
        className={`${styles.input} ${className}`}
        contentEditable
        onInput={(event: any) => setValue(event.target.innerText)}
      />
    </div>
  );
}
