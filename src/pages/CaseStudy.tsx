import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaArrowLeft, FaDownload, FaExternalLinkAlt } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { getWorkBySlug, isExternalUrl, latestWorks } from "../data/works";

const CaseStudy: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { theme } = useTheme();
  const work = slug ? getWorkBySlug(slug) : undefined;

  if (!work) {
    return <Navigate to="/" replace />;
  }

  const light = theme === "light";
  const fileName = `${work.slug}-screenshot.png`;
  const others = latestWorks.filter((item) => item.slug !== work.slug).slice(0, 3);

  return (
    <article className={`min-h-screen pt-24 pb-20 ${light ? "bg-slate-50 text-slate-900" : "bg-[#0c0c0c] text-white"}`}>
      <Helmet>
        <title>{`${work.title} — Case study | Sourav Suvra`}</title>
        <meta name="description" content={work.description} />
        <link rel="canonical" href={`https://my-personal-blog-ivory.vercel.app/work/${work.slug}`} />
      </Helmet>

      <div className="container mx-auto px-4 max-w-5xl">
        <Link
          to="/#latest-works"
          className={`inline-flex items-center gap-2 text-sm mb-8 ${light ? "text-slate-600 hover:text-slate-900" : "text-slate-300 hover:text-white"}`}
        >
          <FaArrowLeft size={12} />
          All work
        </Link>

        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#FFB800] mb-3">
          {work.category}
        </p>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">{work.title}</h1>
        <p className={`text-lg max-w-3xl mb-8 ${light ? "text-slate-600" : "text-slate-300"}`}>
          {work.description}
        </p>

        <div className="flex flex-wrap gap-3 mb-8">
          <a
            href={work.imageUrl}
            download={fileName}
            className="inline-flex items-center gap-2 rounded-full bg-[#FFB800] px-5 py-2.5 text-sm font-semibold text-black hover:bg-[#ffc933]"
          >
            <FaDownload size={14} />
            Download screenshot
          </a>
          {isExternalUrl(work.link) && (
            <a
              href={work.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold border ${
                light ? "border-slate-300 hover:border-slate-900" : "border-white/20 hover:border-white"
              }`}
            >
              <FaExternalLinkAlt size={12} />
              Visit live site
            </a>
          )}
        </div>

        <figure className={`overflow-hidden rounded-2xl border ${light ? "border-slate-200 bg-white" : "border-white/10 bg-[#141414]"}`}>
          <img src={work.imageUrl} alt={`${work.title} screenshot`} className="w-full h-auto" />
        </figure>

        <dl className="grid sm:grid-cols-3 gap-6 mt-10">
          <div>
            <dt className={`text-xs uppercase tracking-wide ${light ? "text-slate-500" : "text-slate-400"}`}>Role</dt>
            <dd className="mt-1 font-medium">{work.role}</dd>
          </div>
          <div>
            <dt className={`text-xs uppercase tracking-wide ${light ? "text-slate-500" : "text-slate-400"}`}>Stack</dt>
            <dd className="mt-1 font-medium">{work.tags.join(", ")}</dd>
          </div>
          <div>
            <dt className={`text-xs uppercase tracking-wide ${light ? "text-slate-500" : "text-slate-400"}`}>Photo</dt>
            <dd className="mt-1 font-medium">Committed project screenshot</dd>
          </div>
        </dl>

        {others.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-bold mb-4">More work</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {others.map((item) => (
                <Link
                  key={item.slug}
                  to={`/work/${item.slug}`}
                  className={`rounded-xl overflow-hidden border ${light ? "border-slate-200 bg-white" : "border-white/10 bg-[#141414]"}`}
                >
                  <img src={item.imageUrl} alt="" className="h-36 w-full object-cover" />
                  <p className="p-3 text-sm font-semibold">{item.title}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
};

export default CaseStudy;
