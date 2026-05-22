import Link from "next/link";

import type { Project } from "@/data/projects";
import { serviceLabels } from "@/data/projects";
import { ImageFrame } from "@/components/media/ImageFrame";
import { Tag } from "@/components/ui/Tag";
import { formatStatus } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  large?: boolean;
};

export function ProjectCard({ large = false, project }: ProjectCardProps) {
  return (
    <Link
      className="group grid gap-5 border-t border-ink/10 pt-5 transition duration-300 ease-premium hover:border-oak md:gap-7"
      href={`/projects/${project.slug}`}
    >
      <ImageFrame
        alt={project.heroImage.alt}
        aspect={large ? "aspect-[16/9]" : "aspect-[16/11]"}
        imageClassName="brightness-[0.9]"
        priority={large}
        sizes={large ? "(min-width: 1024px) 62vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
        src={project.heroImage.src}
      />
      <div className="grid gap-4">
        <div className="flex flex-wrap gap-2">
          {project.services.map((service) => (
            <Tag key={service}>{serviceLabels[service]}</Tag>
          ))}
          {project.status ? <Tag>{formatStatus(project.status)}</Tag> : null}
        </div>
        <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-start">
          <div>
            <p className="mb-2 text-sm font-medium text-oak">{project.eyebrow}</p>
            <h3 className="text-2xl font-medium leading-tight text-ink md:text-3xl">
              {project.title}
            </h3>
          </div>
          <span
            aria-hidden="true"
            className="hidden text-2xl text-ink/30 transition duration-300 group-hover:translate-x-1 group-hover:text-oak md:block"
          >
            /
          </span>
        </div>
        <p className="max-w-2xl text-base leading-7 text-ink/64">{project.shortDescription}</p>
      </div>
    </Link>
  );
}
