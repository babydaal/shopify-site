import { Button } from '@components/ui';
import cn from 'clsx';
import Image from 'next/image';
import { FC } from 'react';
import heroBanner from '../../public/herobanner-gradient.png';

export const HeroBanner: FC = () => {
  const divClass = cn('z-9 absolute top-[40%] left-[20%]');
  const imgClass = cn('w-full h-auto z-1');
  return (
    <div className="relative">
      <div className={divClass}>
        <p className="text-xl lg:text-2xl xl:text-3xl">Granola never tasted</p>
        <p className="drop-shadow-[1px_1px_4px_rgba(103, 251, 208, 0.69)] text-xl font-semibold lg:text-2xl xl:text-3xl">
          so colorful
        </p>
        <Button variant="slim" className="text-normal mt-8" Component="a" href="/granola">
          Shop granola
        </Button>
      </div>
      <Image
        src={heroBanner}
        alt="babydaal granola"
        className={imgClass}
        // style={{ width: '100%', height: 'auto', zIndex: 1 }}
      ></Image>
    </div>
  );
};
