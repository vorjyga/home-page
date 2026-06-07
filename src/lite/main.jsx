import Header from "./header.jsx";
import Summary from "./summary.jsx";
import Experience from "./experience.jsx";
import Skills from "./skills.jsx";
import Education from "./education.jsx";


function Lite() {
    return (
        <div className="mx-auto max-w-3xl px-4 text-justify mb-20 mt-10 print:max-w-none print:px-0 print:mb-0 print:mt-0">
            <button
                type="button"
                onClick={() => window.print()}
                className="fixed right-4 top-4 z-10 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-slate-700 print:hidden"
            >
                Download PDF
            </button>
            <Header />
            <Summary />
            <Experience />
            <Skills />
            <Education />
        </div>
    )
}

export default Lite
