import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

const NAV_LINKS: { to: string; label: string; hash?: string }[] = [
  { to: "/", label: "Home" },
  { to: "/#about", label: "About", hash: "about" },
  { to: "/#latest-works", label: "Work", hash: "latest-works" },
  { to: "/templates", label: "Templates" },
  { to: "/games", label: "Games" },
  { to: "/blog", label: "Blog" },
  { to: "/#contact", label: "Contact", hash: "contact" },
];

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const scrollToHash = useCallback((hash: string) => {
    const section = document.getElementById(hash);
    if (!section) return;
    const offset = 80;
    const top = section.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  const handleNav = useCallback(
    (to: string, hash?: string) => {
      setOpen(false);
      if (hash && location.pathname === "/") {
        window.requestAnimationFrame(() => scrollToHash(hash));
      }
    },
    [location.pathname, scrollToHash],
  );

  const linkClass = (to: string) => {
    const active =
      to === "/"
        ? location.pathname === "/"
        : to.startsWith("/#")
          ? false
          : location.pathname === to || location.pathname.startsWith(`${to}/`);
    return `px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
      active ? "text-indigo-400" : "hover:text-indigo-400"
    }`;
  };

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "py-2 glassmorphism" : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-3"
            onClick={() => handleNav("/")}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-900 text-lg font-semibold text-white shadow-lg">
              S
            </span>
            <span className="hidden sm:block">
              <span className="block text-base font-semibold">Sourav Sarker</span>
              <span className="block text-xs text-gray-400">Product engineer</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 desktop:flex">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={linkClass(item.to)}
                onClick={() => handleNav(item.to, item.hash)}
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={toggleTheme}
              className="ml-2 inline-flex h-11 w-11 items-center justify-center rounded-lg"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
            </button>
          </div>

          <div className="flex items-center gap-1 desktop:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
            </button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span className="relative block h-5 w-5">
                <span
                  className={`absolute left-0 h-0.5 w-5 bg-current transition-transform duration-200 ${
                    open ? "top-2 rotate-45" : "top-1"
                  }`}
                />
                <span
                  className={`absolute left-0 top-2 h-0.5 w-5 bg-current transition-opacity duration-150 ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 h-0.5 w-5 bg-current transition-transform duration-200 ${
                    open ? "top-2 -rotate-45" : "top-4"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="desktop:hidden fixed inset-0 top-[64px] z-40 bg-black/80 backdrop-blur-xl"
            onClick={() => setOpen(false)}
          >
            <motion.nav
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="flex min-h-[calc(100vh-64px)] flex-col items-stretch gap-2 px-6 py-10"
              onClick={(e) => e.stopPropagation()}
            >
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex h-12 items-center rounded-xl px-4 text-lg font-medium hover:bg-white/10"
                  onClick={() => handleNav(item.to, item.hash)}
                >
                  {item.label}
                </Link>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
