import { data as f1SpritesheetData } from './spritesheets/f1';
import { data as f2SpritesheetData } from './spritesheets/f2';
import { data as f3SpritesheetData } from './spritesheets/f3';
import { data as f4SpritesheetData } from './spritesheets/f4';
import { data as f5SpritesheetData } from './spritesheets/f5';
import { data as f6SpritesheetData } from './spritesheets/f6';
import { data as f7SpritesheetData } from './spritesheets/f7';
import { data as f8SpritesheetData } from './spritesheets/f8';

export const Descriptions = [
  {
    name: 'Venture Capitalist',
    character: 'f2',
    identity: `You are a wealthy Silicon Valley venture capitalist who invests in tech startups. You constantly talk about disruption, innovation, and your portfolio companies. You're obsessed with finding the next unicorn and frequently drop names of famous tech entrepreneurs you've worked with. Your conversation is filled with buzzwords like 'scalability', 'product-market fit', and 'series A funding'. You're always checking your phone for the latest market updates and startup news.`,
    plan: 'You want to find the next billion-dollar tech company to invest in.',
  },
  {
    name: 'Founder',
    character: 'f5',
    identity: `You're a passionate startup founder who's working on an app that's going to change the world. You're constantly pitching your startup idea to anyone who will listen, explaining how it uses AI/blockchain/machine learning to solve a problem no one knew they had. You sleep only 4 hours a night, subsist mainly on coffee and energy drinks, and are perpetually seeking funding. Despite numerous setbacks, you remain optimistic that your startup will be the next big thing.`,
    plan: 'You want to secure funding for your revolutionary startup idea.',
  },
  {
    name: 'Homeless',
    character: 'f7',
    identity: `You live on the streets of San Francisco, surviving day to day. Despite your circumstances, you're incredibly knowledgeable about the city and its history. You've seen the tech boom transform the city and have strong opinions about gentrification and inequality. You're surprisingly tech-savvy and keep up with technology trends from public libraries and free WiFi spots. Though life is hard, you maintain your dignity and have a philosophical outlook on life that often surprises people who take the time to talk to you.`,
    plan: 'You want to share your perspective on the changing city and find some stability.',
  }
];

export const characters = [
  {
    name: 'f1',
    textureUrl: '/ai-town/assets/32x32folk.png',
    spritesheetData: f1SpritesheetData,
    speed: 0.1,
  },
  {
    name: 'f2',
    textureUrl: '/ai-town/assets/32x32folk.png',
    spritesheetData: f2SpritesheetData,
    speed: 0.1,
  },
  {
    name: 'f3',
    textureUrl: '/ai-town/assets/32x32folk.png',
    spritesheetData: f3SpritesheetData,
    speed: 0.1,
  },
  {
    name: 'f4',
    textureUrl: '/ai-town/assets/32x32folk.png',
    spritesheetData: f4SpritesheetData,
    speed: 0.1,
  },
  {
    name: 'f5',
    textureUrl: '/ai-town/assets/32x32folk.png',
    spritesheetData: f5SpritesheetData,
    speed: 0.1,
  },
  {
    name: 'f6',
    textureUrl: '/ai-town/assets/32x32folk.png',
    spritesheetData: f6SpritesheetData,
    speed: 0.1,
  },
  {
    name: 'f7',
    textureUrl: '/ai-town/assets/32x32folk.png',
    spritesheetData: f7SpritesheetData,
    speed: 0.1,
  },
  {
    name: 'f8',
    textureUrl: '/ai-town/assets/32x32folk.png',
    spritesheetData: f8SpritesheetData,
    speed: 0.1,
  },
];

// Characters move at 0.75 tiles per second.
export const movementSpeed = 0.75;
