import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

type Category = "All" | "Portfolio" | "Landing" | "Dashboard" | "Commerce" | "Blog";

type Template = {
  id: string;
  title: string;
  category: Exclude<Category, "All">;
  price: number;
  desc: string;
  codeSnippet: string;
};

const templates: Template[] = [
  {
    id: "folio-editorial",
    title: "Editorial folio",
    category: "Portfolio",
    price: 0,
    desc: "Serif display, hairline rules, and a work index that reads like a journal.",
    codeSnippet: `export function Hero() {
  return (
    <section className="min-h-screen grid place-items-center px-6">
      <div className="max-w-3xl text-center">
        <p className="text-sm tracking-[0.2em] uppercase text-gray-400">Studio</p>
        <h1 className="mt-4 text-6xl leading-[0.95]">Work that earns the scroll.</h1>
        <a href="#work" className="mt-8 inline-flex h-11 items-center px-5 bg-white text-black">
          View selected work
        </a>
      </div>
    </section>
  );
}`,
  },
  {
    id: "saas-quiet",
    title: "Quiet SaaS landing",
    category: "Landing",
    price: 0,
    desc: "Proof-first landing: one claim, three metrics, one action.",
    codeSnippet: `export function ProofBar() {
  const stats = [
    { k: "12wk", v: "typical engagement" },
    { k: "4", v: "products in market" },
    { k: "UK", v: "timezone overlap" },
  ];
  return (
    <ul className="grid grid-cols-3 border-y border-gray-800">
      {stats.map((s) => (
        <li key={s.k} className="px-6 py-8">
          <div className="text-4xl">{s.k}</div>
          <div className="mt-2 text-sm text-gray-400">{s.v}</div>
        </li>
      ))}
    </ul>
  );
}`,
  },
  {
    id: "ops-console",
    title: "Ops console",
    category: "Dashboard",
    price: 0,
    desc: "Dense but calm admin: tabular numbers, status chips, no chrome noise.",
    codeSnippet: `export function Stat({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-xl border border-gray-800 bg-gray-900 p-5">
      <p className="text-xs uppercase tracking-widest text-gray-400">{label}</p>
      <p className="mt-3 font-mono text-3xl tabular-nums">{value}</p>
    </article>
  );
}`,
  },
  {
    id: "store-grid",
    title: "Store grid",
    category: "Commerce",
    price: 0,
    desc: "Product cards with price, status, and a single buy action.",
    codeSnippet: `export function ProductCard({ name, price }: { name: string; price: string }) {
  return (
    <article>
      <div className="aspect-[4/5] rounded-lg bg-gray-800" />
      <div className="mt-3 flex items-baseline justify-between">
        <h3 className="text-sm">{name}</h3>
        <span className="font-mono text-sm tabular-nums">{price}</span>
      </div>
    </article>
  );
}`,
  },
  {
    id: "essay-blog",
    title: "Essay blog",
    category: "Blog",
    price: 0,
    desc: "Long-form reading measure, footnotes-ready.",
    codeSnippet: `export function Essay({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="mx-auto max-w-[68ch] py-24">
      <h1 className="text-5xl leading-[1.05]">{title}</h1>
      <div className="mt-10 space-y-6 text-lg leading-relaxed text-gray-400">{children}</div>
    </article>
  );
}`,
  },
  {
    id: "agency-index",
    title: "Agency index",
    category: "Portfolio",
    price: 0,
    desc: "Numbered case list with hover reveal of outcome.",
    codeSnippet: `export function CaseRow({ n, title, outcome }: { n: string; title: string; outcome: string }) {
  return (
    <a className="flex items-baseline justify-between gap-6 border-b border-gray-800 py-6">
      <span className="font-mono text-xs text-gray-400">{n}</span>
      <span className="flex-1 text-2xl">{title}</span>
      <span className="hidden text-sm text-gray-400 md:block">{outcome}</span>
    </a>
  );
}`,
  },
  {
    id: "waitlist-launch",
    title: "Waitlist launch",
    category: "Landing",
    price: 49,
    desc: "Single-field capture and a calm path to launch.",
    codeSnippet: `export function Waitlist() {
  return (
    <form className="mx-auto flex max-w-md gap-2">
      <input type="email" required placeholder="Work email" className="h-11 flex-1 rounded-md border px-3" />
      <button type="submit" className="h-11 rounded-md bg-white px-5 text-black">Join</button>
    </form>
  );
}`,
  },
  {
    id: "billing-table",
    title: "Billing table",
    category: "Dashboard",
    price: 89,
    desc: "Invoices, status, and filters an operator can scan.",
    codeSnippet: `export function InvoiceRow({ id, amount, status }: { id: string; amount: string; status: string }) {
  return (
    <tr className="border-b border-gray-800">
      <td className="py-3 font-mono text-xs">{id}</td>
      <td className="py-3 tabular-nums">{amount}</td>
      <td className="py-3 text-sm text-gray-400">{status}</td>
    </tr>
  );
}`,
  },
  {
    id: "product-story",
    title: "Product story",
    category: "Landing",
    price: 0,
    desc: "Feature chapters with a sticky outline and one conversion rail.",
    codeSnippet: `export function Chapter({ kicker, title, body }: { kicker: string; title: string; body: string }) {
  return (
    <section className="grid gap-6 py-20 md:grid-cols-[160px_1fr]">
      <p className="text-xs uppercase tracking-widest text-gray-400">{kicker}</p>
      <div>
        <h2 className="text-4xl">{title}</h2>
        <p className="mt-4 max-w-prose text-gray-400">{body}</p>
      </div>
    </section>
  );
}`,
  },
  {
    id: "journal-index",
    title: "Journal index",
    category: "Blog",
    price: 0,
    desc: "Date, title, reading time. No cards, no thumbnails.",
    codeSnippet: `export function PostRow({ date, title, minutes }: { date: string; title: string; minutes: number }) {
  return (
    <a className="grid grid-cols-[7rem_1fr_auto] items-baseline gap-4 border-b border-gray-800 py-5">
      <time className="font-mono text-xs text-gray-400">{date}</time>
      <span>{title}</span>
      <span className="text-xs text-gray-400">{minutes} min</span>
    </a>
  );
}`,
  },
  {
    id: "checkout-rail",
    title: "Checkout rail",
    category: "Commerce",
    price: 89,
    desc: "Three-step checkout with totals that never hide shipping.",
    codeSnippet: `export function Total({ sub, ship }: { sub: number; ship: number }) {
  return (
    <dl className="space-y-2 text-sm">
      <div className="flex justify-between"><dt>Subtotal</dt><dd className="tabular-nums">{sub}</dd></div>
      <div className="flex justify-between"><dt>Shipping</dt><dd className="tabular-nums">{ship}</dd></div>
      <div className="flex justify-between font-medium"><dt>Total</dt><dd className="tabular-nums">{sub + ship}</dd></div>
    </dl>
  );
}`,
  },
  {
    id: "founder-letter",
    title: "Founder letter",
    category: "Portfolio",
    price: 49,
    desc: "A personal about page that still converts: bio, proof, one ask.",
    codeSnippet: `export function Letter() {
  return (
    <section className="mx-auto max-w-2xl py-24">
      <p className="text-xs uppercase tracking-widest text-gray-400">Note</p>
      <h1 className="mt-3 text-5xl">I build the surfaces people decide on.</h1>
      <p className="mt-6 text-lg leading-relaxed text-gray-400">
        Product engineering for teams who need the interface to carry the business.
      </p>
    </section>
  );
}`,
  },
];

