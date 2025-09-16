// components/globals/IconRoot.tsx
import { FC, SVGProps } from "react";
import { IconType } from "react-icons";

type IconRootProps = {
  icon: IconType;
} & SVGProps<SVGSVGElement>;

export const IconRoot: FC<IconRootProps> = ({ icon: Icon, ...props }) => {
  // Faz o cast interno para garantir tipagem correta
  const IconComponent = Icon as FC<SVGProps<SVGSVGElement>>;
  return <IconComponent {...props} />;
};
