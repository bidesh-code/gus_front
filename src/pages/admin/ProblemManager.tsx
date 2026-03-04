import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Loader2,
  Save,
  ChevronRight,
  FileCode,
  TestTube,
  AlertCircle,
  Pencil,
  Upload,
  FileJson,
  X,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import {
  problemsApi,
  CreateProblemRequest,
  CreateTestCaseRequest,
  Problem,
  TestCase,
} from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Auto-generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type FormMode = "create" | "edit" | null;

export default function ProblemManager() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // For dev access - remove in production
  const isAdmin = user?.role === "ADMIN" || true; // Allow dev access

  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [formMode, setFormMode] = useState<FormMode>(null);

  // Fetch all problems
  const { data: problemsData, isLoading: loadingProblems } = useQuery({
    queryKey: ["admin-problems"],
    queryFn: () => problemsApi.getAll(0, 100),
  });

  // Delete problem mutation
  const deleteProblemMutation = useMutation({
    mutationFn: (problemId: string) => problemsApi.delete(problemId),
    onSuccess: () => {
      toast({ title: "Problem Deleted" });
      setSelectedProblem(null);
      queryClient.invalidateQueries({ queryKey: ["admin-problems"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to Delete",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (!isAdmin) {
    return (
      <Layout>
        <div className="container mx-auto flex h-[60vh] items-center justify-center">
          <div className="text-center">
            <AlertCircle className="mx-auto h-16 w-16 text-destructive" />
            <h1 className="mt-4 text-2xl font-bold">Access Denied</h1>
            <p className="mt-2 text-muted-foreground">
              You don't have permission to access the admin panel.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Problem Manager</h1>
            <p className="mt-1 text-muted-foreground">
              Create and manage coding problems and test cases
            </p>
          </div>
          <Button
            onClick={() => {
              setFormMode("create");
              setSelectedProblem(null);
            }}
            className="btn-neon text-foreground"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Problem
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left: Problem List */}
          <Card className="glass-card border-glass-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCode className="h-5 w-5 text-primary" />
                Problems ({problemsData?.content?.length || 0})
              </CardTitle>
              <CardDescription>
                Select a problem to manage its test cases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                {loadingProblems ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : (
                  <div className="space-y-2">
                    {problemsData?.content?.map((problem) => (
                      <ProblemListItem
                        key={problem.id}
                        problem={problem}
                        isSelected={selectedProblem?.id === problem.id}
                        onSelect={() => {
                          setSelectedProblem(problem);
                          setFormMode(null);
                        }}
                        onEdit={() => {
                          setSelectedProblem(problem);
                          setFormMode("edit");
                        }}
                        onDelete={() => deleteProblemMutation.mutate(problem.id)}
                        isDeleting={deleteProblemMutation.isPending}
                      />
                    ))}
                    {(!problemsData?.content || problemsData.content.length === 0) && (
                      <p className="py-8 text-center text-muted-foreground">
                        No problems yet. Create your first one!
                      </p>
                    )}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Right: Create/Edit Form or Test Case Manager */}
          {formMode === "create" ? (
            <ProblemForm
              mode="create"
              onSuccess={(problem) => {
                setFormMode(null);
                setSelectedProblem(problem);
                queryClient.invalidateQueries({ queryKey: ["admin-problems"] });
              }}
              onCancel={() => setFormMode(null)}
            />
          ) : formMode === "edit" && selectedProblem ? (
            <ProblemForm
              mode="edit"
              problem={selectedProblem}
              onSuccess={(problem) => {
                setFormMode(null);
                setSelectedProblem(problem);
                queryClient.invalidateQueries({ queryKey: ["admin-problems"] });
              }}
              onCancel={() => setFormMode(null)}
            />
          ) : selectedProblem ? (
            <TestCaseManager problem={selectedProblem} />
          ) : (
            <Card className="glass-card border-glass-border flex items-center justify-center">
              <div className="py-16 text-center">
                <TestTube className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">
                  Select a problem to manage test cases
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
}

// Problem List Item with Edit/Delete
function ProblemListItem({
  problem,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  isDeleting,
}: {
  problem: Problem;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
  isDeleting: boolean;
}) {
  const difficultyClass = {
    EASY: "badge-easy",
    MEDIUM: "badge-medium",
    HARD: "badge-hard",
  };

  return (
    <div
      className={cn(
        "rounded-lg border p-3 transition-all",
        isSelected
          ? "border-primary bg-primary/10"
          : "border-glass-border bg-glass-bg/30 hover:bg-glass-bg/50"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <button onClick={onSelect} className="flex-1 text-left">
          <h3 className="font-medium">{problem.title || problem.slug}</h3>
          <p className="mt-1 text-xs text-muted-foreground font-mono">
            /{problem.slug}
          </p>
        </button>
        <div className="flex items-center gap-1">
          <Badge className={difficultyClass[problem.difficulty]}>
            {problem.difficulty}
          </Badge>
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7 text-destructive hover:text-destructive"
                onClick={(e) => e.stopPropagation()}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Problem?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete "{problem.title || problem.slug}" and all its test cases. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={onDelete}
                  disabled={isDeleting}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeleting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      {problem.tags && problem.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {problem.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

// Unified Problem Form (Create/Edit)
function ProblemForm({
  mode,
  problem,
  onSuccess,
  onCancel,
}: {
  mode: "create" | "edit";
  problem?: Problem;
  onSuccess: (problem: Problem) => void;
  onCancel: () => void;
}) {
  const { toast } = useToast();
  const [title, setTitle] = useState(problem?.title || "");
  const [description, setDescription] = useState(problem?.description || "");
  const [difficulty, setDifficulty] = useState<"EASY" | "MEDIUM" | "HARD">(
    problem?.difficulty || "EASY"
  );
  const [tags, setTags] = useState(problem?.tags?.join(", ") || "");
  const [cpuLimit, setCpuLimit] = useState("2000");
  const [memoryLimit, setMemoryLimit] = useState("256000");
  const [starterCode, setStarterCode] = useState(
    problem?.starterCode?.java || ""
  );
  const [starterLang, setStarterLang] = useState("java");

  const slug = mode === "create" ? generateSlug(title) : problem?.slug || "";

  const createMutation = useMutation({
    mutationFn: (data: CreateProblemRequest) => problemsApi.create(data),
    onSuccess: (newProblem) => {
      toast({ title: "Problem Created", description: `Created "${newProblem.title}"` });
      onSuccess(newProblem);
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to Create",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: Partial<CreateProblemRequest>) =>
      problemsApi.update(problem!.id, data),
    onSuccess: (updatedProblem) => {
      toast({ title: "Problem Updated", description: `Updated "${updatedProblem.title}"` });
      onSuccess(updatedProblem);
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to Update",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const isPending = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      toast({
        title: "Validation Error",
        description: "Title and description are required",
        variant: "destructive",
      });
      return;
    }

    const starterCodeObj: Record<string, string> = {};
    if (starterCode.trim()) {
      starterCodeObj[starterLang] = starterCode;
    }

    const data = {
      title: title.trim(),
      slug: mode === "create" ? slug : undefined,
      description: description.trim(),
      difficulty,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      cpuLimit: parseInt(cpuLimit) || 2000,
      memoryLimit: parseInt(memoryLimit) || 256000,
      starterCode: Object.keys(starterCodeObj).length > 0 ? starterCodeObj : undefined,
    };

    if (mode === "create") {
      createMutation.mutate(data as CreateProblemRequest);
    } else {
      updateMutation.mutate(data);
    }
  };

  return (
    <Card className="glass-card border-glass-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {mode === "create" ? (
            <Plus className="h-5 w-5 text-neon-cyan" />
          ) : (
            <Pencil className="h-5 w-5 text-neon-purple" />
          )}
          {mode === "create" ? "Create New Problem" : "Edit Problem"}
        </CardTitle>
        <CardDescription>
          {mode === "create"
            ? "Fill in the details to create a new coding problem"
            : `Editing: ${problem?.title || problem?.slug}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title & Slug */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Merge Sort"
              className="bg-glass-bg/50 border-glass-border"
            />
            {slug && (
              <p className="text-xs text-muted-foreground">
                Slug: <code className="rounded bg-muted px-1">{slug}</code>
                {mode === "edit" && " (read-only)"}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (Markdown)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Problem description with examples..."
              rows={6}
              className="bg-glass-bg/50 border-glass-border font-mono text-sm"
            />
          </div>

          {/* Difficulty & Tags */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Difficulty</Label>
              <Select value={difficulty} onValueChange={(v) => setDifficulty(v as typeof difficulty)}>
                <SelectTrigger className="bg-glass-bg/50 border-glass-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border-border">
                  <SelectItem value="EASY">Easy</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="HARD">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Array, Sorting, Divide & Conquer"
                className="bg-glass-bg/50 border-glass-border"
              />
            </div>
          </div>

          {/* Limits */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="cpuLimit">CPU Limit (ms)</Label>
              <Input
                id="cpuLimit"
                type="number"
                value={cpuLimit}
                onChange={(e) => setCpuLimit(e.target.value)}
                className="bg-glass-bg/50 border-glass-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="memoryLimit">Memory Limit (KB)</Label>
              <Input
                id="memoryLimit"
                type="number"
                value={memoryLimit}
                onChange={(e) => setMemoryLimit(e.target.value)}
                className="bg-glass-bg/50 border-glass-border"
              />
            </div>
          </div>

          {/* Starter Code */}
          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <ChevronRight className="mr-2 h-4 w-4 transition-transform [[data-state=open]>&]:rotate-90" />
                Starter Code (Optional)
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 pt-2">
              <Select value={starterLang} onValueChange={setStarterLang}>
                <SelectTrigger className="w-32 bg-glass-bg/50 border-glass-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border-border">
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="cpp">C++</SelectItem>
                </SelectContent>
              </Select>
              <Textarea
                value={starterCode}
                onChange={(e) => setStarterCode(e.target.value)}
                placeholder="public class Solution { ... }"
                rows={8}
                className="bg-glass-bg/50 border-glass-border font-mono text-sm"
              />
            </CollapsibleContent>
          </Collapsible>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="btn-neon text-foreground flex-1"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {mode === "create" ? "Creating..." : "Saving..."}
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {mode === "create" ? "Create Problem" : "Save Changes"}
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

// Test Case Manager with Delete Confirmation and Bulk Import
function TestCaseManager({ problem }: { problem: Problem }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [bulkImportText, setBulkImportText] = useState("");
  const [testCases, setTestCases] = useState<Array<{
    id?: string;
    input: string;
    expectedOutput: string;
    hidden: boolean;
    isNew?: boolean;
  }>>([]);

  // Fetch existing test cases
  const { data: fetchedTestCases, isLoading: loadingTestCases } = useQuery({
    queryKey: ["test-cases", problem.id],
    queryFn: () => problemsApi.getTestCases(problem.id),
    enabled: !!problem.id,
  });

  // Sync fetched test cases to local state
  useEffect(() => {
    if (fetchedTestCases) {
      setTestCases(
        fetchedTestCases.map((tc, idx) => ({
          id: `tc-${idx}`,
          input: tc.input,
          expectedOutput: tc.output,
          hidden: tc.hidden || false,
        }))
      );
    }
  }, [fetchedTestCases]);

  const addTestCaseMutation = useMutation({
    mutationFn: (data: CreateTestCaseRequest) =>
      problemsApi.addTestCase(problem.id, data),
    onSuccess: () => {
      toast({ title: "Test Case Added" });
      queryClient.invalidateQueries({ queryKey: ["test-cases", problem.id] });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to Add Test Case",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteTestCaseMutation = useMutation({
    mutationFn: (testCaseId: string) =>
      problemsApi.deleteTestCase(problem.id, testCaseId),
    onSuccess: () => {
      toast({ title: "Test Case Deleted" });
      queryClient.invalidateQueries({ queryKey: ["test-cases", problem.id] });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to Delete Test Case",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const addNewTestCase = () => {
    setTestCases([
      ...testCases,
      { input: "", expectedOutput: "", hidden: false, isNew: true },
    ]);
  };

  const updateTestCase = (index: number, field: string, value: string | boolean) => {
    const updated = [...testCases];
    updated[index] = { ...updated[index], [field]: value };
    setTestCases(updated);
  };

  const removeTestCase = (index: number) => {
    const tc = testCases[index];
    if (tc.isNew) {
      // Just remove from local state
      setTestCases(testCases.filter((_, i) => i !== index));
    }
  };

  const saveTestCase = (index: number) => {
    const tc = testCases[index];
    if (!tc.input.trim() || !tc.expectedOutput.trim()) {
      toast({
        title: "Validation Error",
        description: "Input and expected output are required",
        variant: "destructive",
      });
      return;
    }

    addTestCaseMutation.mutate({
      input: tc.input.trim(),
      expectedOutput: tc.expectedOutput.trim(),
      hidden: tc.hidden,
    });
  };

  // Bulk import handlers
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setBulkImportText(content);
      setShowBulkImport(true);
    };
    reader.readAsText(file);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const processBulkImport = async () => {
    try {
      let parsed: Array<{ input: string; expectedOutput?: string; expected_output?: string; output?: string; hidden?: boolean }>;
      
      // Try JSON first
      try {
        parsed = JSON.parse(bulkImportText);
      } catch {
        // Try CSV format: input,expectedOutput,hidden
        const lines = bulkImportText.trim().split("\n");
        const hasHeader = lines[0]?.toLowerCase().includes("input");
        const dataLines = hasHeader ? lines.slice(1) : lines;
        
        parsed = dataLines.map((line) => {
          const parts = line.split(",").map((p) => p.trim());
          return {
            input: parts[0] || "",
            expectedOutput: parts[1] || "",
            hidden: parts[2]?.toLowerCase() === "true",
          };
        });
      }

      if (!Array.isArray(parsed) || parsed.length === 0) {
        throw new Error("Invalid format");
      }

      // Add each test case
      let added = 0;
      for (const tc of parsed) {
        const expectedOutput = tc.expectedOutput || tc.expected_output || tc.output || "";
        if (tc.input && expectedOutput) {
          await problemsApi.addTestCase(problem.id, {
            input: tc.input,
            expectedOutput,
            hidden: tc.hidden || false,
          });
          added++;
        }
      }

      toast({ title: "Bulk Import Complete", description: `Added ${added} test cases` });
      setShowBulkImport(false);
      setBulkImportText("");
      queryClient.invalidateQueries({ queryKey: ["test-cases", problem.id] });
    } catch (error) {
      toast({
        title: "Import Failed",
        description: "Invalid JSON or CSV format. See expected format in dialog.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Card className="glass-card border-glass-border">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="h-5 w-5 text-neon-purple" />
                Test Cases
              </CardTitle>
              <CardDescription>
                Managing test cases for: <strong>{problem.title || problem.slug}</strong>
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,.csv,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mr-1 h-4 w-4" />
                Import
              </Button>
              <Button size="sm" onClick={addNewTestCase} variant="outline">
                <Plus className="mr-1 h-4 w-4" />
                Add
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[450px]">
            {loadingTestCases ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : testCases.length === 0 ? (
              <div className="py-12 text-center">
                <TestTube className="mx-auto h-10 w-10 text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">No test cases yet</p>
                <div className="mt-4 flex justify-center gap-2">
                  <Button size="sm" onClick={addNewTestCase}>
                    <Plus className="mr-1 h-4 w-4" />
                    Add Test Case
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="mr-1 h-4 w-4" />
                    Bulk Import
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {testCases.map((tc, index) => (
                  <div
                    key={tc.id || index}
                    className="rounded-lg border border-glass-border bg-glass-bg/30 p-4"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          Test Case #{index + 1}
                        </span>
                        {tc.hidden ? (
                          <Badge variant="secondary" className="text-xs">
                            <EyeOff className="mr-1 h-3 w-3" />
                            Hidden
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs">
                            <Eye className="mr-1 h-3 w-3" />
                            Visible
                          </Badge>
                        )}
                        {tc.isNew && (
                          <Badge className="bg-neon-cyan/20 text-neon-cyan text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        {tc.isNew && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => saveTestCase(index)}
                            disabled={addTestCaseMutation.isPending}
                            className="text-success hover:text-success"
                          >
                            <Save className="h-4 w-4" />
                          </Button>
                        )}
                        {tc.isNew ? (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeTestCase(index)}
                            className="text-destructive hover:text-destructive"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        ) : (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Test Case?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete test case #{index + 1}. This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => tc.id && deleteTestCaseMutation.mutate(tc.id)}
                                  disabled={deleteTestCaseMutation.isPending}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">Input</Label>
                        <Textarea
                          value={tc.input}
                          onChange={(e) => updateTestCase(index, "input", e.target.value)}
                          placeholder="5&#10;1 2 3 4 5"
                          rows={3}
                          className="bg-background/50 border-border font-mono text-sm"
                          disabled={!tc.isNew}
                        />
                      </div>

                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">
                          Expected Output
                        </Label>
                        <Textarea
                          value={tc.expectedOutput}
                          onChange={(e) =>
                            updateTestCase(index, "expectedOutput", e.target.value)
                          }
                          placeholder="15"
                          rows={2}
                          className="bg-background/50 border-border font-mono text-sm"
                          disabled={!tc.isNew}
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={`hidden-${index}`}
                          checked={tc.hidden}
                          onCheckedChange={(checked) =>
                            updateTestCase(index, "hidden", !!checked)
                          }
                          disabled={!tc.isNew}
                        />
                        <Label
                          htmlFor={`hidden-${index}`}
                          className="text-sm cursor-pointer"
                        >
                          Hidden test case (used for grading, not shown to users)
                        </Label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Bulk Import Dialog */}
      <Dialog open={showBulkImport} onOpenChange={setShowBulkImport}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileJson className="h-5 w-5" />
              Bulk Import Test Cases
            </DialogTitle>
            <DialogDescription>
              Paste or edit JSON/CSV content below. Expected formats:
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="rounded-lg bg-muted p-3">
                <p className="font-semibold mb-1">JSON Format:</p>
                <pre className="text-muted-foreground overflow-auto">
{`[
  {"input": "5", "expectedOutput": "120", "hidden": false},
  {"input": "10", "expectedOutput": "3628800", "hidden": true}
]`}
                </pre>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <p className="font-semibold mb-1">CSV Format:</p>
                <pre className="text-muted-foreground overflow-auto">
{`input,expectedOutput,hidden
5,120,false
10,3628800,true`}
                </pre>
              </div>
            </div>
            
            <Textarea
              value={bulkImportText}
              onChange={(e) => setBulkImportText(e.target.value)}
              placeholder="Paste JSON or CSV content here..."
              rows={10}
              className="font-mono text-sm"
            />
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowBulkImport(false)}>
              Cancel
            </Button>
            <Button onClick={processBulkImport}>
              <Upload className="mr-2 h-4 w-4" />
              Import Test Cases
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
