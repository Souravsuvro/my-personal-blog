import { FiHome, FiUser, FiCode, FiBookOpen, FiMail, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

export const getNavIcon = (path: string) => {
  switch (path) {
    case '/':
      return FiHome;
    case '#about':
      return FiUser;
    case '#projects':
      return FiCode;
    case '#blog':
      return FiBookOpen;
    case '#contact':
      return FiMail;
    default:
      return FiHome;
  }
};

export const getSocialIcon = (url: string) => {
  if (url.includes('github')) return FiGithub;
  if (url.includes('linkedin')) return FiLinkedin;
  if (url.includes('twitter')) return FiTwitter;
  return FiGithub;
};
