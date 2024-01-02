import { FC, useEffect, useState } from 'react';
import cn from 'clsx';
import Link from 'next/link';
import type { Product } from '@commerce/types/product';
import s from './ProductCard.module.css';
import Image, { ImageProps } from 'next/image';
import WishlistButton from '@components/wishlist/WishlistButton';
import usePrice from '@framework/product/use-price';
import ProductTag from '../ProductTag';
import { Button, useUI } from '@components/ui';
import { useAddItem } from '@framework/cart';
import { SelectedOptions, getProductVariant, selectDefaultOptionFromProduct } from '../helpers';

export type ProductCardVariant = 'default' | 'slim' | 'simple' | 'home';

export interface Props {
  className?: string;
  product: Product;
  noNameTag?: boolean;
  imgProps?: Omit<ImageProps, 'src' | 'layout' | 'placeholder' | 'blurDataURL'>;
  variant?: ProductCardVariant;
}

const placeholderImg = '/product-img-placeholder.svg';

const ProductCard: FC<Props> = ({
  product,
  imgProps,
  className,
  noNameTag = false,
  variant = 'default',
}) => {
  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  });
  const addItem = useAddItem();
  const { openSidebar, setSidebarView } = useUI();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});
  const addToCart = async (evt: any) => {
    evt.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await addItem({
        productId: String(product.id),
        variantId: String(product.variants[0].id),
      });
      setSidebarView('CART_VIEW');
      openSidebar();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err instanceof Error) {
        console.error(err);
        setError({
          ...err,
          message: 'Could not add item to cart. Please try again.',
        });
      }
    }
  };

  const rootClassName = cn(
    s.root,
    {
      [s.slim]: variant === 'slim',
      [s.simple]: variant === 'simple',
      [s.home]: variant === 'home',
    },
    className,
  );
  const rootImage = product.images[0]?.url ?? placeholderImg;
  return (
    <Link href={`/product/${product.slug}`} className={rootClassName} aria-label={product.name}>
      {variant === 'home' && (
        <div className="mt-4 flex flex-col flex-nowrap items-center gap-2">
          {product?.images && (
            <div className="flex basis-48 items-center">
              <Image
                alt={product.name || 'Product Image'}
                className={cn(s.productImage)}
                src={rootImage}
                {...imgProps}
              />
            </div>
          )}
          <div className="title-lg basis-4 text-center">
            <span>{product.name}</span>
          </div>
          <div className="label-sm basis-16 pl-2 pr-2 text-center tracking-wide">
            <span>{product.description}</span>
          </div>
          <div className="label-sm basis-10 pl-2 pr-2 text-center tracking-wide">
            <span>${product.price?.value || 10} / 9 oz bag</span>
          </div>
          <Button
            variant="violet"
            loading={loading}
            type="button"
            className="active:border-violet-dark z-30 mb-2"
            onClick={addToCart}
          >
            {loading ? '-_-' : 'add to cart'}
          </Button>
        </div>
      )}
      {variant === 'slim' && (
        <>
          <div className={s.header}>
            <span className="title-lg">{product.name}</span>
          </div>
          {product?.images && (
            <Image
              quality="85"
              src={rootImage}
              alt={product.name || 'Product Image'}
              height={320}
              width={320}
              {...imgProps}
            />
          )}
        </>
      )}

      {variant === 'simple' && (
        <>
          {process.env.COMMERCE_WISHLIST_ENABLED && (
            <WishlistButton
              className={s.wishlistButton}
              productId={product.id}
              variant={product.variants[0]}
            />
          )}
          {!noNameTag && (
            <div className={s.header}>
              <h3 className={s.name}>
                <span className="title-lg">{product.name}</span>
              </h3>
              {/* <div className={s.price}>
                {`${price} ${product.price?.currencyCode}`}
              </div> */}
            </div>
          )}
          <div className={s.imageContainer}>
            {product?.images && (
              <Image
                alt={product.name || 'Product Image'}
                className={s.productImage}
                src={rootImage}
                height={540}
                width={540}
                quality="85"
                {...imgProps}
              />
            )}
          </div>
        </>
      )}

      {variant === 'default' && (
        <>
          {/* {process.env.COMMERCE_WISHLIST_ENABLED && (
            <WishlistButton
              className={s.wishlistButton}
              productId={product.id}
              variant={product.variants[0] as any}
            />
          )} */}
          <ProductTag name={product.name} price={`${price} ${product.price?.currencyCode}`} />
          <div className={s.imageContainer}>
            {product?.images && (
              <Image
                alt={product.name || 'Product Image'}
                className={s.productImage}
                src={rootImage}
                height={540}
                width={540}
                quality="85"
                {...imgProps}
              />
            )}
          </div>
        </>
      )}
    </Link>
  );
};

export default ProductCard;
