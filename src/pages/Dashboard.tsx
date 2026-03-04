import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { LayoutGrid, List, Search, Loader2, AlertCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { problemsApi, normalizeProblem, Problem } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ViewMode = "cards" | "table";
type DifficultyFilter = "ALL" | "EASY" | "MEDIUM" | "HARD";

const STORAGE_KEY = "gusion_dashboard_view";

export default function Dashboard() {
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return (stored as ViewMode) || "cards";
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>("ALL");

  // Persist view preference
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, viewMode);
  }, [viewMode]);

  const {
    data: problemsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["problems"],
    queryFn: () => problemsApi.getAll(),
  });

  // Normalize and filter problems
  const problems =
    problemsData?.content?.map(normalizeProblem) || [];

  const filteredProblems = problems.filter((problem) => {
    const matchesSearch =
      problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty =
      difficultyFilter === "ALL" || problem.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gradient">Problem Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Practice coding problems and improve your skills with AI-powered feedback
          </p>
        </div>

        {/* Filters & Controls */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-glass-border bg-glass-bg/50 pl-10"
              />
            </div>

            {/* Difficulty Filter */}
            <Select
              value={difficultyFilter}
              onValueChange={(value) => setDifficultyFilter(value as DifficultyFilter)}
            >
              <SelectTrigger className="w-32 border-glass-border bg-glass-bg/50">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent className="glass-card border-glass-border">
                <SelectItem value="ALL">All</SelectItem>
                <SelectItem value="EASY">Easy</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HARD">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 rounded-lg border border-glass-border bg-glass-bg/50 p-1">
            <Button
              variant={viewMode === "cards" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("cards")}
              className={viewMode === "cards" ? "bg-primary" : ""}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "table" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("table")}
              className={viewMode === "table" ? "bg-primary" : ""}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Loading problems...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="flex flex-col items-center gap-4 text-center">
              <AlertCircle className="h-12 w-12 text-destructive" />
              <div>
                <h3 className="text-lg font-semibold">Failed to load problems</h3>
                <p className="text-muted-foreground">
                  Please check your connection and try again.
                </p>
              </div>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
          </div>
        )}

        {/* Problems List */}
        {!isLoading && !error && (
          <>
            {filteredProblems.length === 0 ? (
              <div className="flex min-h-[300px] items-center justify-center">
                <p className="text-muted-foreground">No problems found matching your criteria.</p>
              </div>
            ) : viewMode === "cards" ? (
              <ProblemCards problems={filteredProblems} />
            ) : (
              <ProblemTable problems={filteredProblems} />
            )}
          </>
        )}
      </div>
    </Layout>
  );
}

function DifficultyBadge({ difficulty }: { difficulty: Problem["difficulty"] }) {
  const variants: Record<Problem["difficulty"], string> = {
    EASY: "badge-easy",
    MEDIUM: "badge-medium",
    HARD: "badge-hard",
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[difficulty]}`}>
      {difficulty.charAt(0) + difficulty.slice(1).toLowerCase()}
    </span>
  );
}

function ProblemCards({ problems }: { problems: ReturnType<typeof normalizeProblem>[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {problems.map((problem, index) => (
        <Link
          key={problem.id || problem.slug}
          to={`/problem/${problem.slug}`}
          className="glass-card-hover group p-6"
        >
          <div className="mb-4 flex items-start justify-between">
            <span className="text-sm text-muted-foreground">#{index + 1}</span>
            <DifficultyBadge difficulty={problem.difficulty} />
          </div>

          <h3 className="mb-2 text-lg font-semibold transition-colors group-hover:text-primary">
            {problem.title}
          </h3>

          <div className="mt-4 flex flex-wrap gap-2">
            {problem.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-muted/50 text-xs"
              >
                {tag}
              </Badge>
            ))}
            {problem.tags.length > 3 && (
              <Badge variant="secondary" className="bg-muted/50 text-xs">
                +{problem.tags.length - 3}
              </Badge>
            )}
          </div>

          {problem.acceptanceRate !== undefined && (
            <div className="mt-4 text-sm text-muted-foreground">
              Acceptance: {problem.acceptanceRate.toFixed(1)}%
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}

function ProblemTable({ problems }: { problems: ReturnType<typeof normalizeProblem>[] }) {
  return (
    <div className="glass-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-glass-border hover:bg-transparent">
            <TableHead className="w-16">#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="w-24">Difficulty</TableHead>
            <TableHead className="hidden md:table-cell">Tags</TableHead>
            <TableHead className="w-24 hidden sm:table-cell">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {problems.map((problem, index) => (
            <TableRow
              key={problem.id || problem.slug}
              className="border-glass-border transition-colors hover:bg-muted/30"
            >
              <TableCell className="font-mono text-muted-foreground">
                {index + 1}
              </TableCell>
              <TableCell>
                <Link
                  to={`/problem/${problem.slug}`}
                  className="font-medium transition-colors hover:text-primary"
                >
                  {problem.title}
                </Link>
              </TableCell>
              <TableCell>
                <DifficultyBadge difficulty={problem.difficulty} />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex flex-wrap gap-1">
                  {problem.tags.slice(0, 2).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-muted/50 text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {problem.tags.length > 2 && (
                    <span className="text-xs text-muted-foreground">
                      +{problem.tags.length - 2}
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <span className="text-muted-foreground">—</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
