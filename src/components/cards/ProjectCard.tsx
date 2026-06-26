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

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      className="group flex flex-col border-t border-ink/10 pt-5 transition duration-300 ease-premium hover:border-oak"
      href={`/projects/${project.slug}`}
    >
      {/* Image — locked aspect ratio, identical on every card */}
      <div className="overflow-hidden rounded-md">
        <ImageFrame
          alt={project.heroImage.alt}
          aspect="aspect-[4/3]"
          imageClassName="brightness-[0.92] transition-transform duration-700 group-hover:scale-105"
          sizes="(min-width: 1024px) 50vw, 100vw"
          src={project.heroImage.src}
        />
      </div>

      {/* Text block */}
      <div className="flex flex-1 flex-col gap-3 pt-5">

        {/* Tags — min-height keeps titles vertically aligned across columns */}
        <div className="flex min-h-[28px] flex-wrap items-center gap-2">
          {project.services.map((service) => (
            <Tag key={service}>{serviceLabels[service]}</Tag>
          ))}
          {project.status ? <Tag>{formatStatus(project.status)}</Tag> : null}
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-oak">
              {project.eyebrow}
            </p>
            <h3
              className="font-display text-xl font-normal text-ink md:text-2xl"
              style={{ lineHeight: "1.2", letterSpacing: "-0.01em" }}
            >
              {project.title}
            </h3>
          </div>
          <span className="mt-1 shrink-0 text-xl text-ink/25 transition duration-300 group-hover:translate-x-1 group-hover:text-oak">
            ↗
          </span>
        </div>

        <p className="text-sm leading-7 text-ink/60">{project.shortDescription}</p>
      </div>
    </Link>
  );
}






