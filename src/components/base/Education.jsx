import { education, languages } from '../../data/index.js'

function Education() {
    return (
        <>
            <section className="mt-10">
                <div className="flex items-center gap-4">
                    <h2 className="shrink-0 text-xl font-normal text-slate-400">Education</h2>
                    <span className="h-px flex-1 bg-slate-200" />
                </div>

                <article className="mt-6">
                    <h5 className="text-lg font-semibold text-slate-900">{education.company}</h5>
                    <p className="mt-0.5 text-slate-700">{education.description}</p>
                    <p className="mt-0.5 text-slate-700">{education.dates}</p>
                </article>
            </section>

            <section className="mt-10">
                <div className="flex items-center gap-4">
                    <h2 className="shrink-0 text-xl font-normal text-slate-400">Languages</h2>
                    <span className="h-px flex-1 bg-slate-200" />
                </div>

                <div className="mt-6 flex gap-6">
                    <div className="w-32 shrink-0 text-slate-500">{languages.aside}</div>
                    <div className="space-y-1 text-slate-700">
                        {languages.items.map(({ lang, level }) => (
                            <p key={lang}>
                                <b className="font-semibold">{lang}</b>{' '}
                                <span className="text-slate-500">{level}</span>
                            </p>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Education
