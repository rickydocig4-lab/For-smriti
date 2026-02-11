
export enum SlideType {
  LANDING = 'LANDING',
  SAFE_PLACE = 'SAFE_PLACE',
  GREEN_FLAG = 'GREEN_FLAG',
  CUTE_STUFF = 'CUTE_STUFF',
  PROMISE = 'PROMISE',
  FINAL = 'FINAL'
}

export interface SlideContent {
  id: number;
  type: SlideType;
  title: string;
  content: string[];
  emojis: string[];
  bgColor: string;
  accentColor: string;
  effect: 'hearts' | 'stars' | 'leaves' | 'bubbles' | 'glow' | 'pulse';
  musicVibe: string;
}
