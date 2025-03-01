import { Globe } from "lucide-react"

export function Header() {
  return (
    <header className="flex flex-col items-center justify-center mb-8 text-center">
      <div className="flex items-center gap-2 mb-2">
        <Globe className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400">Globetrotter</h1>
      </div>
      <p className="text-lg text-slate-600 dark:text-slate-300">
        Test your knowledge of world destinations!
      </p>
    </header>
  )
} 