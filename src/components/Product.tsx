"use client";
import { useEffect, useRef } from "react";
import { formatCurrency } from "@/lib/utils";
import { products } from "@wix/stores";
import Link from "next/link";
import DiscountBadge from "./DiscountBadge";
import WixImage from "./WixImage";
import Badge from "./ui/badge";

interface ProductProps {
  product: products.Product;
}

export default function Product({ product }: ProductProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const mainImage = product.media?.mainMedia?.image;

  // Helper function for formatting price (keep this inside the file)
  function getFormattedPrice(product: products.Product) {
    const minPrice = product.priceRange?.minValue;
    const maxPrice = product.priceRange?.maxValue;

    if (minPrice && maxPrice && minPrice !== maxPrice) {
      return `from ${formatCurrency(minPrice, product.priceData?.currency)}`;
    } else {
      return (
        product.priceData?.formatted?.discountedPrice ||
        product.priceData?.formatted?.price ||
        "n/a"
      );
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scale-105');
          } else {
            entry.target.classList.remove('scale-105');
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '0px'
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <Link href={`/products/${product.slug}`} className="h-full border bg-card">
      <div className="relative overflow-hidden">
        <div ref={imageRef}>
          <WixImage
            mediaIdentifier={mainImage?.url}
            alt={mainImage?.altText}
            width={700}
            height={700}
            className="transition-transform duration-700"
          />
        </div>
        <div className="absolute bottom-3 right-3 flex flex-wrap items-center gap-2">
          {product.ribbon && <Badge>{product.ribbon}</Badge>}
          {product.discount && <DiscountBadge data={product.discount} />}
          <Badge className="bg-secondary font-semibold text-secondary-foreground">
            {getFormattedPrice(product)}
          </Badge>
        </div>
      </div>
      <div className="space-y-3 p-3">
        <h3 className="text-lg font-bold">{product.name}</h3>
        <div
          className="line-clamp-5"
          dangerouslySetInnerHTML={{ __html: product.description || "" }}
        />
      </div>
    </Link>
  );
}