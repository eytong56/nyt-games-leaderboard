import { GithubLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { SyncButton } from "@/app/ui/buttons";

export default function Header() {
  return (
    <div className="flex flex-row flex-wrap md:flex-nowrap justify-between items-center p-8 w-full md:h-24 bg-white border-b border-b-gray-400 gap-8">
      <a
        href="https://github.com/eytong56/nyt-games-leaderboard"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 cursor-pointer"
      >
        <GithubLogoIcon
          weight="regular"
          size={24}
          className="hover:text-gray-500"
        />
      </a>
      <h1 className="font-bold text-2xl">NYT Games Leaderboard | Mini</h1>
      <div className="flex-1 flex flex-col justify-start items-end gap-2">
        <SyncButton />
        <div className="text-xs text-right text-gray-500">
          Last updated: 9/23/2025, 9:55 PM
        </div>
      </div>
    </div>
  );
}
