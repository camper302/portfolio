import Link from 'next/link'

export default function Footer() {
    return (
        <>
            <footer className="body-font">
                <div className="container flex flex-col items-center justify-center px-5 py-6 mx-auto sm:flex-row">
                    <Link href={'/'}>
                        <span className="flex items-center justify-center font-medium title-font md:justify-start">
                            <span className="ml-3 text-xl">듀듀의 포트폴리오</span>
                        </span>
                    </Link>
                    <p className="mt-4 text-sm sm:ml-6 sm:mt-0">© 2025 Dongtan
                    </p>
                </div>
            </footer>
        </>
    )

}