import React from 'react';

export const useModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const body = document.body;
    if (isOpen) {
      body.style.overflow = 'hidden';
      body.scrollTo(0, 0);
    } else {
      body.style.overflow = 'auto';
    }

    return () => {
      body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  return { isOpen, openModal, closeModal };
};
