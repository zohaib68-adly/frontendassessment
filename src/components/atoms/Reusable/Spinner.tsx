import React from 'react';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large' | number;
  color?: string;
  className?: string;
  'aria-label'?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 'medium',
  color = '#3b82f6',
  className = '',
  'aria-label': ariaLabel = 'Loading...',
}) => {
  const getSize = () => {
    if (typeof size === 'number') return size;
    
    switch (size) {
      case 'small':
        return 16;
      case 'medium':
        return 24;
      case 'large':
        return 32;
      default:
        return 24;
    }
  };

  const spinnerSize = getSize();

  return (
    <div
      className={`inline-block animate-spin ${className}`}
      style={{
        width: spinnerSize,
        height: spinnerSize,
      }}
      role="status"
      aria-label={ariaLabel}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
          strokeOpacity="0.25"
          fill="none"
        />
        <path
          d="M12 2a10 10 0 0 1 10 10"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
};

export default Spinner;
