import { Entry, User } from "@/app/lib/definitions";
import { formatSeconds } from "@/app/lib/utils";

function missingUser(user: User) {
  return {
    user: user,
    stat: -1,
    rank: -1,
  };
}

export default function Leaderboard({
  entries,
  type,
}: {
  entries: Entry[] | undefined;
  type: "count" | "seconds";
}) {
  if (!entries) {
    // return <div className="text-gray-500 text-sm">No entries available</div>;
    entries = [missingUser("shapes"), missingUser("tcng")];
  }
  if (entries.length === 1) {
    entries.push(missingUser(entries[0].user == "shapes" ? "tcng" : "shapes"));
  }

  const rows = entries.map((entry, index) => {
    const { user, stat, rank } = entry;
    return (
      <tr
        key={`${user}-${index}`}
        className={`${rank === 1 ? "font-bold" : ""}`}
      >
        <td className="py-1 w-1/5">{rank !== -1 ? rank : "\u00B7"}</td>
        <td className="px-2">{user}</td>
        <td className="font-normal text-gray-500 text-right">
          {type === "count" ? stat : stat !== -1 ? formatSeconds(stat) : "—"}
        </td>
      </tr>
    );
  });
  return (
    <table className="w-full min-w-max table-auto">
      <tbody className="divide-y divide-gray-200">{rows}</tbody>
    </table>
  );
}
