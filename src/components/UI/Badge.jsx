import React from 'react';

const badgeStyles = {
  primary: 'bg-blue-100 text-blue-800',
  secondary: 'bg-gray-100 text-gray-800',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  danger: 'bg-red-100 text-red-800',
  info: 'bg-teal-100 text-teal-800',
};

export const Badge = ({ text, variant = 'primary', className = '' }) => {
  const badgeStyle = badgeStyles[variant] || badgeStyles.primary;

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeStyle} ${className}`}>
      {text}
    </span>
  );
};
