import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import LogoOneLine from 'components/images/logo-one-line';
import { getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
const { SITE_DESCRIPTION } = process.env;

export default async function Navbar() {
  const menu = await getMenu('main-menu');

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <MobileMenu menu={menu} />
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <Link href="/" className="mx-2 flex w-full items-center justify-center sm:w-auto lg:mr-6">
            <LogoOneLine />
            <div className="text-md ml-4 hidden flex-none font-informal font-semibold capitalize text-primary-darker dark:text-primary-light lg:block">
              {SITE_DESCRIPTION}
            </div>
          </Link>
        </div>
        <div className="flex w-full justify-end md:w-2/3">
          <div className="mr-8 flex items-center">
            {menu.length ? (
              <ul className="text-md hidden gap-8 md:flex md:items-center lg:gap-12">
                {menu.map((item: Menu) => (
                  <li key={item.title}>
                    <Link
                      href={item.path}
                      className="font-sans text-base underline-offset-4 hover:text-black hover:underline dark:text-primary-light dark:hover:text-base-light"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="ml-2 hidden flex-none text-sm font-medium uppercase sm:block md:hidden">
              {SITE_DESCRIPTION}
            </div>
          </div>
          <Suspense fallback={<OpenCart />}>
            <Cart />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
