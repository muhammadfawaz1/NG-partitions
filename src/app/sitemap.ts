import type { MetadataRoute } from "next";

import { projects } from "@/data/projects";
import { services } from "@/data/services";

const baseUrl = "https://ngpartitions.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/services", "/projects", "/contact"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date()
  }));

  const serviceRoutes = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date()
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date()
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes];
}






