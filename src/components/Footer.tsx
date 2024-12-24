import { ReactElement } from 'react';

function Footer(): ReactElement {
  return (
    <footer className="bg-gray-100 dark:bg-[#111111] py-4 mt-8">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center space-x-4 mb-4">
          <a 
            href="https://github.com/Souravsuvro" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
          >
            GitHub
          </a>
          <a 
            href="https://www.linkedin.com/in/sourav007/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
          >
            LinkedIn
          </a>
          <a 
            href="https://twitter.com/S_Sarker_Suvro" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
          >
            Twitter
          </a>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          &copy; {new Date().getFullYear()} My Personal Blog. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
