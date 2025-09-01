import { HeadingRoot } from "@/components/shared";
import ContentRoot from "@/components/templates/ContentRoot";
import { professionals } from "@/core";

import { ProfessionalItem } from "../ProfessionalItem";

export const ProfissionalMapper = () => {
  return (
    <>
      <ContentRoot className="flex flex-col items-cente relative py-8">
        <HeadingRoot
          tag="Time"
          title="Nossos Brutos"
          description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam inventore ut cumque nulla aliquid voluptatum eos commodi harum doloremque vitae quod numquam dicta repudiandae explicabo corporis, accusamus dolore officiis tempore!"
        />
      </ContentRoot>
      <ContentRoot
        as={"section"}
        className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5"
      >
        {professionals.map((professional) => {
          return (
            <ProfessionalItem
              key={professional.id}
              professional={professional}
            />
          );
        })}
      </ContentRoot>
    </>
  );
};
