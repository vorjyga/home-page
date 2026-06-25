import { skills } from '../../data/index.js'

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
                        <div className="w-[30%] shrink-0 pt-2 text-slate-500 sm:w-52 sm:whitespace-nowrap">{area}</div>
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
