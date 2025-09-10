import { StartRoot } from "@/components/shared";
import BoxRoot from "@/components/templates/BoxRoot";
import Professional from "@/core/professional/Professional";
import Image from "next/image";

import { ProfissionalSocial } from "../ProfessionalSocial/ProfessionalSocial";

export interface ProfissionalItemProps {
  professional: Professional;
}

export const ProfessionalItem = ({ professional }: ProfissionalItemProps) => {
  return (
    <BoxRoot
      as="article"
      className="flex flex-col bg-zinc-800 rounded overflow-hidden"
    >
      <BoxRoot className="relative h-72 w-full">
        <Image
          src={professional.imgUrl}
          alt={professional.name}
          fill
          sizes="100%"
          priority
          className="object-cover object-top w-auto h-auto"
          quality={80}
        />
      </BoxRoot>

      <BoxRoot className="flex flex-col gap-y-2  p-3">
        <h1 className="text-2xl font-black">{professional.name}</h1>
        <p className="text-xs text-zinc-400 flex-1">
          {professional.description}
        </p>
      </BoxRoot>
      <StartRoot star={professional.star} starQtd={professional.starQtd} />
      <ProfissionalSocial />
    </BoxRoot>
  );
};
