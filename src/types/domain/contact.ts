export interface Contact {
  email: string;
  phone?: string;
  location: {
    city: string;
    country: string;
    timezone?: string;
  };
  availability?: {
    status: 'available' | 'busy' | 'not-available';
    message?: string;
  };
  social: {
    github: string;
    linkedin: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
    medium?: string;
  };
  preferredContact?: 'email' | 'phone' | 'social';
  languages?: {
    language: string;
    level: 'native' | 'fluent' | 'intermediate' | 'basic';
  }[];
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  data?: any;
}
