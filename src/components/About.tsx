import React, { FC, useState, JSX } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { 
  FaMountain, 
  FaChess, 
  FaAward,
  FaNetworkWired,
  FaGlobeAmericas,
  FaLaptopCode,
  FaPalette,
  FaBook, 
  FaCertificate, 
  FaBrain
} from 'react-icons/fa';
import { 
  SiReact, 
  SiTypescript
} from 'react-icons/si';

// Responsive Card Wrapper with enhanced animations
const ResponsiveCard: FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div 
    className="bg-white dark:bg-[#121827] rounded-3xl p-6 md:p-8 
    shadow-lg hover:shadow-2xl
    transform transition-all duration-500 hover:scale-[1.02] 
    border border-gray-100/20 dark:border-[#1E2433]
    backdrop-filter backdrop-blur-sm
    relative overflow-hidden"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
    }}
  >
    <motion.div 
      className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-primary/10 to-transparent rounded-full"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    {children}
  </motion.div>
);

// Professional Stats Widget with improved visualization
const ProfessionalStatsWidget: FC = () => {
  const professionalSkills = [
    { 
      name: 'React', 
      level: 90, 
      color: 'from-cyan-500 to-blue-500', 
      description: 'Enterprise-grade frontend development',
      icon: <SiReact className="text-cyan-500" />
    },
    { 
      name: 'Node.js', 
      level: 85, 
      color: 'from-green-500 to-emerald-600', 
      description: 'Scalable backend solutions',
      icon: <FaAward className="text-green-500" />
    },
    { 
      name: 'TypeScript', 
      level: 88, 
      color: 'from-blue-500 to-indigo-600', 
      description: 'Type-safe, robust architecture',
      icon: <SiTypescript className="text-blue-500" />
    }
  ];

  return (
    <ResponsiveCard>
      <motion.div 
        className="flex items-center mb-6"
        initial={{ x: -20 }}
        animate={{ x: 0 }}
      >
        <div className="p-3 bg-blue-500/10 rounded-xl mr-4">
          <FaNetworkWired className="text-2xl text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
          Technical Proficiency
        </h3>
      </motion.div>
      <div className="space-y-6">
        {professionalSkills.map((skill, index) => (
          <motion.div 
            key={skill.name} 
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                {skill.icon}
                <span className="text-base font-semibold text-gray-700 dark:text-gray-300">
                  {skill.name}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {skill.level}%
              </span>
            </div>
            <div className="relative">
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div 
                  className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
              </div>
              <motion.p 
                className="mt-1 text-sm text-gray-500 dark:text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.3 }}
              >
                {skill.description}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </ResponsiveCard>
  );
};

// About Me Widget with enhanced visual hierarchy
const AboutMeWidget: FC = () => {
  return (
    <ResponsiveCard>
      <motion.div 
        className="flex items-center mb-6"
        initial={{ x: -20 }}
        animate={{ x: 0 }}
      >
        <div className="p-3 bg-indigo-500/10 rounded-xl mr-4">
          <FaLaptopCode className="text-2xl text-indigo-600" />
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
          Professional Vision
        </h3>
      </motion.div>
      <motion.p 
        className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Strategic technology leader specializing in transformative digital solutions. 
        With a proven track record of delivering high-impact, scalable architectures 
        that drive business innovation and technological excellence.
      </motion.p>
      <motion.div 
        className="grid grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {[
          { icon: <SiReact />, text: "React", color: "text-cyan-500" },
          { icon: <SiTypescript />, text: "TypeScript", color: "text-blue-600" },
          { icon: <FaAward />, text: "Node.js", color: "text-green-600" }
        ].map((item, index) => (
          <motion.div 
            key={item.text}
            className="flex flex-col items-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50
              hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className={`text-2xl ${item.color} mb-2`}>{item.icon}</span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {item.text}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </ResponsiveCard>
  );
};

// Hobby Exploration Widget
type HobbyType = 'mountain' | 'travelling' | 'chess' | 'art';

type HobbyStats = {
  [key: string]: number | string;
};

interface HobbyData {
  icon: JSX.Element;
  title: string;
  description: string;
  achievements: string[];
  stats: HobbyStats;
}

const HobbyExplorationWidget: FC = () => {
  const [activeHobby, setActiveHobby] = useState<HobbyType>('mountain');

  const hobbyData: Record<HobbyType, HobbyData> = {
    mountain: {
      icon: <FaMountain className="text-4xl text-green-600" />,
      title: "Mountain Exploration",
      description: "Passionate about conquering challenging mountain trails and experiencing nature's raw beauty.",
      achievements: [
        "Completed 5 major mountain treks",
        "Explored trails in Himalayas and Andes",
        "Developed advanced hiking and survival skills"
      ],
      stats: {
        treksCompleted: 5,
        countriesExplored: 3,
        totalHikingHours: 240
      }
    },
    travelling: {
      icon: <FaGlobeAmericas className="text-4xl text-blue-600" />,
      title: "Nature Photography Travels",
      description: "Capturing the essence of landscapes and cultures through the lens of a camera.",
      achievements: [
        "Photographed in 12 different countries",
        "Published in travel photography magazines",
        "Created a personal travel photography portfolio"
      ],
      stats: {
        countriesVisited: 12,
        photosShotProfessionally: 500,
        travelBlogFollowers: 2500
      }
    },
    chess: {
      icon: <FaChess className="text-4xl text-purple-600" />,
      title: "Online Chess Mastery",
      description: "Strategic thinker who finds joy in the intellectual challenge of chess.",
      achievements: [
        "Reached top 5% on Chess.com",
        "Participated in online international tournaments",
        "Continuously improving tactical skills"
      ],
      stats: {
        onlineRating: 1850,
        tournamentParticipations: 15,
        winRate: "68%"
      }
    },
    art: {
      icon: <FaPalette className="text-4xl text-red-600" />,
      title: "Digital & Traditional Art",
      description: "Expressing creativity through both traditional sketching and digital illustration.",
      achievements: [
        "Proficient in Adobe Illustrator",
        "Created digital art series",
        "Participated in local art exhibitions"
      ],
      stats: {
        digitalProjectsCompleted: 30,
        traditionalSketchbooks: 12,
        artStylesDeveloped: 4
      }
    }
  };

  const handleHobbyClick = (hobby: HobbyType) => {
    console.log('Clicked hobby:', hobby);  // Debug log
    setActiveHobby(hobby);
  };

  const currentHobby = hobbyData[activeHobby];

  return (
    <ResponsiveCard>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h3 className="text-xl font-bold flex items-center mb-2 md:mb-0 text-gray-800 dark:text-gray-200">
          {currentHobby.icon}
          <span className="ml-3">{currentHobby.title}</span>
        </h3>
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 w-full md:w-auto">
          {(Object.keys(hobbyData) as HobbyType[]).map((hobby) => (
            <motion.button
              key={hobby}
              onClick={() => handleHobbyClick(hobby)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ transform: 'none' }}  // Explicitly reset any unwanted transform
              className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                activeHobby === hobby 
                  ? 'bg-blue-500 text-white shadow-lg' 
                  : 'bg-gray-200 text-gray-600 hover:bg-blue-200 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              {hobby.charAt(0).toUpperCase() + hobby.slice(1)}
            </motion.button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {currentHobby.description}
          </p>
          <div>
            <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Key Achievements:</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
              {currentHobby.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">Hobby Stats:</h4>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(currentHobby.stats).map(([key, value]) => (
              <motion.div 
                key={key} 
                className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{value}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 uppercase mt-1">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </ResponsiveCard>
  );
};

// Continuous Learning Widget
const ContinuousLearningWidget: FC = () => {
  const learningMilestones = [
    {
      icon: <FaBook className="text-4xl text-blue-600" />,
      title: "Self-Directed Learning",
      description: "Committed to continuous personal and professional development",
      achievements: [
        "200+ hours of online courses",
        "Completed advanced programming workshops",
        "Regular tech conference attendance"
      ]
    },
    {
      icon: <FaCertificate className="text-4xl text-green-600" />,
      title: "Professional Certifications",
      description: "Validated skills through recognized certification programs",
      achievements: [
        "Advanced Web Development Certification",
        "Cloud Computing Fundamentals",
        "Machine Learning Basics"
      ]
    }
  ];

  return (
    <ResponsiveCard>
      <div className="flex items-center mb-4">
        <FaBrain className="mr-3 text-2xl text-indigo-600" />
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Continuous Learning Journey</h3>
      </div>
      <div className="space-y-4">
        {learningMilestones.map((milestone, index) => (
          <div 
            key={index} 
            className="flex items-start space-x-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-xl"
          >
            <div className="flex-shrink-0 mt-1">{milestone.icon}</div>
            <div>
              <h4 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{milestone.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{milestone.description}</p>
              <ul className="list-disc list-inside text-xs text-gray-500 dark:text-gray-400 space-y-1">
                {milestone.achievements.map((achievement, idx) => (
                  <li key={idx}>{achievement}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </ResponsiveCard>
  );
};

const AboutSection: FC = () => {
  return (
    <ResponsiveCard>
      <motion.div 
        className="flex items-center mb-6"
        initial={{ x: -20 }}
        animate={{ x: 0 }}
      >
        <div className="p-3 bg-indigo-500/10 rounded-xl mr-4">
          <FaLaptopCode className="text-2xl text-indigo-600" />
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
          Professional Vision
        </h3>
      </motion.div>
      <motion.p 
        className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Strategic technology leader specializing in transformative digital solutions. 
        With a proven track record of delivering high-impact, scalable architectures 
        that drive business innovation and technological excellence.
      </motion.p>
      <motion.div 
        className="grid grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {[
          { icon: <SiReact />, text: "React", color: "text-cyan-500" },
          { icon: <SiTypescript />, text: "TypeScript", color: "text-blue-600" },
          { icon: <FaAward />, text: "Node.js", color: "text-green-600" }
        ].map((item, index) => (
          <motion.div 
            key={item.text}
            className="flex flex-col items-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50
              hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className={`text-2xl ${item.color} mb-2`}>{item.icon}</span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {item.text}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </ResponsiveCard>
  );
};

const SkillsSection: FC = () => {
  return (
    <ResponsiveCard>
      <motion.div 
        className="flex items-center mb-6"
        initial={{ x: -20 }}
        animate={{ x: 0 }}
      >
        <div className="p-3 bg-blue-500/10 rounded-xl mr-4">
          <FaNetworkWired className="text-2xl text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
          Technical Proficiency
        </h3>
      </motion.div>
      <div className="space-y-6">
        {[
          { 
            name: 'React', 
            level: 90, 
            color: 'from-cyan-500 to-blue-500', 
            description: 'Enterprise-grade frontend development',
            icon: <SiReact className="text-cyan-500" />
          },
          { 
            name: 'Node.js', 
            level: 85, 
            color: 'from-green-500 to-emerald-600', 
            description: 'Scalable backend solutions',
            icon: <FaAward className="text-green-500" />
          },
          { 
            name: 'TypeScript', 
            level: 88, 
            color: 'from-blue-500 to-indigo-600', 
            description: 'Type-safe, robust architecture',
            icon: <SiTypescript className="text-blue-500" />
          }
        ].map((skill, index) => (
          <motion.div 
            key={skill.name} 
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                {skill.icon}
                <span className="text-base font-semibold text-gray-700 dark:text-gray-300">
                  {skill.name}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {skill.level}%
              </span>
            </div>
            <div className="relative">
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div 
                  className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
              </div>
              <motion.p 
                className="mt-1 text-sm text-gray-500 dark:text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.3 }}
              >
                {skill.description}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </ResponsiveCard>
  );
};

const About: FC = () => {
  const { theme } = useTheme();

  return (
    <>
      <section id="about" className={`py-20 ${theme === 'light' ? 'bg-white' : 'bg-[#111111]'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              theme === 'light' ? 'text-gray-800' : 'text-gray-200'
            }`}>
              About Me
            </h2>
            <p className={`text-xl mb-12 ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              Passionate about creating impactful software solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <AboutSection />
            <SkillsSection />
          </div>
        </div>
      </section>

      <section 
        id="hobbies" 
        className={`py-16 ${theme === 'light' ? 'bg-white' : 'bg-[#111111]'}`}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-4xl font-bold text-center mb-12 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}
          >
            My Hobbies & Interests
          </motion.h2>

          <div className="max-w-4xl mx-auto">
            <HobbyExplorationWidget />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
