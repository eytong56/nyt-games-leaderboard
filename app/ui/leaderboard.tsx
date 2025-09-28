export default function Leaderboard() {
  const formatRow = ({
    rank,
    user,
    stat,
  }: {
    rank: number;
    user: string;
    stat: string;
  }) => {
    return (
      <tr className={`${rank === 1 ? "font-bold" : ""}`}>
        <td className="py-1 w-1/5">{rank}</td>
        <td className="px-2">{user}</td>
        <td className="font-normal text-gray-500 text-right">{stat}</td>
      </tr>
    );
  };
  return (
    <table className="w-full min-w-max table-auto">
      <tbody className="divide-y divide-gray-200">
        {formatRow({ rank: 1, user: "shapes", stat: "0:32" })}
        {formatRow({ rank: 2, user: "tcng", stat: "1:08" })}
      </tbody>
    </table>
  );
}