const categories: Category[] = ["All", "Portfolio", "Landing", "Dashboard", "Commerce", "Blog"];

type BlockKind = "hero" | "stats" | "work" | "cta";
type Block = { id: string; kind: BlockKind; label: string };

const BLOCK_CATALOG: Omit<Block, "id">[] = [
  { kind: "hero", label: "Hero" },
  { kind: "stats", label: "Proof bar" },
  { kind: "work", label: "Work index" },
  { kind: "cta", label: "Project CTA" },
];

const BLOCK_CODE: Record<BlockKind, string> = {
  hero: `<section className="min-h-[70vh] grid place-items-center px-6">
  <h1 className="text-6xl">Work that earns the scroll.</h1>
</section>`,
  stats: `<ul className="grid grid-cols-3 border-y">
  <li className="p-6 text-4xl">12wk</li>
  <li className="p-6 text-4xl">4</li>
  <li className="p-6 text-4xl">UK</li>
</ul>`,
  work: `<ol>
  <li className="flex justify-between border-b py-6"><span>01</span><span>MarketFlick AI</span></li>
</ol>`,
  cta: `<section className="py-20 text-center">
  <a href="/#contact" className="inline-flex h-11 items-center px-5 bg-white text-black">Contact Sourav</a>
</section>`,
};

