import Logo from "../../../../public/images/brandlogo.svg"


import Image from "next/image";

export const BrandLogo = () => {
  return (
    <Image
      src={Logo}
      alt="company logo"
      width={100}
      height={100}
    />
  );
};
