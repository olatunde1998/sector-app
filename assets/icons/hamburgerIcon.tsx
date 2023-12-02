interface hamburgerIconProps {
    color?: string;
    className?: string;
    width?: number;
    height?: number;
  }


  export const HamburgerIcon = ({
    color,
  className,
  width,
  height,
}: hamburgerIconProps) => {
    return (
      <svg
        width={width}
        height={height}
        viewBox='0 0 16 11'
        fill='none'
        className={className}
        xmlns='http://www.w3.org/2000/svg'
      >
        <line
          x1='1'
          y1='0.5'
          x2='15'
          y2='0.5'
          stroke={color}
          strokeLinecap='round'
        />
        <line
          x1='1'
          y1='5.5'
          x2='15'
          y2='5.5'
          stroke={color}
          strokeLinecap='round'
        />
        <line
          x1='1'
          y1='10.5'
          x2='15'
          y2='10.5'
          stroke={color}
          strokeLinecap='round'
        />
      </svg>
    );
  };