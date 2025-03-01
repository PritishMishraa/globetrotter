import { MapPin } from "lucide-react"
import type { Destination } from "@/lib/types"

interface ClueDisplayProps {
  destination: Destination
}

export function ClueDisplay({ destination }: ClueDisplayProps) {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-lg mb-6 shadow-inner">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <MapPin className="mr-2 h-5 w-5 text-red-500" />
        Destination Clues
      </h3>
      <ul className="space-y-3">
        {destination.clues.map((clue, index) => (
          <li
            key={index}
            className="text-md italic border-l-4 border-blue-300 dark:border-blue-700 pl-3 py-1"
          >
            &quot;{clue}&quot;
          </li>
        ))}
      </ul>
    </div>
  )
} 