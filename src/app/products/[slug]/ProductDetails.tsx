"use client";

import AddToCartButton from "@/components/AddToCartButton";
import BackInStockNotificationButton from "@/components/BackInStockNotificationButton";
import BuyNowButton from "@/components/BuyNowButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Badge from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { checkInStock, findVariant } from "@/lib/utils";
import { products } from "@wix/stores";
import { InfoIcon } from "lucide-react";
import { useState, useEffect } from "react";
import ProductMedia from "./ProductMedia";
import ProductOptions from "./ProductOptions";
import ProductPrice from "./ProductPrice";

interface ProductDetailsProps {
  product: products.Product;
}

function ProductDetailsLoadingSkeleton() {
  return (
    <div className="flex flex-col gap-10 md:flex-row lg:gap-20">
      <div className="basis-2/5">
        <Skeleton className="aspect-square w-full" />
        <div className="mt-5 flex flex-wrap gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="size-[100px]" />
          ))}
        </div>
      </div>
      <div className="basis-3/5 space-y-5">
        <div className="space-y-2.5">
          <Skeleton className="h-10 w-[250px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-10 w-[150px]" />
        <div className="space-y-5">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="space-y-2.5">
              <Skeleton className="h-4 w-[100px]" />
              <div className="flex gap-2.5">
                {Array.from({ length: 3 }).map((_, j) => (
                  <Skeleton key={j} className="h-10 w-[100px]" />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-2.5">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-10 w-24" />
        </div>
        <div className="flex items-center gap-2.5">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>
    </div>
  );
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >(
    product.productOptions
      ?.map((option) => ({
        [option.name || ""]: option.choices?.[0].description || "",
      }))
      ?.reduce((acc, curr) => ({ ...acc, ...curr }), {}) || {}
  );

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <ProductDetailsLoadingSkeleton />;
  }

  const selectedVariant = findVariant(product, selectedOptions);
  const inStock = checkInStock(product, selectedOptions);
  const availableQuantity =
    selectedVariant?.stock?.quantity ?? product.stock?.quantity;

  const availableQuantityExceeded =
    !!availableQuantity && quantity > availableQuantity;

  const selectedOptionsMedia = product.productOptions?.flatMap((option) => {
    const selectedChoice = option.choices?.find(
      (choice) => choice.description === selectedOptions[option.name || ""]
    );
    return selectedChoice?.media?.items ?? [];
  });

  return (
    <div className="flex flex-col gap-10 md:flex-row lg:gap-20">
      <ProductMedia
        media={
          !!selectedOptionsMedia?.length
            ? selectedOptionsMedia
            : product.media?.items
        }
      />
      <div className="basis-3/5 space-y-5">
        <div className="space-y-2.5">
          <h1 className="text-3xl font-bold lg:text-4xl">{product.name}</h1>
          {product.brand && (
            <div className="text-muted-foreground">{product.brand}</div>
          )}
          {product.ribbon && <Badge className="block">{product.ribbon}</Badge>}
        </div>
        {product.description && (
          <div
            dangerouslySetInnerHTML={{ __html: product.description }}
            className="prose dark:prose-invert"
          />
        )}
        <ProductPrice product={product} selectedVariant={selectedVariant} />
        <ProductOptions
          product={product}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
        <div className="space-y-1.5">
          <Label htmlFor="quantity">Quantity</Label>
          <div className="flex items-center gap-2.5">
            <Input
              name="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-24"
              disabled={!inStock}
            />
            {!!availableQuantity &&
              (availableQuantityExceeded || availableQuantity < 10) && (
                <span className="text-destructive">
                  Only {availableQuantity} left in stock
                </span>
              )}
          </div>
        </div>
        {inStock ? (
          <div className="flex items-center gap-2.5">
            <AddToCartButton
              product={product}
              selectedOptions={selectedOptions}
              quantity={quantity}
              disabled={availableQuantityExceeded || quantity < 1}
              className="w-full"
            />
            <BuyNowButton
              product={product}
              selectedOptions={selectedOptions}
              quantity={quantity}
              disabled={availableQuantityExceeded || quantity < 1}
            />
          </div>
        ) : (
          <BackInStockNotificationButton
            product={product}
            selectedOptions={selectedOptions}
            className="w-full"
          />
        )}
        {!!product.additionalInfoSections?.length && (
          <div className="space-y-1.5 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <InfoIcon className="size-5" />
              <span>Additional product information</span>
            </span>
            <Accordion type="multiple">
              {product.additionalInfoSections.map((section) => (
                <AccordionItem value={section.title || ""} key={section.title}>
                  <AccordionTrigger>{section.title}</AccordionTrigger>
                  <AccordionContent>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: section.description || "",
                      }}
                      className="prose text-sm text-muted-foreground dark:prose-invert"
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
      </div>
    </div>
  );
}