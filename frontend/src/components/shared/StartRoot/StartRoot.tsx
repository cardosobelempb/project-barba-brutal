import BoxRoot from "@/components/templates/BoxRoot";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

type StartRootProps = {
  star: number;
  starQtd: number;
};

export const StartRoot = ({ star, starQtd }: StartRootProps) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const value = index + 1;

    if (star >= value) {
      return <FaStar key={index} size={18} />;
    } else if (star > value - 1) {
      return <FaStarHalfAlt key={index} size={18} />;
    } else {
      return <FaRegStar key={index} size={18} />;
    }
  });
  return (
    <BoxRoot className="flex items-center gap-x-1 px-3 ">
      <span className="flex gap-x-1 text-yellow-500">{stars}</span>
      <span className="text-xs text-zinc-400">({starQtd})</span>
    </BoxRoot>
  );
};
