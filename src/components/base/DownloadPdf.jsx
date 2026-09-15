export default function DownloadPdf({ section = 'frontend' }) {
    const filename = `cv-Pavel-Novaikin-senior-${section}.pdf`

    return (
        <a href={`/pdf/${filename}`} download
            className="inline-flex items-center gap-3 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-slate-700 print:hidden">
            Download PDF <span aria-hidden="true">↓</span>
        </a>
    )
}
