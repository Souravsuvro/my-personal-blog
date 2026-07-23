import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const categories = ['All', 'Portfolio', 'Blog', 'E-commerce', 'Dashboard', 'Landing'];

const templates = [
  { id: 1, title: 'Modern Portfolio', category: 'Portfolio', image: '/images/templates/portfolio1.jpg', desc: 'Clean & professional' },
  // Add more...
];

const TemplateDesigns: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  const filtered = templates.filter(t => 
    (selectedCategory === 'All' || t.category === selectedCategory) &&
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl font-bold text-center mb-4">Template Designs</h1>
        <p className="text-center text-gray-400 mb-12">Professional templates crafted for your needs</p>

        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <input type="text" placeholder="Search templates..." value={search} onChange={e => setSearch(e.target.value)} className="flex-1 bg-gray-900 border border-gray-700 rounded-2xl px-6 py-4" />
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-6 py-3 rounded-2xl whitespace-nowrap ${selectedCategory === cat ? 'bg-purple-600' : 'bg-gray-900 border border-gray-700'}`}>{cat}</button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(t => (
            <div key={t.id} className="bg-gray-900 rounded-3xl overflow-hidden border border-gray-700 hover:border-purple-500 transition group">
              <img src={t.image} alt={t.title} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{t.title}</h3>
                <p className="text-gray-400 mb-6">{t.desc}</p>
                <div className="flex gap-4">
                  <button onClick={() => setSelectedTemplate(t)} className="flex-1 py-3 border border-gray-700 rounded-2xl hover:bg-white hover:text-black">Preview</button>
                  <a href="/#contact" className="flex-1 py-3 bg-purple-600 rounded-2xl text-center hover:bg-purple-500">Contact Sourav</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6" onClick={() => setSelectedTemplate(null)}>
          <div className="bg-gray-900 rounded-3xl max-w-4xl w-full p-8" onClick={e => e.stopPropagation()}>
            <img src={selectedTemplate.image} alt="" className="w-full rounded-2xl mb-6" />
            <h2 className="text-4xl font-bold mb-4">{selectedTemplate.title}</h2>
            <a href="/#contact" className="block w-full py-4 bg-purple-600 text-center rounded-2xl text-xl font-semibold">Contact Sourav for Custom Template</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateDesigns;
