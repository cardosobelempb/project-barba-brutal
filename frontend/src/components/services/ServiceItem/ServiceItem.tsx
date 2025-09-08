import BoxRoot from "@/components/templates/BoxRoot";
import Service from "@/core/service/Service";
import Image from "next/image";

export interface ServiceItemProps {
  service: Service;
}

export const ServiceItem = ({ service }: ServiceItemProps) => {
  return (
    <BoxRoot
      as="article"
      className="flex bg-zinc-800 rounded-xl overflow-hidden"
    >
      <BoxRoot className="relative w-[150px] h-[150px]">
        <Image
          src={service.imgUrl}
          alt={service.name}
          fill
          sizes="100%"
          priority
          className="object-cover object-top w-auto h-auto"
          quality={80}
        />
      </BoxRoot>
      <BoxRoot className="flex flex-col gap-y-2  p-3">
        <h2 className="text-lg font-black">{service.name}</h2>
        <p className="text-xs text-zinc-400 flex-1">{service.description}</p>
        <span className="text-md font-bold">R$ {service.price.toFixed(2)}</span>
      </BoxRoot>
    </BoxRoot>
  );
};
