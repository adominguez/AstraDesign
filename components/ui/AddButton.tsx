import { ReactNode, ButtonHTMLAttributes } from 'react';

interface AddButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function AddButton({ children, className, ...rest }: AddButtonProps) {
  return (
    <button
       className={`$flex gap-2 justify-center items-center px-4 py-2 cursor-pointer bg-indigo-600 hover:bg-indigo-700 rounded-3xl text-white transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}