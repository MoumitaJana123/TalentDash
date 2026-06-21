// components/ui/LevelBadge.tsx
import { Level } from "@/types/salary";

interface LevelBadgeProps {
  level: Level;
}

const levelStyles: Record<Level, string> = {
  L3: "bg-slate-100 text-slate-700 border-slate-200",
  L4: "bg-blue-100 text-blue-700 border-blue-200",
  L5: "bg-indigo-100 text-indigo-700 border-indigo-200",
  L6: "bg-purple-100 text-purple-700 border-purple-200",
  Principal: "bg-gray-900 text-white border-gray-900",
};

export default function LevelBadge({ level }: LevelBadgeProps) {
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${levelStyles[level]}`}>
      {level}
    </span>
  );
}