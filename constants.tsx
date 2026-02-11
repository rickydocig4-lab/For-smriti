
import { SlideContent, SlideType } from './types';

export const SLIDES: SlideContent[] = [
  {
    id: 1,
    type: SlideType.LANDING,
    title: "Hey Smriti 🌸",
    content: [
      "From the moment you entered my life, everything felt a little brighter, a little softer, and a lot more meaningful 💫",
      "This isn’t just a website…",
      "It’s my heart, written in pixels 💕"
    ],
    emojis: ["🌸", "💖", "✨", "🐱", "💫"],
    bgColor: "bg-pink-50",
    accentColor: "text-pink-500",
    effect: 'hearts',
    musicVibe: "Soft lo-fi / piano + light chimes"
  },
  {
    id: 2,
    type: SlideType.SAFE_PLACE,
    title: "Smriti 🤍",
    content: [
      "I promise to love you not just on the days you shine,",
      "but also on the days you struggle.",
      "I will be your safe space… always 🫂✨"
    ],
    emojis: ["🤍", "✨", "🫂", "🌙"],
    bgColor: "bg-orange-50",
    accentColor: "text-orange-400",
    effect: 'stars',
    musicVibe: "Emotional piano / instrumental"
  },
  {
    id: 3,
    type: SlideType.GREEN_FLAG,
    title: "A Green-Flag Kind of Love",
    content: [
      "I promise that even when we are angry,",
      "it will always be us vs the problem,",
      "never me vs you 🤝💚",
      "Your feelings will always matter to me."
    ],
    emojis: ["💚", "🤝", "🌿", "✨"],
    bgColor: "bg-emerald-50",
    accentColor: "text-emerald-600",
    effect: 'leaves',
    musicVibe: "Acoustic guitar / soft lo-fi"
  },
  {
    id: 4,
    type: SlideType.CUTE_STUFF,
    title: "The Cute Stuff I’ll Always Do",
    content: [
      "I promise to share my fries with you 🍟😌",
      "I promise to pause the movie for snack breaks 🎬🍿",
      "And yes…",
      "I promise to handle everything with patience, love,",
      "and maybe some chocolate 🍫🐱"
    ],
    emojis: ["🐱", "🍟", "🍫", "🎬", "🍿", "💞"],
    bgColor: "bg-yellow-50",
    accentColor: "text-yellow-600",
    effect: 'bubbles',
    musicVibe: "Cute ukulele / happy lo-fi"
  },
  {
    id: 5,
    type: SlideType.PROMISE,
    title: "Smriti ❤️",
    content: [
      "I promise I will never make you feel like your past.",
      "I choose to grow, to understand, and to unlearn old mindsets 🌱",
      "Not perfectly…",
      "but honestly, respectfully, and with love."
    ],
    emojis: ["❤️", "🌱", "✨", "🤍"],
    bgColor: "bg-amber-50",
    accentColor: "text-amber-700",
    effect: 'glow',
    musicVibe: "Emotional instrumental rising softly"
  },
  {
    id: 6,
    type: SlideType.FINAL,
    title: "Every Single Day, I Choose You",
    content: [
      "I promise to make you laugh every day 😄",
      "I promise to never let you sleep feeling unloved 🌙💞",
      "And most of all…",
      "I promise to keep choosing you, every single day 💍✨",
      "— Yours 🤍"
    ],
    emojis: ["💍", "✨", "🤍", "🌙", "💖"],
    bgColor: "bg-rose-50",
    accentColor: "text-rose-500",
    effect: 'pulse',
    musicVibe: "Soft romantic theme song climax"
  }
];
