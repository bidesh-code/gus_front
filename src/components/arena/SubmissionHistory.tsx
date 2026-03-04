import { Loader2, CheckCircle2, XCircle, Clock, Cpu, History } from "lucide-react";
import { useSubmissionHistory, formatTimeAgo, getCompactVerdictInfo, getExecutionTime } from "@/hooks/useSubmissionHistory";
import { cn } from "@/lib/utils";

interface SubmissionHistoryProps {
  problemId: string;
  onRefresh?: () => void;
}

export function SubmissionHistory({ problemId }: SubmissionHistoryProps) {
  const { data, isLoading, error, refetch } = useSubmissionHistory({ problemId });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-2 py-8 text-center">
        <XCircle className="h-6 w-6 text-destructive" />
        <p className="text-sm text-muted-foreground">Failed to load history</p>
        <button 
          onClick={() => refetch()} 
          className="text-sm text-primary hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  const submissions = data?.content || [];

  if (submissions.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-8 text-center">
        <History className="h-8 w-8 text-muted-foreground/50" />
        <p className="text-sm text-muted-foreground">No submissions yet</p>
        <p className="text-xs text-muted-foreground/70">
          Submit your code to see your history here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {submissions.map((submission) => {
        const verdictInfo = getCompactVerdictInfo(submission.verdict);
        const execTime = getExecutionTime(submission);
        
        return (
          <div
            key={submission.id}
            className="flex items-center justify-between rounded-lg border border-glass-border bg-glass-bg/30 p-3 transition-colors hover:bg-glass-bg/50"
          >
            {/* Left: Verdict & Language */}
            <div className="flex items-center gap-3">
              {/* Verdict Icon */}
              <div className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg",
                verdictInfo.className
              )}>
                {submission.verdict === "AC" ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : submission.verdict ? (
                  <XCircle className="h-4 w-4" />
                ) : (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
              </div>
              
              {/* Verdict Text */}
              <div>
                <div className={cn("text-sm font-medium", verdictInfo.className.split(" ")[0])}>
                  {verdictInfo.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {submission.language}
                </div>
              </div>
            </div>

            {/* Right: Stats & Time */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              {/* Execution Time (supports both executionTime and runtime) */}
              {execTime !== undefined && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{execTime} ms</span>
                </div>
              )}
              
              {/* Memory */}
              {submission.memory !== undefined && (
                <div className="flex items-center gap-1">
                  <Cpu className="h-3 w-3" />
                  <span>{(submission.memory / 1024).toFixed(1)} MB</span>
                </div>
              )}
              
              {/* Time Ago */}
              <div className="w-16 text-right">
                {formatTimeAgo(submission.createdAt)}
              </div>
            </div>
          </div>
        );
      })}
      
      {/* Total count */}
      {data && data.totalElements > submissions.length && (
        <p className="pt-2 text-center text-xs text-muted-foreground">
          Showing {submissions.length} of {data.totalElements} submissions
        </p>
      )}
    </div>
  );
}
