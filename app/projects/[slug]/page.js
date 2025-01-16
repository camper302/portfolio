import { notFound } from "next/navigation";
import Link from 'next/link';
import { getProjectBySlug } from "@/lib/notion";

// Notion 색상을 Tailwind 색상으로 매핑하는 객체
const colorMap = {
    default: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    gray: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    brown: 'bg-amber-200 text-amber-800 dark:bg-amber-700 dark:text-amber-200',
    orange: 'bg-orange-200 text-orange-800 dark:bg-orange-700 dark:text-orange-200',
    yellow: 'bg-yellow-200 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-200',
    green: 'bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-200',
    blue: 'bg-blue-200 text-blue-800 dark:bg-blue-700 dark:text-blue-200',
    purple: 'bg-purple-200 text-purple-800 dark:bg-purple-700 dark:text-purple-200',
    pink: 'bg-pink-200 text-pink-800 dark:bg-pink-700 dark:text-pink-200',
    red: 'bg-red-200 text-red-800 dark:bg-red-700 dark:text-red-200',
};

export default async function ProjectPage({ params }) {
    try {
        // 디버깅을 위한 로그 추가
        console.log('[Page] Rendering project with slug:', params.slug);

        const project = await getProjectBySlug(params.slug);

        if (!project) {
            console.log('[Page] Project not found');
            return notFound();
        }

        return (
            <div className="container px-4 py-8 mx-auto">
                <div
                    className="max-w-4xl mx-auto opacity-0 animate-fade-slide-up"
                    style={{
                        animationDelay: '0.1s',
                        animationFillMode: 'forwards'
                    }}
                >
                    <Link href="/projects" className="inline-block mb-6 text-blue-500 hover:text-blue-600 dark:text-blue-400">
                        ← 프로젝트 목록으로 돌아가기
                    </Link>

                    {project.coverImage && (
                        <img
                            src={project.coverImage}
                            alt={project.title}
                            className="object-cover w-full h-64 mb-8 rounded-lg"
                        />
                    )}
                    <h1 className="mb-4 text-4xl font-bold">{project.title}</h1>
                    <div className="mb-6">
                        {project.period && (
                            <p className="mb-2 text-gray-600 dark:text-gray-400">
                                작업 기간: {project.period.start} ~ {project.period.end || '진행중'}
                            </p>
                        )}
                    </div>
                    <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
                        {project.description}
                    </p>
                    <div className="mb-8">
                        <h2 className="mb-4 text-2xl font-semibold">사용 기술</h2>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                                <span
                                    key={tech.name}
                                    className={`px-3 py-1 text-sm rounded-full ${colorMap[tech.color] || colorMap.default}`}
                                >
                                    {tech.name}
                                </span>
                            ))}
                        </div>
                    </div>
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                        >
                            GitHub 저장소 방문
                        </a>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('[Page] Project detail error:', error);
        return notFound();
    }
}
