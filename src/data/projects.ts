
export type ProjectService =
  | "sfs"
  | "drylining"
  | "ceilings"
  | "acoustics"
  | "fit-out";

export type ProjectStatus = "completed" | "ongoing";

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  role?: "hero" | "gallery" | "detail" | "thumbnail";
  caption?: string;
};

export type Project = {
  title: string;
  slug: string;
  eyebrow: string;
  shortDescription: string;
  fullDescription: string;
  services: ProjectService[];
  location?: string;
  status?: ProjectStatus;
  featured?: boolean;
  year?: string;
  heroImage: ProjectImage;
  gallery: ProjectImage[];
  scope: string[];
  outcomes: string[];
  seo: {
    title: string;
    description: string;
  };
};

export const serviceLabels: Record<ProjectService, string> = {
  sfs: "SFS",
  drylining: "Drylining",
  ceilings: "Suspended Ceilings",
  acoustics: "Acoustics",
  "fit-out": "Fit-Out"
};

export const projects: Project[] = [
  {
    title: "Commercial Office Ceiling Renewal",
    slug: "commercial-office-ceiling-renewal",
    eyebrow: "Suspended Ceilings / Commercial Interiors",
    shortDescription:
      "A clean, high-output ceiling installation for a large open-plan workplace.",
    fullDescription:
      "N&G Partitions delivered a precise suspended ceiling package across a broad commercial floorplate, coordinating lighting, grilles, perimeter details and access points into a crisp finished interior.",
    services: ["ceilings", "fit-out"],
    location: "UK commercial office",
    status: "completed",
    featured: true,
    year: "Recent work",
    heroImage: {
      src: "/assets/images/ceilings/TimberCeilingPackage.png",
      alt: "Commercial office with timber slat suspended ceiling and integrated lighting",
      width: 1474,
      height: 1000,
      role: "hero"
    },
    gallery: [
      {
        src: "/assets/images/ceilings/ceiling-grid-closeup.jpeg",
        alt: "Close detail of suspended ceiling grid with integrated lighting",
        width: 1080,
        height: 1152,
        caption: "Grid alignment, lighting integration and clean perimeter detailing."
      },
      {
        src: "/assets/images/hero/open-office-suspended-ceiling-overview.jpeg",
        alt: "Bright finished commercial interior with ceiling grid",
        width: 1840,
        height: 1228,
        caption: "A bright, uniform workspace ready for occupation."
      },
      {
        src: "/assets/images/ceilings/exposed-ceiling-framework.jpeg",
        alt: "Exposed ceiling framework before tiles are installed",
        width: 924,
        height: 2000,
        caption: "Ceiling framework set out before final tile installation."
      }
    ],
    scope: [
      "Suspended ceiling grid",
      "Lighting coordination",
      "Ceiling tile installation",
      "Final finish detailing"
    ],
    outcomes: [
      "Bright open-plan workspace",
      "Consistent ceiling lines",
      "Commercial-grade finish"
    ],
    seo: {
      title: "Commercial Office Ceiling Renewal | N&G Partitions",
      description:
        "Suspended ceiling case study for a large commercial office interior."
    }
  },
  {
    title: "SFS Envelope Framework",
    slug: "sfs-envelope-framework",
    eyebrow: "Steel Framing Systems",
    shortDescription:
      "External and internal SFS framing for a multi-storey commercial structure.",
    fullDescription:
      "A technically demanding SFS package showing N&G Partitions' capability across external wall framing, internal stud layouts, structural openings and coordination with surrounding trades.",
    services: ["sfs"],
    location: "UK commercial development",
    status: "ongoing",
    featured: true,
    year: "Recent work",
    heroImage: {
      src: "/assets/images/sfs/StructuralFraming.png",
      alt: "Steel structural framing system inside commercial construction site",
      width: 1381,
      height: 1000,
      role: "hero"
    },
    gallery: [
      {
        src: "/assets/images/sfs/interior-framework-wide.jpeg",
        alt: "Tall internal SFS wall framing inside commercial construction site",
        width: 1126,
        height: 2000,
        caption: "Tall internal framing with clear structural rhythm."
      },
      {
        src: "/assets/images/sfs/stud-framework-interior.jpeg",
        alt: "Interior metal stud framework with service openings",
        width: 1244,
        height: 1496,
        caption: "Openings and stud positions prepared for follow-on trades."
      },
      {
        src: "/assets/images/sfs/mixed-structure-interior.jpeg",
        alt: "Commercial SFS framework with timber backing panels",
        width: 1324,
        height: 1496,
        caption: "Frame interfaces coordinated around structure and backing."
      }
    ],
    scope: [
      "External SFS framing",
      "Internal stud framing",
      "Openings and structural coordination",
      "Interface detailing"
    ],
    outcomes: [
      "Accurate frame setting-out",
      "Robust commercial envelope",
      "Ready for board and finish stages"
    ],
    seo: {
      title: "SFS Envelope Framework | N&G Partitions",
      description: "Steel framing systems case study for commercial construction."
    }
  },
  {
    title: "Glass Partition Office",
    slug: "drylining-corridor-package",
    eyebrow: "Drylining / Partitions",
    shortDescription:
      "Premium glass partition installation delivering open, light-filled commercial interiors.",
    fullDescription:
      "This project demonstrates high-specification glass partition delivery through active construction zones, balancing speed, access, service routes and finish quality across corridor and partition areas.",
    services: ["drylining"],
    location: "Commercial interior",
    status: "ongoing",
    featured: true,
    year: "Recent work",
    heroImage: {
      src: "/assets/images/drylining/GlassPartitionOffice.png",
      alt: "Glass partition corridor in completed commercial office interior",
      width: 1351,
      height: 1000,
      role: "hero"
    },
    gallery: [
      {
        src: "/assets/images/drylining/installed-panels.jpeg",
        alt: "Installed drylining boards on commercial partition wall",
        width: 2048,
        height: 2048,
        caption: "Board installation progressing cleanly across partition walls."
      },
      {
        src: "/assets/images/sfs/stud-framework-interior.jpeg",
        alt: "Metal stud partition framework before drylining board installation",
        width: 1244,
        height: 1496,
        caption: "Stud framework ready for board and service coordination."
      }
    ],
    scope: [
      "Glass partition systems",
      "Metal stud partitions",
      "Board installation",
      "Service opening coordination"
    ],
    outcomes: [
      "Defined circulation routes",
      "Premium glass finish",
      "Efficient follow-on trade access"
    ],
    seo: {
      title: "Glass Partition Office | N&G Partitions",
      description:
        "Glass partition and drylining case study for commercial office interior."
    }
  },
  {
    title: "Acoustic Feature Interior",
    slug: "acoustic-feature-interior",
    eyebrow: "Acoustic Solutions / Fit-Out",
    shortDescription:
      "Feature acoustic treatments shaped around premium public-facing interiors.",
    fullDescription:
      "A refined interior package focused on acoustic control, visual rhythm and calm architectural finishes for commercial reception and circulation spaces.",
    services: ["acoustics", "fit-out"],
    location: "Commercial reception",
    status: "completed",
    featured: true,
    year: "Recent work",
    heroImage: {
      src: "/assets/images/drylining/Drylining.png",
      alt: "Premium boardroom with acoustic wall panels and feature ceiling",
      width: 1170,
      height: 1000,
      role: "hero"
    },
    gallery: [
      {
        src: "/assets/images/hero/wood-slat-corridor.jpeg",
        alt: "Commercial corridor with timber slat ceiling treatment",
        width: 1612,
        height: 1962,
        caption: "Timber slat rhythm used to create a composed public interior."
      },
      {
        src: "/assets/images/acoustics/black-baffle-acoustic-ceiling.jpeg",
        alt: "Black acoustic baffles suspended in a commercial corridor",
        width: 1080,
        height: 1274,
        caption: "Acoustic baffles aligned to the geometry of the corridor."
      }
    ],
    scope: [
      "Acoustic ceiling treatment",
      "Feature interior coordination",
      "Finish interface detailing",
      "Commercial handover"
    ],
    outcomes: [
      "Calmer public-facing environment",
      "Premium architectural finish",
      "Improved spatial definition"
    ],
    seo: {
      title: "Acoustic Feature Interior | N&G Partitions",
      description:
        "Acoustic solutions and feature interior case study by N&G Partitions."
    }
  }
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const featuredProjects = projects.filter((project) => project.featured);
