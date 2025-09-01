import BoxRoot from "@/components/templates/BoxRoot";

type HeadingRootProps = {
  tag?: string;
  title: string;
  description: string;
};

export const HeadingRoot = ({ tag, description, title }: HeadingRootProps) => {
  return (
    <BoxRoot className="flex flex-col justify-center items-center gap-y-4 w-full ">
      {tag && (
        <span className="text-center text-xs md:text-base font-black bg-zinc-600 px-3 py-1 rounded">
          {tag}
        </span>
      )}
      <BoxRoot className="flex flex-col items-center">
        <h2 className="text-center text-2xl sm:text-4xl md:text-5xl font-bold text-gradient">
          {title}
        </h2>
        <p className="text-xs text-zinc-500 text-center md:w-[450px]">
          {description}
        </p>
      </BoxRoot>
    </BoxRoot>
  );
};
