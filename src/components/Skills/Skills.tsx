import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaCode,
  FaStar,
  FaChevronRight,
  FaLaptopCode,
  FaPalette,
  FaFilm,
  FaLightbulb
} from 'react-icons/fa';
import { skills } from '../../data';
import SectionTitle from '../shared/SectionTitle';

const SkillsSection = styled.section`
  min-height: 100vh;
  padding: clamp(3rem, 5vw, 5rem) 0;
  background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: var(--container-width);
  width: 100%;
  margin: 0 auto;
  padding: 0 var(--space-xl);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 var(--space-md);
  }
`;

const CategoryNav = styled(motion.nav)`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  padding: 0 1rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const CategoryButton = styled(motion.button)<{ active: boolean }>`
  background: none;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: clamp(0.875rem, 1.5vw, 1rem);
  color: ${({ active }) => active ? 'var(--primary)' : 'var(--text-secondary)'};
  position: relative;
  cursor: pointer;
  transition: color 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: ${({ active }) => active ? '100%' : '0'};
    height: 2px;
    background: var(--primary);
    transform: translateX(-50%);
    transition: width 0.3s ease;
  }

  &:hover::before {
    width: 100%;
  }
`;

const SkillsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 3rem auto;
  padding: 0 1rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const SkillItem = styled(motion.div)`
  position: relative;
  padding: 2rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  cursor: pointer;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);

  &:hover {
    transform: translateZ(20px) rotateX(10deg);
  }
`;

const SkillContent = styled.div`
  position: relative;
  z-index: 1;
`;

const SkillIcon = styled(motion.div)`
  font-size: 2.5rem;
  color: var(--primary);
  margin-bottom: 1rem;
  display: inline-block;
`;

const SkillName = styled.h3`
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  margin-bottom: 0.5rem;
  color: var(--text-primary);
  font-weight: 600;
`;

const SkillBar = styled(motion.div)<{ $level: number }>`
  width: 100%;
  height: 6px;
  background: var(--background);
  border-radius: 3px;
  margin: 0.5rem 0;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${props => (props.$level / 5) * 100}%;
    background: var(--primary);
    border-radius: 3px;
  }
`;

const SkillTags = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const SkillTag = styled(motion.span)`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  background: rgba(var(--primary-rgb), 0.1);
  color: var(--primary);
  font-size: 0.875rem;
  white-space: nowrap;
  transition: all 0.3s ease;

  &:hover {
    background: var(--primary);
    color: white;
    transform: translateY(-2px);
  }
`;

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Web Development':
      return <FaLaptopCode />;
    case 'Design Tools':
      return <FaPalette />;
    case 'Video & Animation':
      return <FaFilm />;
    default:
      return <FaCode />;
  }
};

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Web Development');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const categories = ['Web Development', 'Design Tools', 'Video & Animation'] as const;

  // Get exactly 6 skills for the active category
  const filteredSkills = skills
    .filter(skill => skill.category === activeCategory)
    .slice(0, 6);

  console.log('Number of filtered skills:', filteredSkills.length); // Debug log

  return (
    <SkillsSection id="skills">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle>Tech Stack</SectionTitle>
          <p>Crafting digital experiences with modern tools and technologies</p>
        </motion.div>

        <CategoryNav
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <CategoryButton
              key={category}
              active={category === activeCategory}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </CategoryButton>
          ))}
        </CategoryNav>

        <AnimatePresence mode="wait">
          <SkillsContainer
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {filteredSkills.map((skill, index) => (
              <SkillItem
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedSkill(skill.name)}
                whileHover={{
                  boxShadow: '0 10px 30px -10px rgba(var(--primary-rgb), 0.2)',
                }}
              >
                <SkillContent>
                  <SkillIcon
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: index * 0.1 }}
                  >
                    {getCategoryIcon(skill.category)}
                  </SkillIcon>
                  <SkillName>{skill.name}</SkillName>
                  
                  <SkillBar
                    $level={skill.level}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />

                  {skill.description && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}
                    >
                      {skill.description}
                    </motion.p>
                  )}

                  {skill.relatedSkills && (
                    <SkillTags>
                      {skill.relatedSkills.map((tag, i) => (
                        <SkillTag
                          key={tag}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + (i * 0.1) }}
                        >
                          {tag}
                        </SkillTag>
                      ))}
                    </SkillTags>
                  )}
                </SkillContent>
              </SkillItem>
            ))}
          </SkillsContainer>
        </AnimatePresence>
      </Container>
    </SkillsSection>
  );
};

export default Skills;
