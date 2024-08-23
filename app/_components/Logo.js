import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo-dark.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4">
      {/* <Image src="/logo-dark.png" width={60} height={60} alt="grand hotel - logo"/> */}
      <Image
        src={logo}
        width={60}
        height={60}
        alt="grand hotel - logo"
        quality={100}
      />
    </Link>
  );
}

export default Logo;
