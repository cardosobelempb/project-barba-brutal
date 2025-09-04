import BoxRoot from "@/components/templates/BoxRoot";
import Link from "next/link";
import {
  FaInstagramSquare,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export const ProfissionalSocial = () => {
  return (
    <BoxRoot
      as="nav"
      className="flex gap-x-2 p-3 text-zinc-300 justify-center sm:justify-start"
    >
      <ul className="flex items-center gap-x-2">
        <li>
          <Link href={"/"}>
            <FaYoutube />
          </Link>
        </li>
        <li>
          <Link href={"/"}>
            <FaInstagramSquare />
          </Link>
        </li>
        <li>
          <Link href={"/"}>
            <FaTwitter />
          </Link>
        </li>
        <li>
          <Link href={"/"}>
            <FaLinkedin />
          </Link>
        </li>
      </ul>
    </BoxRoot>
  );
};
