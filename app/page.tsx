import { links, getFaviconUrl } from "@/data/links";
import { Card, CardContent } from "@/components/ui/card";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center py-12 px-4 bg-gray-50 dark:bg-slate-950">
      <div className="w-full max-w-md space-y-4">
        {/* 가상의 프로필 헤더 (PRD의 인라인 편집 전 UI) */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-slate-800 mb-4 flex items-center justify-center text-gray-500">
            Profile
          </div>
          <h1 className="text-2xl font-bold">@nickname</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            나를 표현하는 한 줄 소개
          </p>
        </div>

        {/* 링크 목록 */}
        <div className="flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Card className="hover:bg-gray-100 dark:hover:bg-slate-900 transition-colors shadow-sm">
                <CardContent className="flex items-center p-4">
                  {/* 파비콘 아이콘 */}
                  <img
                    src={getFaviconUrl(link.url)}
                    alt={`${link.title} icon`}
                    className="w-8 h-8 rounded-sm mr-4"
                  />
                  {/* 중앙 정렬된 타이틀 (아이콘 영역을 제외하고 중앙에 오도록 처리) */}
                  <span className="font-semibold text-lg text-center flex-1 pr-12">
                    {link.title}
                  </span>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
