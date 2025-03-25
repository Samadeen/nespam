interface ButtonProps {
  className?: string;
  text: string;
  disabled?: boolean;
}

const Button = ({ className, text, disabled }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`flex justify-center items-center gap-2 self-stretch text-white bg-[#254D55] text-sm not-italic font-semibold leading-[normal] px-8 py-4 rounded-xl ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
