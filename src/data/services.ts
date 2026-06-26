export type ServiceImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Service = {
  title: string;
  slug: string;
  eyebrow: string;
  summary: string;
  overview: string;
  heroImage: ServiceImage;
  gallery: ServiceImage[];
  capabilities: string[];
  applications: string[];
  quality: string[];
};

export const services: Service[] = [
  {
    title: "Steel Framing Systems",
    slug: "steel-framing-systems",
    eyebrow: "SFS",
    summary: "Light gauge steel framing for robust commercial envelopes and internal structures.",
    overview:
      "N&G Partitions delivers SFS packages with a focus on accurate setting-out, interface control and practical coordination between structure, envelope, openings and follow-on trades.",
    heroImage: {
      src: "/assets/images/sfs/exterior-framework.webp",
      alt: "External steel framing system on a multi-storey commercial building",
      width: 1126,
      height: 2000
    },
    gallery: [
      {
        src: "/assets/images/sfs/interior-framework-wide.webp",
        alt: "Tall internal SFS frame inside a commercial construction site",
        width: 1126,
        height: 2000
      },
      {
        src: "/assets/images/sfs/stud-framework-interior.webp",
        alt: "Interior metal stud framework with service openings",
        width: 1244,
        height: 1496
      },
      {
        src: "/assets/images/sfs/mixed-structure-interior.webp",
        alt: "Commercial SFS and timber-backed partition framework",
        width: 1324,
        height: 1496
      }
    ],
    capabilities: [
      "External wall framing",
      "Internal SFS partitions",
      "Openings and structural interfaces",
      "Deflection head details",
      "Board-ready frame preparation",
      "Coordination with envelope systems"
    ],
    applications: [
      "Multi-storey commercial buildings",
      "Education and healthcare facilities",
      "Retail and hospitality shells",
      "Office refurbishments",
      "High-performance envelope packages"
    ],
    quality: [
      "Precise frame alignment",
      "Clean interface coordination",
      "Progressive quality checks",
      "Ready access for follow-on trades"
    ]
  },
  {
    title: "Drylining & Partitions",
    slug: "drylining-partitions",
    eyebrow: "Drylining",
    summary: "Commercial partitioning and drylining delivered with clean lines and reliable programme control.",
    overview:
      "From corridor packages to large interior layouts, N&G Partitions creates defined spaces with efficient metal stud systems, board installation and careful service coordination.",
    heroImage: {
      src: "/assets/images/drylining/corridor-construction.webp",
      alt: "Drylined commercial corridor under construction with service runs above",
      width: 900,
      height: 1600
    },
    gallery: [
      {
        src: "/assets/images/drylining/installed-panels.webp",
        alt: "Installed drylining panels on a commercial partition wall",
        width: 2048,
        height: 2048
      },
      {
        src: "/assets/images/sfs/stud-framework-interior.webp",
        alt: "Metal stud partition framework before board installation",
        width: 1244,
        height: 1496
      }
    ],
    capabilities: [
      "Metal stud partitions",
      "Plasterboard lining systems",
      "Shaftwall and corridor packages",
      "Service opening coordination",
      "Fire and acoustic-rated partitions",
      "Jointing preparation"
    ],
    applications: [
      "Office layouts",
      "Commercial corridors",
      "Education spaces",
      "Healthcare interiors",
      "Back-of-house areas"
    ],
    quality: [
      "Straight partitions and clean junctions",
      "Coordinated access panels and services",
      "Controlled board installation",
      "Finish-ready surfaces"
    ]
  },
  {
    title: "Suspended Ceilings",
    slug: "suspended-ceilings",
    eyebrow: "Ceilings",
    summary: "Grid, tile and feature ceiling packages that bring commercial interiors into sharp focus.",
    overview:
      "N&G Partitions installs suspended ceilings with careful attention to grid alignment, lighting coordination, perimeter detail and the finished rhythm of the room.",
    heroImage: {
      src: "/assets/images/ceilings/open-office-wide.webp",
      alt: "Large completed open-plan commercial office with suspended ceiling grid",
      width: 2048,
      height: 1405
    },
    gallery: [
      {
        src: "/assets/images/ceilings/ceiling-grid-closeup.webp",
        alt: "Close detail of suspended ceiling grid with integrated lights",
        width: 1080,
        height: 1152
      },
      {
        src: "/assets/images/ceilings/exposed-ceiling-framework.webp",
        alt: "Exposed ceiling framework before tile installation",
        width: 924,
        height: 2000
      },
      {
        src: "/assets/images/hero/open-office-suspended-ceiling-overview.webp",
        alt: "Bright commercial open-plan office with finished ceiling",
        width: 1840,
        height: 1228
      }
    ],
    capabilities: [
      "Lay-in ceiling grids",
      "Ceiling tile installation",
      "Bulkheads and perimeter details",
      "Lighting and services coordination",
      "Access panel integration",
      "Feature ceiling interfaces"
    ],
    applications: [
      "Open-plan offices",
      "Reception areas",
      "Retail units",
      "Education facilities",
      "Healthcare and public buildings"
    ],
    quality: [
      "Consistent ceiling lines",
      "Coordinated light and grille positions",
      "Clean perimeter trims",
      "Bright, professional finish"
    ]
  },
  {
    title: "Acoustic Solutions",
    slug: "acoustic-solutions",
    eyebrow: "Acoustics",
    summary: "Acoustic ceilings, baffles and interior treatments for calm, controlled commercial spaces.",
    overview:
      "From acoustic feature ceilings to partition build-ups, N&G Partitions helps shape interiors that look composed and perform for the people using them every day.",
    heroImage: {
      src: "/assets/images/acoustics/black-baffle-acoustic-ceiling.webp",
      alt: "Black acoustic baffle ceiling in a commercial corridor",
      width: 1080,
      height: 1274
    },
    gallery: [
      {
        src: "/assets/images/hero/wood-slat-corridor.webp",
        alt: "Commercial corridor with timber slat ceiling treatment",
        width: 1612,
        height: 1962
      },
      {
        src: "/assets/images/hero/lobby-reception.webp",
        alt: "Premium lobby interior with feature wall and linear lighting",
        width: 1254,
        height: 836
      }
    ],
    capabilities: [
      "Acoustic ceiling treatments",
      "Baffle and raft coordination",
      "Acoustic-rated partitions",
      "Feature wall interfaces",
      "Performance-led detailing",
      "Commercial finish coordination"
    ],
    applications: [
      "Reception spaces",
      "Workplace collaboration zones",
      "Education interiors",
      "Healthcare circulation areas",
      "Hospitality and amenity spaces"
    ],
    quality: [
      "Balanced visual rhythm",
      "Careful set-out of feature elements",
      "Performance-aware partition build-ups",
      "Composed finished spaces"
    ]
  }
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}






