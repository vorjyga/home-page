import { profile as defaultProfile, contacts as defaultContacts } from '../../data/index.js'

function ContactLink({ icon, label, href, className = '' }) {
    const isExternal = href.startsWith('http')

    return (
        <a
            href={href}
            {...(isExternal && { target: '_blank', rel: 'noreferrer' })}
            className={`items-center gap-1 text-slate-700 transition-colors hover:text-indigo-600 ${className}`}
        >
            <svg className="h-5 w-5 shrink-0" aria-hidden="true">
                <use href={`/icons.svg#${icon}`} />
            </svg>
            <span className="text-base">{label}</span>
        </a>
    )
}

function Header({ profile = defaultProfile, contacts = defaultContacts, printWebsiteHref } = {}) {
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
                    const hasPrintLink = id === 'website' && printWebsiteHref

                    return (
                        <li key={id}>
                            <ContactLink
                                icon={icon}
                                label={label}
                                href={href}
                                className={hasPrintLink ? 'flex print:hidden' : 'flex'}
                            />
                            {hasPrintLink && (
                                <ContactLink
                                    icon={icon}
                                    label={label}
                                    href={printWebsiteHref}
                                    className="hidden print:flex"
                                />
                            )}
                        </li>
                    )
                })}
            </ul>
        </header>
    )
}

export default Header
