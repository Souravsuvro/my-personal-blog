import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { experiences } from '../../data';
import {
  ExperienceSection,
  ExperienceContainer,
  SectionTitle,
  Timeline,
  TimelineItem,
  TimelineContent,
  JobTitle,
  Company,
  Duration,
  Location,
  Description,
  AchievementsList,
  Achievement,
} from './Experience.styles';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const Experience: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <ExperienceSection id="experience">
      <ExperienceContainer>
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Professional Experience
        </SectionTitle>
        <Timeline>
          <motion.div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: 'var(--accent)',
              transformOrigin: '0%',
              scaleX,
            }}
          />
          {experiences?.map((experience, index) => (
            <TimelineItem
              key={index}
              isEven={index % 2 === 0}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <TimelineContent isEven={index % 2 === 0}>
                <JobTitle>{experience.title}</JobTitle>
                <Company>{experience.company}</Company>
                <Duration>{experience.duration}</Duration>
                <Location>{experience.location}</Location>
                <Description>{experience.description}</Description>
                {experience.achievements && (
                  <AchievementsList>
                    {experience.achievements.map((achievement, achievementIndex) => (
                      <Achievement key={achievementIndex}>
                        {achievement}
                      </Achievement>
                    ))}
                  </AchievementsList>
                )}
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </ExperienceContainer>
    </ExperienceSection>
  );
};

export default Experience;
