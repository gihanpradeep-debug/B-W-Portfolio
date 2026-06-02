export interface Project {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  year: string;
  client: string;
  role: string;
  challenges: string;
  outcomes: string[];
  accentColor: string;
}

export interface ToolkitItem {
  name: string;
  category: string;
  iconName: string;
  description: string;
}

export interface ProjectBrief {
  services: string[];
  timeline: string;
  budget: string;
  name: string;
  email: string;
  description: string;
}
