import Image from "next/image";

import { cn } from "@/lib/utils";

type ImageFrameProps = {
  alt: string;
  aspect?: string;
  caption?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  src: string;
};

export function ImageFrame({
  alt,
  aspect = "aspect-[16/10]",
  caption,
  className,
  imageClassName,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  src
}: ImageFrameProps) {
  return (
    <figure className={cn("group", className)}>
      <div className={cn("relative overflow-hidden rounded-md bg-ink/10", aspect)}>
        <Image
          alt={alt}
          className={cn(
            "object-cover transition duration-700 ease-premium group-hover:scale-[1.025]",
            imageClassName
          )}
          fill
          priority={priority}
          sizes={sizes}
          src={src}
        />
      </div>
      {caption ? <figcaption className="mt-3 text-sm leading-6 text-ink/55">{caption}</figcaption> : null}
    </figure>
  );
}






