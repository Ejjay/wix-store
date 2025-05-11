/* eslint-disable @next/next/no-img-element */
import { media as wixMedia } from "@wix/sdk";
import { ImgHTMLAttributes, useMemo } from "react";

type BaseWixImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "width" | "height" | "alt"
> & {
  mediaIdentifier: string | undefined;
  placeholder?: string;
  alt?: string | null | undefined;
};

type ScaledWixImageProps = BaseWixImageProps & {
  scaleToFill?: true;
  width: number;
  height: number;
};

type UnscaledWixImageProps = BaseWixImageProps & {
  scaleToFill: false;
  width?: never;
  height?: never;
};

type WixImageProps = ScaledWixImageProps | UnscaledWixImageProps;

export default function WixImage({
  mediaIdentifier,
  placeholder = "/placeholder.png",
  alt,
  ...props
}: WixImageProps) {
  const imageUrl = useMemo(() => {
    if (!mediaIdentifier) return placeholder;

    if (props.scaleToFill || props.scaleToFill === undefined) {
      const scaledProps = props as ScaledWixImageProps;
      return wixMedia.getScaledToFillImageUrl(
        mediaIdentifier,
        scaledProps.width,
        scaledProps.height,
        {}
      );
    }
    
    return wixMedia.getImageUrl(mediaIdentifier).url;
  }, [mediaIdentifier, placeholder, props]);

  return <img src={imageUrl} alt={alt || ""} {...props} />;
}