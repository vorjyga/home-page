const contacts = [
    {
        id: 'github',
        icon: 'github-icon',
        label: 'github.com/vorjyga',
        href: 'https://github.com/vorjyga',
    },
    {
        id: 'linkedin',
        icon: 'linkedin-icon',
        label: 'linkedin.com/in/novaikin',
        href: 'https://www.linkedin.com/in/novaikin/',
    },
    {
        id: 'website',
        icon: 'website-icon',
        label: 'novaikin.com',
        href: 'https://novaikin.com',
    },
    {
        id: 'telegram',
        icon: 'telegram-icon',
        label: 't.me/Pavel_Novaikin',
        href: 'https://t.me/Pavel_Novaikin',
    },
    {
        id: 'email',
        icon: 'email-icon',
        label: 'novaikin@gmail.com',
        href: 'mailto:novaikin@gmail.com',
    },
]

function Header() {
    return (
        <header className="flex flex-col items-center gap-3 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                Pavel Novaikin
            </h1>
            <p className="text-md leading-relaxed text-slate-500">
                Front End Senior/Lead Developer
                <br />
                Tbilisi, Georgia
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
