import { FC } from 'react';

type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';

const sizes: Record<SpinnerSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
};

interface LoadingSpinnerProps {
  size?: SpinnerSize;
  className?: string;
}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({ size = 'md', className = '' }) => {
  const sizeClass = sizes[size] || sizes.md;

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        className={`animate-spin text-primary-600 ${sizeClass}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
};

export default LoadingSpinner;
