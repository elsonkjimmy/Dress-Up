export interface ClothingItem {
    id: string;
    name: string;
    category: 'tops' | 'bottoms' | 'shoes' | 'accessories';
    image: any;
    style: 'casual' | 'formal' | 'sport' | 'bohemian';
    colorPalette: string[];
    compatibility: number; // 0-100%
    lastWorn?: Date;
  }
  
  export interface Outfit {
    id: string;
    items: string[]; // IDs des vêtements
    image?: any; // Image générée de l'avatar
    rating?: number;
  }
  
  export interface UserPreferences {
    style: string;
    favoriteColors: string[];
    socialCategory?: string;
    // ... autres préférences
  }