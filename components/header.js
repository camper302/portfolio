import Link from 'next/link';
import DarkModeToggleButton from './dark-mode-toggle-button';
import Image from 'next/image';  // Image 컴포넌트 임포트

export default function Header() {
    return (
        <>
            <header className="text-gray-600 body-font dark:text-gray-300">
                <div className="container flex flex-col flex-wrap items-center p-5 mx-auto md:flex-row">
                    <Link href="/">
                        <span className="flex items-center mb-4 font-medium title-font md:mb-0">
                            {/* 기존 img 태그를 Image 컴포넌트로 변경 */}
                            <Image
                                src="/header_logo.png"  // 경로 수정
                                alt="듀듀의 포트폴리오"   // alt 속성 추가
                                className="w-12 h-12 rounded-full"
                                width={48}  // 이미지의 너비 지정
                                height={48} // 이미지의 높이 지정
                            />
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
    );
}