import { experience, earlierExperience } from '../../data/index.js'

function Experience() {
    return (
        <section className="mt-5">
            <div className="flex items-center gap-4 print:break-after-avoid">
                <h2 className="shrink-0 text-xl font-normal text-slate-400">Work experience</h2>
                <span className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="mt-6 divide-y divide-slate-200 text-base print:text-sm">
                {experience.map((job) => (
                    <article
                        key={job.company + job.dates}
                        className={`py-6 first:pt-0 last:pb-0${job.pageBreakBefore ? ' print:break-before-page print:border-t-0' : ''}`}
                    >
                        <div className="flex items-baseline justify-between gap-4">
                            <h5 className="text-left text-lg font-semibold text-slate-900">{job.company}</h5>
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
                        {job.site && <a href={`https://${job.site}`} target={'_blank'}><p className="mt-0.5 text-sm text-slate-400">{job.site}</p></a>}

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
                <span className="font-semibold text-slate-900">{earlierExperience.label}</span>{' '}
                <span className="text-slate-500">{earlierExperience.period}</span>{' '}
                {earlierExperience.text}
            </p>
        </section>
    )
}

export default Experience
