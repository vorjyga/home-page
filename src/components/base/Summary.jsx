import { summary } from '../../data/index.js'

function Summary() {
    return (
        <section className="mt-10 print:mt-4">
            <div className="flex items-center gap-4">
                <h2 className="shrink-0 text-xl font-normal text-slate-400">Summary</h2>
                <span className="h-px flex-1 bg-slate-200" />
            </div>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-slate-700 print:mt-3 print:space-y-3 print:text-sm">
                {summary.map((para, i) => (
                    <p key={i}>
                        {typeof para === 'string'
                            ? para
                            : para.map((seg, j) =>
                                  seg.strong ? (
                                      <strong key={j} className="font-semibold text-slate-900">
                                          {seg.text}
                                      </strong>
                                  ) : (
                                      <span key={j}>{seg.text}</span>
                                  ),
                              )}
                    </p>
                ))}
            </div>
        </section>
    )
}

export default Summary
