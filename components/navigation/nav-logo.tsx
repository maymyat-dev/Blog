import Link from "next/link";
import Logo from "@/public/img/logo.png";
import Image from "next/image";

function NavLogo() {
  return (
    <>
      <h1>
        <Link href="/">
          <Image src={Logo} alt="Logo" width={50} height={50} />
        </Link>
      </h1>
    </>
  );
}

export default NavLogo;
