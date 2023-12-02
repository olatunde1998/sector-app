import Image from "next/image";

export const BrandLogo = () => {
  return (
    <Image
      src="/images/brandLogo.svg"
      alt="company logo"
      width={100}
      height={100}
    />
  );
};
