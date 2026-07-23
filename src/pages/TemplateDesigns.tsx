import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Editor from '@monaco-editor/react';

const ItemTypes = { COMPONENT: 'component' };

const templates = [
  {
    id: 1,
    title: 'Modern Portfolio',
    category: 'Portfolio',
    price: 49,
    codeSnippet: `export const Hero = () => (
  <section className="min-h-screen flex items-center bg-gradient-to-br from-gray-950 to-black">
    <div className="max-w-4xl mx-auto px-6 text-center">
      <h1 className="text-7xl font-bold mb-6">Hi, I'm Sourav</h1>
      <p className="text-2xl text-gray-400 mb-12">Full Stack Developer</p>
    </div>
  </section>
);`,
    desc: 'Clean minimalist portfolio.'
  },
  {
    id: 2,
    title: 'Blog Hub',
    category: 'Blog',
    price: 39,
    codeSnippet: `const BlogPost = ({ post }) => (
  <article className="prose dark:prose-invert">
    <h1>{post.title}</h1>
  </article>
);`,
    desc: 'Elegant blog template.'
  },
  {
    id: 3,
    title: 'E-commerce Store',
    category: 'E-commerce',
    price: 79,
    codeSnippet: `const ProductCard = ({ product }) => (
  <div className="border rounded-2xl p-6">
    <h3>{product.name}</h3>
    <p>${product.price}</p>
  </div>
);`,
    desc: 'Full-featured store.'
  },
  {
    id: 4,
    title: 'Admin Dashboard',
    category: 'Dashboard',
    price: 59,
    codeSnippet: `const StatsCard = ({ title, value }) => (
  <div className="bg-gray-900 p-6 rounded-2xl">
    <div>{title}</div>
    <div className="text-4xl">{value}</div>
  </div>
);`,
    desc: 'Analytics dashboard.'
  },
  {
    id: 5,
    title: 'SaaS Landing',
    category: 'Landing',
    price: 69,
    codeSnippet: `const Hero = () => (
  <section className="py-24 text-center">
    <h1>The Future of Productivity</h1>
  </section>
);`,
    desc: 'High-converting landing.'
  },
  {
    id: 6,
    title: 'Agency Website',
    category: 'Portfolio',
    price: 55,
    codeSnippet: `// Agency Template`,
    desc: 'Creative agency site.'
  },
  // Add 4-5 more...
];

export default TemplateDesigns;

const DraggableComponent = ({ name, index, moveComponent }: any) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.COMPONENT,
    item: { index },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  }));

  return (
    <div ref={drag} className={`bg-gray-800 p-4 rounded-xl cursor-grab mb-3 ${isDragging ? 'opacity-50' : ''}`}>
      {name}
    </div>
  );
};

const DropZone = ({ children, onDrop, moveComponent }: any) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.COMPONENT,
    drop: (item) => onDrop(item),
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  }));

  return (
    <div ref={drop} className={`min-h-[400px] border-2 border-dashed border-gray-700 rounded-2xl p-8 transition ${isOver ? 'border-purple-500 bg-gray-900/50' : ''}`}>
      {children}
    </div>
  );
};

const TemplateDesigns: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [builderComponents, setBuilderComponents] = useState<string[]>([]);
  const [customCode, setCustomCode] = useState('');

  const filteredTemplates = useMemo(() => 
    templates.filter(t => 
      (selectedCategory === 'All' || t.category === selectedCategory) &&
      t.title.toLowerCase().includes(search.toLowerCase()) &&
      t.price >= priceRange[0] && t.price <= priceRange[1]
    ), [selectedCategory, search, priceRange]
  );

  const addComponent = (item: any) => setBuilderComponents(prev => [...prev, item.name]);

  const moveComponent = (dragIndex: number, hoverIndex: number) => {
    const newComponents = [...builderComponents];
    const [dragged] = newComponents.splice(dragIndex, 1);
    newComponents.splice(hoverIndex, 0, dragged);
    setBuilderComponents(newComponents);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-950 text-white py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Filters & Grid with "Build" button on each card */}

          {selectedTemplate && (
            <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
              <div className="bg-gray-900 rounded-3xl w-full max-w-7xl h-[95vh] flex flex-col">
                <div className="p-6 border-b flex justify-between">
                  <h2 className="text-3xl font-bold">Builder: {selectedTemplate.title}</h2>
                  <button onClick={() => setSelectedTemplate(null)}>Close</button>
                </div>
                <div className="flex flex-1 overflow-hidden">
                  <div className="w-72 border-r border-gray-700 p-6 overflow-auto bg-gray-950">
                    <h3 className="font-semibold mb-4">Components</h3>
                    <DraggableComponent name="Hero" index={-1} moveComponent={moveComponent} />
                    <DraggableComponent name="Navbar" index={-1} moveComponent={moveComponent} />
                  </div>
                  <div className="flex-1 p-6 overflow-auto">
                    <DropZone onDrop={addComponent} moveComponent={moveComponent}>
                      {builderComponents.map((comp, i) => (
                        <DraggableComponent key={i} name={comp} index={i} moveComponent={moveComponent} />
                      ))}
                    </DropZone>
                  </div>
                  <div className="w-1/3 border-l border-gray-700 flex flex-col">
                    <Editor height="100%" defaultLanguage="tsx" value={customCode} onChange={setCustomCode} theme="vs-dark" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  );
};

export default TemplateDesigns;
