import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { TwitterShareButton, FacebookShareButton, LinkedinShareButton, WhatsappShareButton } from 'react-share';
import { TwitterIcon, FacebookIcon, LinkedinIcon, WhatsappIcon } from 'react-share';

const categories = ['All', 'Portfolio', 'Blog', 'E-commerce', 'Dashboard', 'Landing'];

const templates = [
  {
    id: 1,
    title: 'Modern Portfolio',
    category: 'Portfolio',
    price: 49,
    codeSnippet: `// Modern Portfolio Hero
export const Hero = () => (
  <section className="min-h-screen flex items-center bg-gradient-to-br from-gray-950 to-black">
    <div className="max-w-4xl mx-auto px-6 text-center">
      <h1 className="text-7xl font-bold mb-6">Hi, I'm Sourav</h1>
      <p className="text-2xl text-gray-400 mb-12">Full Stack Developer & Designer</p>
      <div className="flex gap-4 justify-center">
        <a href="#projects" className="px-10 py-4 bg-white text-black rounded-2xl font-semibold">View Work</a>
        <a href="#contact" className="px-10 py-4 border border-white rounded-2xl">Hire Me</a>
      </div>
    </div>
  </section>
);`,
    desc: 'Clean minimalist portfolio with smooth animations.'
  },
  {
    id: 2,
    title: 'Blog Hub',
    category: 'Blog',
    price: 39,
    codeSnippet: `// Blog Post Component
const BlogPost = ({ post }) => (
  <article className="prose dark:prose-invert max-w-none">
    <h1>{post.title}</h1>
    <div dangerouslySetInnerHTML={{ __html: post.content }} />
  </article>
);`,
    desc: 'Elegant blog with dark mode and syntax highlighting.'
  },
  {
    id: 3,
    title: 'E-commerce Store',
    category: 'E-commerce',
    price: 79,
    codeSnippet: `// Product Card
const ProductCard = ({ product }) => (
  <div className="border rounded-2xl overflow-hidden">
    <img src={product.image} alt={product.name} />
    <div className="p-6">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button>Add to Cart</button>
    </div>
  </div>
);`,
    desc: 'Full-featured store with cart and checkout.'
  },
  {
    id: 4,
    title: 'Admin Dashboard',
    category: 'Dashboard',
    price: 59,
    codeSnippet: `// Dashboard Stats
const StatsCard = ({ title, value }) => (
  <div className="bg-gray-900 p-6 rounded-2xl">
    <div className="text-sm text-gray-400">{title}</div>
    <div className="text-4xl font-bold mt-2">{value}</div>
  </div>
);`,
    desc: 'Analytics dashboard with charts and tables.'
  },
  {
    id: 5,
    title: 'SaaS Landing',
    category: 'Landing',
    price: 69,
    codeSnippet: `// Hero Section
<section className="py-24 text-center">
  <h1 className="text-6xl font-bold">The Future of Productivity</h1>
  <p className="mt-6 text-xl">Start free today.</p>
</section>;`,
    desc: 'High-converting SaaS landing page.'
  }
];

const TemplateDesigns: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  const filteredTemplates = useMemo(() => 
    templates.filter(t => 
      (selectedCategory === 'All' || t.category === selectedCategory) &&
      t.title.toLowerCase().includes(search.toLowerCase()) &&
      t.price >= priceRange[0] && t.price <= priceRange[1]
    ), [selectedCategory, search, priceRange]
  );

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white py-12 md:py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 text-lg">← Home</Link>
        
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">Template Designs</h1>
          <p className="text-xl text-gray-400">Production-ready code snippets. Copy & customize instantly.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12 bg-gray-900 p-6 rounded-3xl">
          <input 
            type="text" 
            placeholder="Search templates..." 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            className="flex-1 bg-gray-800 border border-gray-700 rounded-2xl px-6 py-4 focus:outline-none focus:border-purple-500" 
          />
          
          <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="bg-gray-800 border border-gray-700 rounded-2xl px-6 py-4">
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <div className="flex items-center gap-4 min-w-[200px]">
            <span className="text-sm whitespace-nowrap">Price: ${priceRange[0]} - ${priceRange[1]}</span>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={priceRange[1]} 
              onChange={e => setPriceRange([priceRange[0], +e.target.value])} 
              className="flex-1 accent-purple-500" 
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map(t => (
            <div key={t.id} className="bg-gray-900 border border-gray-700 rounded-3xl overflow-hidden group hover:border-purple-500 transition-all">
              <div className="h-64 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-6xl border-b border-gray-700">
                {t.category[0]}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-semibold">{t.title}</h3>
                  <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">${t.price}</span>
                </div>
                <p className="text-gray-400 mb-6 line-clamp-3">{t.desc}</p>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => setSelectedTemplate(t)} 
                    className="flex-1 py-3 border border-gray-600 rounded-2xl hover:bg-gray-800 transition"
                  >
                    Preview Code
                  </button>
                  <button 
                    onClick={() => copyToClipboard(t.codeSnippet)} 
                    className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 rounded-2xl"
                  >
                    Copy Code
                  </button>
                  <a href="/#contact" className="flex-1 py-3 bg-purple-600 hover:bg-purple-500 rounded-2xl text-center">Contact</a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Preview Modal */}
        {selectedTemplate && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4" onClick={() => setSelectedTemplate(null)}>
            <div className="bg-gray-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-auto" onClick={e => e.stopPropagation()}>
              <div className="p-8">
                <h2 className="text-4xl font-bold mb-6">{selectedTemplate.title}</h2>
                <pre className="bg-gray-950 p-8 rounded-2xl overflow-auto text-sm mb-8 font-mono whitespace-pre-wrap">{selectedTemplate.codeSnippet}</pre>
                <div className="flex gap-4">
                  <button onClick={() => copyToClipboard(selectedTemplate.codeSnippet)} className="flex-1 py-4 bg-white text-black rounded-2xl font-semibold">Copy Full Code</button>
                  <a href="/#contact" className="flex-1 py-4 bg-purple-600 text-center rounded-2xl font-semibold">Contact Sourav</a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateDesigns;
