import { profile, contacts, summary, experience, earlierExperience, skills, education, languages } from './index.js';

export const frontendResume = { profile, contacts, summary, experience, earlierExperience, skills, education, languages };

// Emphasize documented server-side work without changing job titles or adding claims.
const fullstackSkillOrder = ['Programming Languages', 'Backend', 'Databases', 'APIs', 'Auth & BaaS', 'Front End', 'CMS'];
export const fullstackResume = {
  ...frontendResume,
  profile: { ...profile, title: 'Senior Full Stack Developer', kicker: 'Full Stack · Senior' },
  summary: [
    [{ text: 'Full Stack Developer', strong: true }, { text: ' with 10 years of experience building web products across fintech, crypto, media, and sports, including 3 years as a Front End Team Lead.' }],
    'My work connects user interfaces with the services behind them: Node.js server layers, middleware APIs, headless CMS integrations, and end-to-end authentication. I have built an SSR application on Nuxt.js with its Node.js layer, connected Strapi to a standalone blog, and implemented authorization with Keycloak.',
    'I enjoy owning delivery end to end — clarifying requirements, shaping API contracts, building features, and improving deployment and monitoring with backend and DevOps colleagues. Investigating how data is created, processed, stored, and presented helped me reduce load times by 20%.',
    'Alongside hands-on development, I bring experience leading teams, mentoring engineers, conducting technical interviews, and establishing code review and automated quality checks.',
  ],
  skills: [...skills].sort((a, b) => {
    const rank = (area) => { const i = fullstackSkillOrder.indexOf(area); return i < 0 ? fullstackSkillOrder.length : i; };
    return rank(a.area) - rank(b.area);
  }),
};