const uid = () => Math.random().toString(36).slice(2, 9);

const TemplateDesigns: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(100);
  const [selected, setSelected] = useState<Template | null>(null);
  const [copied, setCopied] = useState(false);
  const [blocks, setBlocks] = useState<Block[]>([
    { id: uid(), kind: "hero", label: "Hero" },
    { id: uid(), kind: "stats", label: "Proof bar" },
    { id: uid(), kind: "cta", label: "Project CTA" },
  ]);
  const [past, setPast] = useState<Block[][]>([]);
  const [future, setFuture] = useState<Block[][]>([]);
  const [dragId, setDragId] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      templates.filter(
        (t) =>
          (selectedCategory === "All" || t.category === selectedCategory) &&
          t.title.toLowerCase().includes(search.toLowerCase()) &&
          t.price <= maxPrice,
      ),
    [selectedCategory, search, maxPrice],
  );

  const copy = (code: string) => {
    void navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const download = (name: string, code: string) => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}.tsx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const commit = (next: Block[]) => {
    setPast((p) => [...p, blocks].slice(-30));
    setFuture([]);
    setBlocks(next);
  };

  const generated = `export function Page() {\n  return (\n    <main>\n${blocks
    .map((b) => BLOCK_CODE[b.kind])
    .join("\n")
    .split("\n")
    .map((l) => `      ${l}`)
    .join("\n")}\n    </main>\n  );\n}\n`;

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-16 text-white md:px-6">
      <div className="mx-auto max-w-7xl">
        <Link to="/" className="mb-8 inline-flex text-indigo-400 hover:text-indigo-300">
          Home
        </Link>
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold md:text-7xl">Template Designs</h1>
          <p className="text-xl text-gray-400">Production-ready code. Copy, customize, or commission.</p>
        </div>

        <div className="mb-12 flex flex-col gap-6 rounded-3xl bg-gray-900 p-6 lg:flex-row">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search templates"
            className="flex-1 rounded-2xl border border-gray-700 bg-gray-800 px-6 py-4 outline-none"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as Category)}
            className="rounded-2xl border border-gray-700 bg-gray-800 px-6 py-4"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <label className="flex items-center gap-4 text-sm">
            <span className="whitespace-nowrap">Max ${maxPrice}</span>
            <input
              type="range"
              min={0}
              max={100}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </label>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <article key={t.id} className="overflow-hidden rounded-3xl border border-gray-700 bg-gray-900">
              <div className="flex h-40 items-end border-b border-gray-700 bg-gray-800 p-6">
                <span className="text-sm text-gray-400">{t.category}</span>
              </div>
              <div className="p-6">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <h3 className="text-2xl font-semibold">{t.title}</h3>
                  <span className="rounded-full bg-gray-800 px-3 py-1 text-sm">
                    {t.price === 0 ? "Free" : `$${t.price}`}
                  </span>
                </div>
                <p className="mb-6 text-gray-400">{t.desc}</p>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setSelected(t)}
                    className="flex-1 rounded-2xl border border-gray-600 py-3 hover:bg-gray-800"
                  >
                    Preview
                  </button>
                  <button
                    type="button"
                    onClick={() => copy(t.codeSnippet)}
                    className="flex-1 rounded-2xl bg-gray-800 py-3 hover:bg-gray-700"
                  >
                    Copy
                  </button>
                  <a
                    href="/#contact"
                    className="flex-1 rounded-2xl bg-indigo-600 py-3 text-center hover:bg-indigo-500"
                  >
                    Contact
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-24">
          <h2 className="mb-3 text-4xl font-bold">Page builder</h2>
          <p className="mb-8 max-w-xl text-gray-400">
            Drag to reorder. Undo and redo. Copy the generated TSX or download it.
          </p>
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <div className="mb-4 flex flex-wrap gap-2">
                {BLOCK_CATALOG.map((c) => (
                  <button
                    key={c.kind}
                    type="button"
                    onClick={() => commit([...blocks, { id: uid(), kind: c.kind, label: c.label }])}
                    className="rounded-xl border border-gray-700 px-3 py-2 text-sm"
                  >
                    Add {c.label}
                  </button>
                ))}
                <button
                  type="button"
                  disabled={past.length === 0}
                  onClick={() => {
                    const prev = past[past.length - 1];
                    setPast((p) => p.slice(0, -1));
                    setFuture((f) => [blocks, ...f]);
                    setBlocks(prev);
                  }}
                  className="rounded-xl px-3 py-2 text-sm text-gray-400"
                >
                  Undo
                </button>
                <button
                  type="button"
                  disabled={future.length === 0}
                  onClick={() => {
                    const [next, ...rest] = future;
                    setFuture(rest);
                    setPast((p) => [...p, blocks]);
                    setBlocks(next);
                  }}
                  className="rounded-xl px-3 py-2 text-sm text-gray-400"
                >
                  Redo
                </button>
              </div>
              <ul className="space-y-2">
                {blocks.map((b) => (
                  <li
                    key={b.id}
                    draggable
                    onDragStart={() => setDragId(b.id)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      if (!dragId || dragId === b.id) return;
                      const from = blocks.findIndex((x) => x.id === dragId);
                      const to = blocks.findIndex((x) => x.id === b.id);
                      const next = [...blocks];
                      const [moved] = next.splice(from, 1);
                      next.splice(to, 0, moved);
                      commit(next);
                      setDragId(null);
                    }}
                    className="flex items-center justify-between rounded-xl border border-gray-700 bg-gray-900 px-4 py-3"
                  >
                    <span>{b.label}</span>
                    <button
                      type="button"
                      className="text-xs text-gray-400"
                      onClick={() => commit(blocks.filter((x) => x.id !== b.id))}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="mb-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => copy(generated)}
                  className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black"
                >
                  {copied ? "Copied" : "Copy TSX"}
                </button>
                <button
                  type="button"
                  onClick={() => download("page", generated)}
                  className="rounded-xl border border-gray-600 px-4 py-2 text-sm"
                >
                  Download
                </button>
              </div>
              <SyntaxHighlighter language="tsx" style={vscDarkPlus} className="rounded-2xl text-sm">
                {generated}
              </SyntaxHighlighter>
            </div>
          </div>
        </section>

        {selected && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            onClick={() => setSelected(null)}
          >
            <div
              className="max-h-[90vh] w-full max-w-4xl overflow-auto rounded-3xl bg-gray-900 p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="mb-6 text-4xl font-bold">{selected.title}</h2>
              <SyntaxHighlighter language="tsx" style={vscDarkPlus} className="mb-8 rounded-2xl text-sm">
                {selected.codeSnippet}
              </SyntaxHighlighter>
              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => copy(selected.codeSnippet)}
                  className="flex-1 rounded-2xl bg-white py-4 font-semibold text-black"
                >
                  {copied ? "Copied" : "Copy code"}
                </button>
                <button
                  type="button"
                  onClick={() => download(selected.id, selected.codeSnippet)}
                  className="flex-1 rounded-2xl border border-gray-600 py-4"
                >
                  Download
                </button>
                <a
                  href="/#contact"
                  className="flex-1 rounded-2xl bg-indigo-600 py-4 text-center font-semibold"
                >
                  Contact Sourav
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateDesigns;
