import Animation from "./animation"
import Link from 'next/link';

export default function Hero() {
    return (
        <>
            <div className="flex flex-col items-center mb-16 text-center lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 md:items-start md:text-left md:mb-0">
                <h1 className="mb-4 text-3xl font-medium title-font sm:text-4xl">안녕하세요 듀듀입니다.
                    <br className="hidden lg:inline-block" /> 오늘도 빡코딩!
                </h1>
                <p className="mb-8 leading-relaxed">따훔사앗 던딩으키는 괴알우모를 아그를 쇠아면 릴무에서. 도픙홍누는 툐깅힌너는 내애너미 솨댕저아 너흐를 려올촤게 밍겐리감다. 믈라화댱다 줘보는 가에추악훙갸 는깅훙만 벙누나애를 조서더은다. 서툭동긴허게 니고곤일지언정 사데마는 잉롬을, 조하큐다 사쇼멀고다 한허스갸로 골끄스, 재싕기호로 읭으. 개깜이 우김은 하망에 혔지애슥다 가헿덕샢게 고포자늡 셔탄맜찬아 녕힐은 루좃머다. 헤조이다에 힘이모다를, 사의타 티누 옵둔억의.</p>
                <div className="flex justify-center">
                    <Link href="/projects">
                        <button className="btn-project">프로젝트 보러가기</button>
                    </Link>
                </div>
            </div>
            <div className="w-5/6 lg:max-w-lg lg:w-full md:w-1/2">
                <Animation />
            </div>
        </>
    )
}
