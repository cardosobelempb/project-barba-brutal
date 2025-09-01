import BoxRoot from "@/components/templates/BoxRoot";
import {
  FaInstagramSquare,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export const ProfissionalSocial = () => {
  return (
    <BoxRoot className="flex gap-x-2 p-3 text-zinc-300">
      <FaYoutube className="stroke-1" />
      <FaInstagramSquare />
      <FaTwitter />
      <FaLinkedin />
    </BoxRoot>
  );
};
