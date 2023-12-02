interface ButtonProps {
  btnText?: string;
  className?: string;
  handleBtnClick?: any;
  btnIcon?: any;
}

export const Button = ({ btnText, className, handleBtnClick}: ButtonProps) => {
  return (
    <>
      <button
        type="submit"
        onClick={handleBtnClick}
        className={`${className} p-3 w-[200px] rounded-md text-center cursor-pointer flex items-center justify-center`}
      >
        {btnText}
      </button>
    </>
  );
};

export const IconButton = ({
  btnText,
  className,
  handleBtnClick,
  btnIcon,
}: ButtonProps) => {
  return (
    <>
      <button
        onClick={handleBtnClick}
        className={`${className} p-3 w-[200px] rounded-md text-center cursor-pointer flex items-center justify-center`}
      >
        <span className="mr-4 ml-2">{btnIcon}</span>
        {btnText}
      </button>
    </>
  );
};
