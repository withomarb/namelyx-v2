export interface Domain {
  title: string; // Changed from name to title to match CMS default
  name?: string; // Backwards compatibility if needed
  available?: boolean; // Deprecated in favor of status
  status: 'Available' | 'Under Review' | 'Sold' | 'Hidden';
  description: string;
  price?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: 'x' | 'linkedin' | 'email';
}