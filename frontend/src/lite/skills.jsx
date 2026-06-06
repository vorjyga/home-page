const skills = [
    { area: 'Programming Languages', items: ['TypeScript', 'JavaScript', 'Python'] },
    { area: 'Front End', items: ['React', 'Vue', 'Nuxt.js', 'Next.js', 'Angular'] },
    { area: 'State Management', items: ['Pinia', 'Vuex', 'Redux', 'Zustand', 'MobX'] },
    { area: 'Styling', items: ['Tailwind', 'SCSS', 'Bootstrap', 'Reka UI', 'Radix UI'] },
    { area: 'Backend', items: ['Node.js', 'Nest.js', 'Bun', 'FastAPI'] },
    { area: 'Mobile Apps', items: ['Expo', 'Ionic', 'Capacitor', 'Electron'] },
    { area: 'APIs', items: ['GraphQL', 'REST'] },
    { area: 'CMS', items: ['Payload.js', 'Strapi'] },
    { area: 'Auth & BaaS', items: ['Keycloak', 'Supabase', 'Firebase'] },
    { area: 'Testing', items: ['Vitest', 'Jest', 'Playwright', 'Cypress'] },
    { area: 'Build Tools', items: ['Vite', 'Webpack'] },
    { area: 'DevOps & Monitoring', items: ['Gitlab CI', 'Sentry', 'Google Lighthouse'] },
    { area: 'Architecture', items: ['Feature-Sliced Design', 'RxJS'] },
]

function Skills() {
    return (
        <section className="mt-10">
            <div className="flex items-center gap-4">
                <h2 className="shrink-0 text-xl font-normal text-slate-400">Skills</h2>
                <span className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="mt-6 space-y-3">
                {skills.map(({ area, items }) => (
                    <div key={area} className="flex items-start gap-6">
                        <div className="w-52 shrink-0 whitespace-nowrap pt-2 text-slate-500">{area}</div>
                        <div className="flex flex-wrap gap-2">
                            {items.map((item) => (
                                <span
                                    key={item}
                                    className="rounded-md bg-slate-100 p-2 text-slate-700"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Skills
