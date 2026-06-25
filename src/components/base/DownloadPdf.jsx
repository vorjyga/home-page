export default function DownloadPdf() {
    return (
        <button
            type="button"
            onClick={() => window.print()}
            className="fixed right-4 bottom-6 sm:bottom-auto sm:top-4 z-10 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-slate-700 print:hidden"
        >
            Download PDF
        </button>
    )
}
