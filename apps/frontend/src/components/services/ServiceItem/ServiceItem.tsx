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
      <Image
        src={service.imgUrl}
        alt={service.name}
        width={150}
        height={150}
        priority
        className="object-cover"
      />
      <BoxRoot className="flex flex-col gap-y-2  p-3">
        <h2 className="text-lg font-black">{service.name}</h2>
        <p className="text-xs text-zinc-400 flex-1">{service.description}</p>
        <span className="text-md font-bold">R$ {service.price.toFixed(2)}</span>
      </BoxRoot>
    </BoxRoot>
  );
};
