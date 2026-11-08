export interface Project {
  id: string;
  title: string;
  category: 'Highways & Corridors' | 'Flyovers & Underpasses' | 'Water & Environmental' | 'Urban Networks' | 'High-Rise Superstructures';
  location: string;
  client: string;
  completionYear: string;
  image: string;
  highlight: string;
  description: string;
  specs: {
    label: string;
    value: string;
  }[];
}

export interface BeforeAfterProject {
  id: string;
  title: string;
  location: string;
  category: string;
  beforeDescription: string;
  afterDescription: string;
  beforeImage: string;
  afterImage: string;
  metrics: {
    label: string;
    before: string;
    after: string;
  }[];
}

export interface PanoramicViewItem {
  id: string;
  title: string;
  location: string;
  image: string;
  description: string;
  hotspots: {
    pitch: number;
    yaw: number;
    label: string;
    detail: string;
  }[];
}

export interface QuoteItem {
  id: string;
  quote: string;
  author: string;
  title: string;
  context: string;
}

export interface ClientEntity {
  id: string;
  name: string;
  shortName: string;
  level: string;
  jurisdiction: string;
  projectsAssigned: string;
  emblemColor: string;
  description: string;
  verifiedStatus: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

