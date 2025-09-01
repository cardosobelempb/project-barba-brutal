import Image from 'next/image';
import Link from 'next/link';

export default function BrandRoot() {
  return (
    <>
      <Link className={`flex items-center gap-x-2`} href={`/`}>
        <Image
          src={`https://mc.surb.com.br/api/v1/buckets/barba-brutal/objects/download?preview=true&prefix=logo.png`}
          alt='Picture of the author'
          width={50}
          height={50}
          className={`w-12 h-12`}
        />
        <div className='flex flex-col leading-tight'>
          <span className={`font-thin text-zinc-400`}>Barba</span>
          <span className={`text-lg font-bold tracking-widest uppercase`}>
            Brutal
          </span>
        </div>
      </Link>
    </>
  );
}
