export default function DownloadPdf({ section = 'frontend' }) {
    return (
        <a href={`/pdf/pavel-novaikin-${section}.pdf`} download
            className="inline-flex items-center gap-3 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-slate-700 print:hidden">
            Download PDF <span aria-hidden="true">↓</span>
        </a>
    )
}
