//ナビゲーション用のコンポーネント

import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationButton = ({ path, label, className }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <button className={className} onClick={handleClick}>
      {label}
    </button>
  );
};

export default NavigationButton;