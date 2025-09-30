import { GithubLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { SyncButton } from "@/app/ui/buttons";

export default function Header() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-8 py-6 w-full min-h-24 h-fit bg-white border-b border-b-gray-400 gap-8">
      <div className="flex-1">
        <a
          href="https://github.com/eytong56/nyt-games-leaderboard"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex cursor-pointer"
        >
          <GithubLogoIcon
            weight="regular"
            size={24}
            className="hover:text-gray-500"
          />
        </a>
      </div>
      <h1 className="font-bold text-2xl text-left sm:text-center">
        NYT Games Leaderboard <span className="font-light px-1">|</span> Mini
      </h1>
      <div className="flex-1 flex flex-col justify-start items-start sm:items-end gap-2">
        <SyncButton />
        <div className="text-xs text-left sm:text-right text-gray-500">
          Last updated: 9/23/2025, 9:55 PM
        </div>
      </div>
    </div>
  );
}
