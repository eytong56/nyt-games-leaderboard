import { CrownSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import { User } from "@/app/lib/definitions";
import { IconWeight } from "@phosphor-icons/react";

export default function Crown({ winner }: { winner: User | "tie" | "none" }) {
  let weight : IconWeight = "regular";
  let color = "black";
  switch (winner) {
    case "tie":
      weight = "fill";
      color = "#99A1AF";
      break;
    case "shapes":
      weight = "fill";
      color = "#F7DA21";
      break;
    case "tcng":
      weight = "fill";
      color = "#95BEFA";
      break;
  }
  return <CrownSimpleIcon weight={weight} size={24} color={color} />;
}
