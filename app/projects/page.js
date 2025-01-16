
import { getProjects } from '@/lib/notion';
import Link from 'next/link';
import { Suspense } from 'react';
import LoadingSpinner from '@/components/loading-spinner';
import Image from 'next/image';  // Image 컴포넌트 추가

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

export const revalidate = 3600; // 1시간마다 재검증

function ProjectCard({ project, index }) {
    return (
        <div
            className="opacity-0 animate-fade-slide-up"
            style={{
                animationDelay: `${index * 150}ms`,
                animationFillMode: 'forwards',
            }}
        >
            <div className="overflow-hidden transition-transform duration-200 border rounded-lg shadow-lg hover:scale-105 group">
                {/* Image 컴포넌트를 사용하여 이미지 최적화 */}
                {project.coverImage && (
                    <Image
                        src={project.coverImage}
                        alt={project.title}
                        className="object-cover w-full h-48"
                        width={600}  // 이미지의 실제 크기에 맞는 width
                        height={300} // 이미지의 실제 크기에 맞는 height
                    />
                )}
                <div className="p-4">
                    <Link href={`/projects/${project.slug}`}>
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-semibold group-hover:text-blue-500">{project.title}</h2>
                            <p className="text-sm text-gray-500 transition-opacity opacity-0 group-hover:opacity-100 group-hover:animate-blink">
                                ⏎ 상세보기
                            </p>
                        </div>
                    </Link>
                    {project.period && (
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            작업 기간: {project.period.start} ~ {project.period.end || '진행중'}
                        </p>
                    )}
                    <p className="mb-4 text-gray-600 dark:text-gray-300">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech) => (
                            <span
                                key={tech.name}
                                className={`px-2 py-1 text-sm rounded-full ${colorMap[tech.color] || colorMap.default}`}
                            >
                                {tech.name}
                            </span>
                        ))}
                    </div>
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline dark:text-blue-400"
                        >
                            GitHub 저장소
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

async function ProjectList() {
    const projects = await getProjects();
    if (!projects || projects.length === 0) {
        return <p>현재 표시할 프로젝트가 없습니다.</p>;
    }
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
            ))}
        </div>
    );
}

export default function Projects() {
    return (
        <div className="container px-4 py-8 mx-auto">
            <Suspense fallback={<LoadingSpinner />}>
                <div className="flex items-center gap-4 mb-8">
                    <h1 className="text-3xl font-bold">프로젝트</h1>
                </div>
                <ProjectList />
            </Suspense>
        </div>
    );
}