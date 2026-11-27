export interface Work {
  id: number;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  githubLink?: string;
  category: string;
  tags: string[];
  role: string;
}

export const latestWorks: Work[] = [
  {
    id: 1,
    slug: "finance-app-dashboard",
    title: "Finance App Dashboard",
    description:
      "A modern finance dashboard with real-time analytics, transaction monitoring, and expense tracking capabilities.",
    imageUrl: "/images/latestwork/finance-app-dashboard.png",
    link: "https://personal-finance-app-navy.vercel.app/",
    category: "Dashboard",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    role: "Interface design and front-end build",
  },
  {
    id: 2,
    slug: "doctor-appointment-system",
    title: "Doctor Appointment System",
    description:
      "Admin dashboard for a healthcare platform, enabling efficient management of appointments, patient records, and schedules.",
    imageUrl: "/images/latestwork/doctor-appointment-admin-dashboard-web-design.png",
    link: "",
    category: "Healthcare",
    tags: ["React", "Material-UI", "Node.js"],
    role: "Admin dashboard design",
  },
  {
    id: 3,
    slug: "ecommerce-platform",
    title: "E-commerce Platform",
    description:
      "Feature-rich e-commerce platform with a modern design, focusing on user experience and conversion optimization.",
    imageUrl: "/images/latestwork/ecommerce-design.png",
    link: "",
    category: "E-commerce",
    tags: ["Next.js", "Tailwind CSS", "Stripe"],
    role: "Storefront and checkout interface",
  },
  {
    id: 4,
    slug: "finance-app-landing",
    title: "Finance App Landing",
    description:
      "Engaging landing page for a financial technology application, highlighting key features and benefits.",
    imageUrl: "/images/latestwork/finance-app-landing.png",
    link: "",
    category: "Landing Page",
    tags: ["React", "GSAP", "Styled Components"],
    role: "Marketing landing page",
  },
  {
    id: 5,
    slug: "money-transfer-platform",
    title: "Money Transfer Platform",
    description:
      "Secure and user-friendly money transfer platform with international payment capabilities and real-time exchange rates.",
    imageUrl: "/images/latestwork/money-ransfer-web-design.png",
    link: "https://www.hamadaninternational.co.uk/",
    category: "FinTech",
    tags: ["Laravel", "Bootstrap", "PHP"],
    role: "Product website",
  },
  {
    id: 6,
    slug: "quantum-leaps",
    title: "Quantum Leaps",
    description:
      "Educational platform interface designed to make complex quantum computing concepts accessible and engaging.",
    imageUrl: "/images/latestwork/quantam-leaps.png",
    link: "https://quantum-leap-site.vercel.app/",
    category: "Education",
    tags: ["React JS", "Tailwind CSS", "Node JS"],
    role: "Learning interface",
  },
  {
    id: 7,
    slug: "marketflick-ai",
    title: "MarketFlick AI Landing Page",
    description:
      "A modern, responsive landing page for MarketFlick AI platform, featuring a clean design with interactive elements and smooth animations.",
    imageUrl: "/images/latestwork/marketflickai-landing-page-design.png",
    link: "https://market-flick-landing.vercel.app/",
    category: "Web Design",
    tags: ["React", "TailwindCSS", "TypeScript", "Framer Motion"],
    role: "Landing page",
  },
];

export function getWorkBySlug(slug: string): Work | undefined {
  return latestWorks.find((work) => work.slug === slug);
}

export function isExternalUrl(url: string | undefined): url is string {
  return Boolean(url && /^https?:\/\//i.test(url));
}
