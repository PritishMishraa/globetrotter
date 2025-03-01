import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Share2, MapPin } from "lucide-react"

export function LoadingSkeleton() {
  return (
    <Card className="mb-8 border-2 border-blue-200 dark:border-blue-900 shadow-lg rounded-t-xl">
      <CardHeader className="bg-blue-50 dark:bg-slate-800 border-b border-blue-100 dark:border-slate-700 rounded-t-xl">
        <CardTitle className="flex items-center justify-between">
          <div className="h-6 w-48 bg-blue-200/50 dark:bg-slate-700/50 rounded animate-pulse" />
          <Badge variant="outline" className="ml-2 bg-blue-100 dark:bg-blue-900">
            <div className="h-4 w-16 bg-blue-200/50 dark:bg-slate-700/50 rounded animate-pulse" />
          </Badge>
        </CardTitle>
        <CardDescription>
          <div className="h-5 w-64 bg-blue-200/40 dark:bg-slate-700/40 rounded animate-pulse" />
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6">
        {/* Clues skeleton */}
        <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-lg mb-6 shadow-inner">
          <div className="flex items-center mb-4">
            <MapPin className="mr-2 h-5 w-5 text-red-500/50 animate-pulse" />
            <div className="h-6 w-32 bg-slate-200/60 dark:bg-slate-700/60 rounded animate-pulse" />
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="border-l-4 border-blue-300/50 dark:border-blue-700/50 pl-3 py-1"
              >
                <div className="h-4 w-full bg-slate-200/60 dark:bg-slate-700/60 rounded animate-pulse" 
                     style={{ width: `${85 - i * 10}%` }} />
              </div>
            ))}
          </div>
        </div>

        {/* Answer options skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-14 px-4 py-3 bg-slate-100/50 dark:bg-slate-800/50 rounded-md border-2 border-slate-200/50 dark:border-slate-700/50 animate-pulse"
            >
              <div className="flex items-center gap-2">
                <div className="h-4 w-24 bg-slate-200/60 dark:bg-slate-700/60 rounded" />
                <div className="h-3 w-16 bg-slate-200/40 dark:bg-slate-700/40 rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* Feedback area skeleton */}
        <div className="p-4 rounded-lg mb-4 bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-700/50 animate-pulse">
          <div className="flex items-start">
            <div className="rounded-full p-2 mr-3 bg-slate-200/60 dark:bg-slate-700/60">
              <div className="h-5 w-5" />
            </div>
            <div className="space-y-2">
              <div className="h-5 w-32 bg-slate-200/60 dark:bg-slate-700/60 rounded" />
              <div className="h-4 w-64 bg-slate-200/40 dark:bg-slate-700/40 rounded" />
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row gap-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 p-4 rounded-b-xl">
        <div className="w-full sm:w-auto h-9 bg-blue-200/50 dark:bg-blue-900/50 rounded-md animate-pulse" />
        <div className="w-full sm:w-auto h-9 bg-slate-200/50 dark:bg-slate-700/50 rounded-md animate-pulse" />
      </CardFooter>
    </Card>
  )
} 