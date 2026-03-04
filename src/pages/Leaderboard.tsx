import { useQuery } from "@tanstack/react-query";
import { Trophy, Medal, Award, Loader2, AlertCircle, Users } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { leaderboardApi } from "@/lib/api";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function Leaderboard() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: () => leaderboardApi.getLeaderboard(0, 50),
  });

  const entries = data?.content || [];

  // Get rank icon based on position
  const getRankDisplay = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="flex items-center justify-center">
          <Trophy className="h-5 w-5 text-yellow-500" />
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="flex items-center justify-center">
          <Medal className="h-5 w-5 text-gray-400" />
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="flex items-center justify-center">
          <Award className="h-5 w-5 text-amber-600" />
        </div>
      );
    }
    return <span className="text-muted-foreground font-mono">{rank}</span>;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-neon">
              <Trophy className="h-6 w-6 text-background" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gradient">Leaderboard</h1>
              <p className="text-muted-foreground">
                Top coders ranked by problems solved
              </p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Loading leaderboard...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="flex flex-col items-center gap-4 text-center">
              <AlertCircle className="h-12 w-12 text-destructive" />
              <div>
                <h3 className="text-lg font-semibold">Failed to load leaderboard</h3>
                <p className="text-muted-foreground">
                  Please check your connection and try again.
                </p>
              </div>
              <Button onClick={() => refetch()}>Retry</Button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && entries.length === 0 && (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="flex flex-col items-center gap-4 text-center">
              <Users className="h-12 w-12 text-muted-foreground/50" />
              <div>
                <h3 className="text-lg font-semibold">No rankings yet</h3>
                <p className="text-muted-foreground">
                  Be the first to solve problems and appear on the leaderboard!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard Table */}
        {!isLoading && !error && entries.length > 0 && (
          <div className="glass-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-glass-border hover:bg-transparent">
                  <TableHead className="w-20 text-center">Rank</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead className="text-center">Problems Solved</TableHead>
                  {entries[0]?.totalSubmissions !== undefined && (
                    <TableHead className="text-center hidden sm:table-cell">
                      Total Submissions
                    </TableHead>
                  )}
                  {entries[0]?.acceptanceRate !== undefined && (
                    <TableHead className="text-center hidden md:table-cell">
                      Acceptance Rate
                    </TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map((entry, index) => {
                  const rank = entry.rank || index + 1;
                  const isTopThree = rank <= 3;
                  
                  return (
                    <TableRow
                      key={entry.email}
                      className={cn(
                        "border-glass-border transition-colors",
                        isTopThree
                          ? "bg-primary/5 hover:bg-primary/10"
                          : "hover:bg-muted/30"
                      )}
                    >
                      <TableCell className="text-center">
                        {getRankDisplay(rank)}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className={cn(
                            "font-medium",
                            isTopThree && "text-primary"
                          )}>
                            {entry.name || entry.email.split("@")[0]}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {entry.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className={cn(
                          "inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-semibold",
                          isTopThree
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-foreground"
                        )}>
                          {entry.problemsSolved}
                        </span>
                      </TableCell>
                      {entry.totalSubmissions !== undefined && (
                        <TableCell className="text-center text-muted-foreground hidden sm:table-cell">
                          {entry.totalSubmissions}
                        </TableCell>
                      )}
                      {entry.acceptanceRate !== undefined && (
                        <TableCell className="text-center hidden md:table-cell">
                          <span className={cn(
                            "text-sm",
                            entry.acceptanceRate >= 70
                              ? "text-success"
                              : entry.acceptanceRate >= 40
                              ? "text-warning"
                              : "text-muted-foreground"
                          )}>
                            {entry.acceptanceRate.toFixed(1)}%
                          </span>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            
            {/* Total count */}
            {data && data.totalElements > entries.length && (
              <div className="border-t border-glass-border px-4 py-3 text-center text-sm text-muted-foreground">
                Showing top {entries.length} of {data.totalElements} users
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
