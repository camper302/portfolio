import Link from 'next/link'
import DarkModeToggleButton from './dark-mode-toggle-button'

export default function Header() {
    return (
        <>
            <header className="text-gray-600 body-font dark:text-gray-300">
                <div className="container flex flex-col flex-wrap items-center p-5 mx-auto md:flex-row">
                    <Link href="/">
                        <span className="flex items-center mb-4 font-medium title-font md:mb-0">
                            <img src="header_logo.png" className="w-12 h-12 rounded-full" />
                            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 p-2 text-white bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                            </svg> */}
                            <span className="ml-3 text-xl text-gray-900 dark:text-gray-100">듀듀의 포트폴리오</span>
                        </span>
                    </Link>
                    <nav className="flex flex-wrap items-center justify-center text-base md:ml-auto">
                        <Link href="/"><span className="mr-5 hover:text-gray-900 dark:hover:text-gray-100">홈</span></Link>
                        <Link href="/projects"><span className="mr-5 hover:text-gray-900 dark:hover:text-gray-100">프로젝트</span></Link>
                        {/* <Link href="/about-me"><span className="mr-5 hover:text-gray-900 dark:hover:text-gray-100">연락하기</span></Link> */}
                    </nav>
                    <DarkModeToggleButton />
                </div>
            </header>
        </>
    )
}