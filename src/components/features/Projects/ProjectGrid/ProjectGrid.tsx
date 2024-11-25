import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/data/projects';
import ProjectCard from '../ProjectCard/ProjectCard';
import {
  Container,
  FilterContainer,
  FilterButton,
  Grid
} from './ProjectGrid.styles';

interface ProjectGridProps {
  projects: Project[];
}

type CategoryType = 'all' | 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'other';

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');

  const categories: { value: CategoryType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'fullstack', label: 'Full Stack' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'other', label: 'Other' }
  ];

  const filteredProjects = projects.filter(project => 
    activeCategory === 'all' ? true : project.category === activeCategory
  );

  return (
    <Container>
      <FilterContainer>
        {categories.map(category => (
          <FilterButton
            key={category.value}
            onClick={() => setActiveCategory(category.value)}
            $active={activeCategory === category.value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.label}
          </FilterButton>
        ))}
      </FilterContainer>
      <Grid>
        <AnimatePresence mode="wait">
          {filteredProjects.map(project => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </Grid>
    </Container>
  );
};

export default ProjectGrid;
