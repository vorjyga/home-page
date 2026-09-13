import { profile as defaultProfile, contacts as defaultContacts } from '../../data/index.js'

function Header({ profile = defaultProfile, contacts = defaultContacts } = {}) {
    return (
        <header className="flex flex-col items-center gap-3 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                {profile.name}
            </h1>
            <p className="text-md leading-relaxed text-slate-500">
                {profile.title}
                <br />
                {profile.location}
            </p>
            <ul className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 max-w-3/4">
                {contacts.map(({ id, icon, label, href }) => {
                    const isExternal = href.startsWith('http')
                    return (
                        <li key={id}>
                            <a
                                href={href}
                                {...(isExternal && { target: '_blank', rel: 'noreferrer' })}
                                className="flex items-center gap-1 text-slate-700 transition-colors hover:text-indigo-600"
                            >
                                <svg className="h-5 w-5 shrink-0" aria-hidden="true">
                                    <use href={`/icons.svg#${icon}`} />
                                </svg>
                                <span className="text-base">{label}</span>
                            </a>
                        </li>
                    )
                })}
            </ul>
        </header>
    )
}

export default Header
