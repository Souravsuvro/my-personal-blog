export interface Project {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: 'Web Development' | 'App Development' | 'Web Design' | 'UI/UX Design' | 'Machine Learning' | 'Artificial Intelligence';
  featured?: boolean;
  startDate?: string;
  endDate?: string;
  status?: 'in-progress' | 'completed' | 'archived';
  collaborators?: {
    name: string;
    role: string;
    url?: string;
  }[];
  highlights?: string[];
  tags?: string[];
  media?: {
    type: 'image' | 'video';
    url: string;
    caption?: string;
  }[];
}
