import { NavButton } from "@/app/ui/buttons";
export default function Navigation() {
  return <div className="flex flex-row justify-between gap-16">
    <NavButton direction="left" />
    <div className="px-4 py-3 rounded-lg border border-black bg-white">September 15 - 21, 2025</div>
    <NavButton direction="right" />
  </div>;
}
