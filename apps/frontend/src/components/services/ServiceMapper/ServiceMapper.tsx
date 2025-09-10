import { HeadingRoot } from "@/components/shared";
import ContentRoot from "@/components/templates/ContentRoot";
import { services } from "@/core/service/service-data";

import { ServiceItem } from "../ServiceItem";

export const ServiceMapper = () => {
  return (
    <>
      <ContentRoot className="flex flex-col items-center relative py-8">
        <HeadingRoot
          tag="Serviços"
          title="Do Classico ao Rock"
          description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam inventore ut cumque nulla aliquid voluptatum eos commodi harum doloremque vitae quod numquam dicta repudiandae explicabo corporis, accusamus dolore officiis tempore!"
        />
      </ContentRoot>
      <ContentRoot
        as={"section"}
        className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5"
      >
        {services.map((service) => {
          return <ServiceItem key={service.id} service={service} />;
        })}
      </ContentRoot>
    </>
  );
};
