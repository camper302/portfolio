export default function LoadingSpinner({ className = "" }) {
    return (
        <div className={`inline-flex items-center ${className}`} aria-label="로딩중">
            <div className="relative w-4 h-4">
                <div className="absolute top-0 left-0 w-full h-full border-2 border-gray-200 rounded-full animate-ping dark:border-gray-700" />
                <div className="absolute top-0 left-0 w-full h-full border-2 border-blue-500 rounded-full animate-spin dark:border-blue-400" />
            </div>
            <span className="ml-2 text-gray-600 dark:text-gray-400 animate-pulse">
                로딩중...
            </span>
        </div>
    );
}
