import {
  CircleNotchIcon,
  CaretLeftIcon,
  CaretRightIcon,
} from "@phosphor-icons/react/dist/ssr";

export function SyncButton() {
  return (
    <>
      <button className="flex flex-row justify-center items-center bg-white py-2 w-30 gap-2 rounded-full border border-gray-700 hover:bg-neutral-200 cursor-pointer">
        <CircleNotchIcon className="hidden" />
        <div> Sync</div>
      </button>
    </>
  );
}

export function NavButton({ direction }: { direction: "left" | "right" }) {
  const icon =
    direction === "left" ? (
      <CaretLeftIcon size={24} />
    ) : (
      <CaretRightIcon size={24} />
    );
  return <button className="w-12 h-12 flex justify-center items-center bg-white rounded-full border border-gray-400 cursor-pointer hover:bg-neutral-200">{icon}</button>;
}
