const jobs = [
    {
        company: 'News Company (Under NDA)',
        dates: 'Nov 2025 — Present · 7 months',
        position: 'Front End Team Lead',
        project: '"The Times" in the crypto industry',
        items: [
            'Shipped and maintained 3 production applications serving 30k daily active users, led a full major-version upgrade of the application framework, and stood up greenfield projects end to end — tooling (ESLint, Prettier, Husky), Sentry error tracking, i18n, GTM, and Sentry/Grafana production monitoring.',
            'Owned engineering standards and code quality — enforcing consistent conventions, running thorough code reviews and mentoring, designing a GitHub review workflow with LLM-assisted self-review, building automated CI quality gates, and managing dependency upgrades.',
            'Led a team of 3 front end engineers — decomposing features into actionable tasks, tracking technical debt in Jira, shielding the team from unrealistic deadlines through transparent estimation, and conducting technical interviews.',
            'Drove cross-functional collaboration — improving CI/CD pipelines with DevOps, aligning API contracts with backend engineers, and agreeing on roadmap and technical trade-offs with Product and the CTO.',
        ],
    },
    {
        company: 'News Company (Under NDA)',
        dates: 'Jun 2023 — Nov 2025 · 2 years 5 months',
        position: 'Senior Front End Developer',
        project: '"The Times" in the crypto industry',
        items: [
            "Delivered several key sections of the company's main website, improving overall structure and UX consistency.",
            'Resolved front end bugs across multiple modules, improving overall product stability.',
            'Contributed to migrating the application to a newer major framework version, ensuring a smooth, backward-compatible transition.',
            'Investigated and optimized how data is created, processed, stored, and presented to users, reducing load times by 20%.',
            'Integrated 5 third-party APIs and 20+ partner widgets into the core platform.',
            'Partnered with clients and stakeholders to clarify requirements and align on technical solutions.',
            "Stepped up to lead the front end team during the lead's absence.",
        ],
    },
    {
        company: 'Cryptopay.me',
        dates: 'Apr 2022 — Jun 2023 · 1 year 3 months',
        position: 'Senior Front End Developer',
        site: 'cryptopay.me',
        items: [
            "Added and refined features for the company's core product — the user's personal dashboard, used by around 20,000 customers.",
            "Created and evolved a new version of the company's presentation website — a single-page app spanning 5 core pages and 12 additional pages with nested hierarchies, covering the service's key features and benefits.",
            'Built a standalone company blog as a separate project, integrating Strapi as a CMS for content updates.',
        ],
    },
    {
        company: 'Introduct tech',
        dates: 'Feb 2021 — Apr 2022 · 1 year 3 months',
        position: 'Fullstack Developer',
        summary: 'Worked on several projects of different scales and directions:',
        items: [
            'Developed 2 mobile applications for Android and iOS using NativeScript with the Angular framework.',
            'Created the front end of a help-desk system.',
            'Engineered and maintained an isomorphic web application from scratch on Nuxt.js.',
            'Implemented an authorization mechanism based on Keycloak.js.',
        ],
    },
    {
        company: 'AAATrade',
        dates: 'Jan 2019 — Apr 2021 · 2 years 4 months',
        position: 'Front End Team Lead',
        site: 'www.aaatrade.com',
        project: 'FinTech project',
        items: [
            'Led a front end team of 6 — decomposing and supervising tasks, running daily scrums, mentoring junior developers, and interviewing candidates.',
            'Owned the tech stack and engineering quality — selecting technologies, introducing code review, and managing incidents and overall application health.',
            'Migrated the project from JavaScript to TypeScript, eliminating a large class of weak-typing errors.',
            'Refactored the codebase toward SOLID principles — splitting oversized super-classes into small, focused ones and extracting reusable components and modules.',
            'Optimized the application, significantly reducing CPU load on the client side.',
            'Designed and organized a middleware API and automated the deployment process (Bamboo).',
        ],
    },
    {
        company: 'Strict Logic',
        dates: 'Jan 2018 — Jan 2019 · 1 year 1 month',
        position: 'Front End Developer',
        site: 'strictlogic.com',
        project: 'A big sports portal/custom CRM for one huge world sports association.',
        items: [
            'Designed and developed the front end module I was responsible for, working with large, scalable web systems.',
            'Built a stable WebSocket connection between the front end and middleware for real-time data.',
            'Engineered the front end of an email service and a smart layer bridging the server and client.',
            'Worked autonomously and collaborated remotely with managers in Germany, gathering requirements directly from the client.',
        ],
    },
    {
        company: 'Arview',
        dates: 'Jun 2017 — Jan 2018 · 8 months',
        position: 'Front End Developer',
        site: 'arview.pro',
        project:
            'An ambitious service which is able to choose a tourist program in several countries fit for your budget.',
        items: [
            'Crafted the front end of the service from pixel-perfect designs.',
            'Authored many custom Angular components.',
            'Tested every new feature at the end of each sprint.',
        ],
    },
]

function Experience() {
    return (
        <section className="mt-10">
            <div className="flex items-center gap-4">
                <h2 className="shrink-0 text-xl font-normal text-slate-400">Work experience</h2>
                <span className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="mt-6 divide-y divide-slate-200 text-base print:text-sm">
                {jobs.map((job) => (
                    <article key={job.company + job.dates} className="py-6 first:pt-0 last:pb-0">
                        <div className="flex items-baseline justify-between gap-4">
                            <h5 className="text-lg font-semibold text-slate-900">{job.company}</h5>
                            <span className="shrink-0 whitespace-nowrap text-right text-slate-500">
                                <span className="block">{job.dates.split(' · ')[0]}</span>
                                {job.dates.split(' · ')[1] && (
                                    <span className="block text-sm text-slate-400">
                                        {job.dates.split(' · ')[1]}
                                    </span>
                                )}
                            </span>
                        </div>
                        <p className="mt-0.5 text-slate-500">{job.position}</p>
                        {job.site && <p className="mt-0.5 text-sm text-slate-400">{job.site}</p>}

                        {job.summary && <p className="mt-3 text-slate-700">{job.summary}</p>}
                        {job.project && (
                            <p className="mt-3 text-slate-700">
                                <span className="font-medium">Project:</span> {job.project}
                            </p>
                        )}

                        {job.items && (
                            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-slate-700 marker:text-slate-300">
                                {job.items.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        )}
                    </article>
                ))}
            </div>

            <p className="mt-6 border-t border-slate-200 pt-6 text-base text-slate-700 print:text-sm">
                <span className="font-semibold text-slate-900">Earlier experience</span>{' '}
                <span className="text-slate-500">(2008–2016)</span> — Web Developer at Paraweb, and
                System Administrator at Tomsk State University of Control Systems and Radioelectronics
                (TUSUR).
            </p>
        </section>
    )
}

export default Experience
