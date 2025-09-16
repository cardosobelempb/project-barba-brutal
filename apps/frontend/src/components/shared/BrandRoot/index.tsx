import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type BrandRootProps = {
  className?: string;
};

export default function BrandRoot({ className }: BrandRootProps) {
  return (
    <>
      <Link
        className={cn(
          `flex items-center justify-center sm:justify-start gap-x-2`,
          className,
        )}
        href={`/`}
      >
        <Image
          src={`https://mc.surb.com.br/api/v1/buckets/barba-brutal/objects/download?preview=true&prefix=logo.png`}
          alt="Picture of the author"
          width={50}
          height={50}
          className={`w-16 h-16 hidden sm:block `}
        />
        <Image
          src={`https://mc.surb.com.br/api/v1/buckets/barba-brutal/objects/download?preview=true&prefix=logo.png`}
          alt="Picture of the author"
          width={50}
          height={50}
          className={`w-12 h-12 blocl sm:hidden`}
        />
        <div className="flex flex-col leading-tight">
          <span className={`font-thin text-zinc-400 text-gradient`}>Barba</span>
          <span
            className={`text-lg font-bold tracking-widest uppercase text-gradient`}
          >
            Brutal
          </span>
        </div>
      </Link>
    </>
  );
}
