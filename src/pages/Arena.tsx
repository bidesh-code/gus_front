import { useState, useEffect, useRef, forwardRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import MonacoEditor from "@/components/arena/MonacoEditor";
import {
  Play,
  Send,
  RotateCcw,
  Lightbulb,
  ChevronLeft,
  Loader2,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock,
  Cpu,
  X,
  Sparkles,
  Save,
  Cloud,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { problemsApi, normalizeProblem, TestCase } from "@/lib/api";
import { useSubmission, getVerdictInfo, getStatusInfo } from "@/hooks/useSubmission";
import { useAIHint } from "@/hooks/useAIHint";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useRunCode } from "@/hooks/useRunCode";
import { useCodePersistence, formatSaveTime } from "@/hooks/useCodePersistence";
import { SubmissionHistory } from "@/components/arena/SubmissionHistory";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const SUPPORTED_LANGUAGES = [
  { value: "JAVA", label: "Java", monaco: "java" },
  { value: "PYTHON", label: "Python", monaco: "python" },
  { value: "JAVASCRIPT", label: "JavaScript", monaco: "javascript" },
  { value: "TYPESCRIPT", label: "TypeScript", monaco: "typescript" },
  { value: "CPP", label: "C++", monaco: "cpp" },
  { value: "GO", label: "Go", monaco: "go" },
];

// Smart Language Templates - Hybrid boilerplate with solve() function focus
const LANGUAGE_TEMPLATES: Record<string, string> = {
  "JAVA": `import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) {
        // ---------------------------------------------------------
        // Boilerplate: Handles Input/Output. Write your logic in 'solve'.
        // ---------------------------------------------------------
        Scanner scanner = new Scanner(System.in);
        solve(scanner);
    }

    // ✅ WRITE YOUR LOGIC HERE
    public static void solve(Scanner scanner) {
        // TODO: Read input using 'scanner' and print output
        // Example: int n = scanner.nextInt();
        // System.out.println(n);
        
    }
}`,

  "PYTHON": `import sys

# ✅ WRITE YOUR LOGIC HERE
def solve():
    # TODO: Read input from sys.stdin and print output
    # Example: lines = sys.stdin.readlines()
    pass

if __name__ == "__main__":
    # ---------------------------------------------------------
    # Boilerplate: Calls the solve function.
    # ---------------------------------------------------------
    solve()`,

  "CPP": `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

using namespace std;

// ✅ WRITE YOUR LOGIC HERE
void solve() {
    // TODO: Read input using cin and print output
    // Example: int n; cin >> n;
    
}

int main() {
    // ---------------------------------------------------------
    // Boilerplate: Faster I/O and calls solve().
    // ---------------------------------------------------------
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    solve();
    return 0;
}`
};

export default function Arena() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [language, setLanguage] = useState("JAVA");
  const [code, setCode] = useState("");
  const [activeTab, setActiveTab] = useState<"input" | "output" | "verdict">("input");
  const [showHintPanel, setShowHintPanel] = useState(false);
  const [customInput, setCustomInput] = useState("1 2");

  const { data: problem, isLoading, error } = useQuery({
    queryKey: ["problem", slug],
    queryFn: () => problemsApi.getBySlug(slug!),
    enabled: !!slug,
  });

  const normalizedProblem = problem ? normalizeProblem(problem) : null;

  // Set default custom input from first example
  useEffect(() => {
    if (problem?.examples?.[0]?.input) {
      setCustomInput(problem.examples[0].input);
    }
  }, [problem]);

  const { analysis, revealedLevel, isLoading: isHintLoading, error: hintError, fetchAnalysis, revealNextLevel, clearAnalysis, maxLevel } = useAIHint({
    problemId: problem?.id || "",
  });

  const submission = useSubmission({
    onComplete: (result) => {
      setActiveTab("verdict");
      if (problem?.id) {
        queryClient.invalidateQueries({ queryKey: ["submissionHistory", problem.id] });
      }
      // Auto-fetch AI analysis on wrong answer
      if (result.verdict && result.verdict !== "AC" && result.submissionId) {
        setShowHintPanel(true);
        fetchAnalysis(result.submissionId);
      }
    },
  });

  const runCode = useRunCode();

  // Code persistence
  const codePersistence = useCodePersistence(problem?.id || "", language);

  // Detect OS for keyboard shortcut display
  const isMac = typeof navigator !== "undefined" && navigator.platform.toUpperCase().indexOf("MAC") >= 0;
  const modKey = isMac ? "⌘" : "Ctrl";

  // Set initial code from saved code, starter code, or language template
  useEffect(() => {
    if (!problem) return;

    // 1. Check saved code
    const saved = codePersistence.loadSavedCode();
    if (saved && saved.language === language && saved.code.trim().length > 0) {
      setCode(saved.code);
      return;
    }

    // 2. Check Problem Starter Code (Backend provided)
    if (problem.starterCode) {
      // Handle both "java" and "Java" keys if they exist
      const starter = problem.starterCode[language] || problem.starterCode[language.toLowerCase()];
      if (starter && starter.trim()) {
        setCode(starter);
        return;
      }
    }

    // 3. Fallback to Local Templates (Force Uppercase Lookup)
    const langKey = language.toUpperCase();
    const template = LANGUAGE_TEMPLATES[langKey];
    
    if (template) {
      setCode(template);
    } else {
      setCode(`// No starter code available for ${language}`);
    }
  }, [problem, language]);

  // Auto-save code as user types
  useEffect(() => {
    if (code && problem?.id) {
      codePersistence.saveCode(code);
    }
  }, [code, problem?.id]);

  const runningRef = useRef(false);
  const submittingRef = useRef(false);

  const handleRun = async () => {
    if (!problem?.id || !code.trim() || runningRef.current) return;
    runningRef.current = true;
    setActiveTab("output");
    try {
      await runCode.run(problem.id, language, code, customInput);
    } finally {
      runningRef.current = false;
    }
  };

  const handleSubmit = async () => {
    if (!problem?.id || !code.trim() || submittingRef.current) return;
    submittingRef.current = true;
    setActiveTab("verdict");
    runCode.reset();
    try {
      await submission.submit(problem.id, language, code);
    } finally {
      submittingRef.current = false;
    }
  };

  const handleReset = () => {
    if (problem?.starterCode) {
      const langKey = language.toLowerCase();
      setCode(problem.starterCode[langKey] || problem.starterCode[language] || "");
      // Clear saved code when resetting
      codePersistence.clearSavedCode();
    }
    submission.reset();
    runCode.reset();
  };

  const handleGetHint = () => {
    setShowHintPanel(true);
    // If we have a submission but no analysis yet, fetch it
    if (submission.submissionId && !analysis && !isHintLoading) {
      fetchAnalysis(submission.submissionId);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMod = isMac ? e.metaKey : e.ctrlKey;
      
      // Ctrl/Cmd + Enter = Run
      if (isMod && e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (!runCode.isRunning && !submission.isSubmitting) {
          handleRun();
        }
      }
      
      // Ctrl/Cmd + Shift + Enter = Submit
      if (isMod && e.shiftKey && e.key === "Enter") {
        e.preventDefault();
        if (!submission.isSubmitting && !runCode.isRunning) {
          handleSubmit();
        }
      }
      
      // Ctrl/Cmd + H = Hint
      if (isMod && e.key === "h") {
        e.preventDefault();
        handleGetHint();
      }
      
      // Escape = Close hint panel
      if (e.key === "Escape" && showHintPanel) {
        e.preventDefault();
        setShowHintPanel(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMac, showHintPanel, runCode.isRunning, submission.isSubmitting, problem?.id, code, language]);

  if (isLoading) {
    return (
      <Layout showFooter={false}>
        <div className="flex h-[calc(100vh-64px)] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (error || !normalizedProblem) {
    return (
      <Layout showFooter={false}>
        <div className="flex h-[calc(100vh-64px)] flex-col items-center justify-center gap-4">
          <AlertCircle className="h-12 w-12 text-destructive" />
          <h2 className="text-xl font-semibold">Problem not found</h2>
          <Button onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showFooter={false}>
      <div className="h-[calc(100vh-64px)]">
        {/* Desktop: Resizable Split Layout */}
        <div className="hidden h-full md:block">
          <ResizablePanelGroup direction="horizontal">
            {/* Left Panel: Problem Description */}
            <ResizablePanel defaultSize={40} minSize={25}>
              <ProblemPanel problem={normalizedProblem} onBack={() => navigate("/dashboard")} />
            </ResizablePanel>

            <ResizableHandle className="w-2 bg-border/50 hover:bg-primary/50 transition-colors" />

            {/* Right Panel: Editor + Console */}
            <ResizablePanel defaultSize={60} minSize={35}>
              <div className="flex h-full flex-col">
                {/* Editor Toolbar */}
                <EditorToolbar
                  language={language}
                  onLanguageChange={setLanguage}
                  onRun={handleRun}
                  onSubmit={handleSubmit}
                  onReset={handleReset}
                  onHint={handleGetHint}
                  isSubmitting={submission.isSubmitting}
                  isRunning={runCode.isRunning}
                  modKey={modKey}
                  isSaving={codePersistence.isSaving}
                  lastSaved={codePersistence.lastSaved}
                />

                {/* Code Editor */}
                <div className="flex-1 border-b border-border">
                  <MonacoEditor
                    height="100%"
                    language={SUPPORTED_LANGUAGES.find((l) => l.value === language)?.monaco || "java"}
                    value={code}
                    onChange={(value) => setCode(value || "")}
                    theme="vs-dark"
                    options={{
                      fontSize: 14,
                      fontFamily: "'JetBrains Mono', monospace",
                      minimap: { enabled: false },
                      padding: { top: 16 },
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                    }}
                  />
                </div>

                {/* Console Panel */}
                <ConsolePanel
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  customInput={customInput}
                  onCustomInputChange={setCustomInput}
                  submission={submission}
                  output={runCode.output}
                  runError={runCode.error}
                  isRunning={runCode.isRunning}
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        {/* Mobile: Stacked Layout */}
        <div className="flex h-full flex-col md:hidden">
          <ScrollArea className="flex-1">
            <ProblemPanel problem={normalizedProblem} onBack={() => navigate("/dashboard")} />
          </ScrollArea>

          <div className="border-t border-border">
            <EditorToolbar
              language={language}
              onLanguageChange={setLanguage}
              onRun={handleRun}
              onSubmit={handleSubmit}
              onReset={handleReset}
              onHint={handleGetHint}
              isSubmitting={submission.isSubmitting}
              isRunning={runCode.isRunning}
              modKey={modKey}
              isSaving={codePersistence.isSaving}
              lastSaved={codePersistence.lastSaved}
              compact
            />
          </div>

          <div className="h-64 border-t border-border">
            <MonacoEditor
              height="100%"
              language={SUPPORTED_LANGUAGES.find((l) => l.value === language)?.monaco || "java"}
              value={code}
              onChange={(value) => setCode(value || "")}
              theme="vs-dark"
              options={{
                fontSize: 13,
                fontFamily: "'JetBrains Mono', monospace",
                minimap: { enabled: false },
                padding: { top: 8 },
                scrollBeyondLastLine: false,
              }}
            />
          </div>

          <div className="h-48 border-t border-border">
            <ConsolePanel
              activeTab={activeTab}
              onTabChange={setActiveTab}
              customInput={customInput}
              onCustomInputChange={setCustomInput}
              submission={submission}
              output={runCode.output}
              runError={runCode.error}
              isRunning={runCode.isRunning}
              compact
            />
          </div>
        </div>

        {/* AI Hint Panel (Overlay) */}
        {showHintPanel && (
          <HintPanel
            analysis={analysis}
            isLoading={isHintLoading}
            error={hintError}
            revealedLevel={revealedLevel}
            maxLevel={maxLevel}
            onClose={() => {
              setShowHintPanel(false);
            }}
            onRevealNext={revealNextLevel}
            onRetry={() => submission.submissionId ? fetchAnalysis(submission.submissionId) : undefined}
          />
        )}
      </div>
    </Layout>
  );
}

// Problem Description Panel
function ProblemPanel({
  problem,
  onBack,
}: {
  problem: ReturnType<typeof normalizeProblem>;
  onBack: () => void;
}) {
  const difficultyClass = {
    EASY: "badge-easy",
    MEDIUM: "badge-medium",
    HARD: "badge-hard",
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-6">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Problems
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-3">
            <h1 className="text-2xl font-bold">{problem.title}</h1>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${difficultyClass[problem.difficulty]}`}>
              {problem.difficulty.charAt(0) + problem.difficulty.slice(1).toLowerCase()}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {problem.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-muted/50">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="prose prose-invert max-w-none">
          <div className="mb-6 text-foreground/90 leading-relaxed whitespace-pre-wrap">
            {problem.description || "No description available."}
          </div>

          {/* Examples */}
          {problem.examples && problem.examples.length > 0 && (
            <div className="mb-6">
              <h3 className="mb-3 text-lg font-semibold">Examples</h3>
              {problem.examples.map((example, idx) => (
                <div key={idx} className="mb-4 rounded-lg bg-muted/30 p-4">
                  <div className="mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Input:</span>
                    <pre className="mt-1 rounded bg-background/50 p-2 text-sm font-mono">
                      {example.input}
                    </pre>
                  </div>
                  <div className="mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Output:</span>
                    <pre className="mt-1 rounded bg-background/50 p-2 text-sm font-mono">
                      {example.output}
                    </pre>
                  </div>
                  {example.explanation && (
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Explanation:</span>
                      <p className="mt-1 text-sm text-foreground/80">{example.explanation}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Constraints */}
          {problem.constraints && problem.constraints.length > 0 && (
            <div>
              <h3 className="mb-3 text-lg font-semibold">Constraints</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-foreground/80">
                {problem.constraints.map((constraint, idx) => (
                  <li key={idx} className="font-mono">{constraint}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </ScrollArea>
  );
}

// Keyboard shortcut badge component
function KbdBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <kbd className={cn(
      "ml-1.5 hidden rounded bg-muted/50 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline-block",
      className
    )}>
      {children}
    </kbd>
  );
}

// Editor Toolbar
interface EditorToolbarProps {
  language: string;
  onLanguageChange: (lang: string) => void;
  onRun: () => void;
  onSubmit: () => void;
  onReset: () => void;
  onHint: () => void;
  isSubmitting: boolean;
  isRunning: boolean;
  modKey: string;
  isSaving?: boolean;
  lastSaved?: Date | null;
  compact?: boolean;
}

const EditorToolbar = forwardRef<HTMLDivElement, EditorToolbarProps>(({
  language,
  onLanguageChange,
  onRun,
  onSubmit,
  onReset,
  onHint,
  isSubmitting,
  isRunning,
  modKey,
  isSaving = false,
  lastSaved = null,
  compact = false,
}, ref) => {
  return (
    <div ref={ref} className={cn("flex items-center justify-between border-b border-border bg-card/50 px-4", compact ? "py-2" : "py-3")}>
      {/* Language Selector + Save Status */}
      <div className="flex items-center gap-3">
        <Select value={language} onValueChange={onLanguageChange}>
          <SelectTrigger className="w-32 border-glass-border bg-glass-bg/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="glass-card border-glass-border">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Save Status Indicator */}
        {!compact && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            {isSaving ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin" />
                <span>Saving...</span>
              </>
            ) : lastSaved ? (
              <>
                <Cloud className="h-3 w-3 text-success" />
                <span>Saved {formatSaveTime(lastSaved)}</span>
              </>
            ) : null}
          </div>
        )}

        {/* Template Helper Text */}
        {!compact && LANGUAGE_TEMPLATES[language] && (
          <span className="text-xs text-muted-foreground italic">
            Main is pre-configured. Focus on <code className="text-neon-cyan">solve()</code>
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size={compact ? "sm" : "default"}
          onClick={onHint}
          className="text-neon-cyan hover:text-neon-cyan hover:bg-neon-cyan/10"
        >
          <Lightbulb className="h-4 w-4 mr-1" />
          {!compact && "Hint"}
          {!compact && <KbdBadge>{modKey}+H</KbdBadge>}
        </Button>

        <Button variant="ghost" size={compact ? "sm" : "default"} onClick={onReset}>
          <RotateCcw className="h-4 w-4 mr-1" />
          {!compact && "Reset"}
        </Button>

        {/* Run Button */}
        <Button
          variant="outline"
          size={compact ? "sm" : "default"}
          onClick={onRun}
          disabled={isRunning || isSubmitting}
          className="border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10 hover:border-neon-cyan"
        >
          {isRunning ? (
            <>
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
              {!compact && "Running..."}
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-1" />
              {!compact && "Run"}
              {!compact && <KbdBadge>{modKey}+↵</KbdBadge>}
            </>
          )}
        </Button>

        {/* Submit Button */}
        <Button
          size={compact ? "sm" : "default"}
          onClick={onSubmit}
          disabled={isSubmitting || isRunning}
          className="btn-neon text-foreground"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
              {!compact && "Submitting..."}
            </>
          ) : (
            <>
              <Send className="h-4 w-4 mr-1" />
              {!compact && "Submit"}
              {!compact && <KbdBadge className="bg-primary/20">{modKey}+⇧+↵</KbdBadge>}
            </>
          )}
        </Button>
      </div>
    </div>
  );
});

// Console Panel with Playground-style Tabs (Input/Output/Verdict)

interface ConsolePanelProps {
  activeTab: "input" | "output" | "verdict";
  onTabChange: (tab: "input" | "output" | "verdict") => void;
  customInput: string;
  onCustomInputChange: (value: string) => void;
  submission: ReturnType<typeof useSubmission>;
  output: string | null;
  runError: string | null;
  isRunning: boolean;
  compact?: boolean;
}

const ConsolePanel = forwardRef<HTMLDivElement, ConsolePanelProps>(({
  activeTab,
  onTabChange,
  customInput,
  onCustomInputChange,
  submission,
  output,
  runError,
  isRunning,
  compact = false,
}, ref) => {
  return (
    <div ref={ref} className={cn("flex flex-col bg-card/30", compact ? "h-full" : "h-48")}>
      <Tabs value={activeTab} onValueChange={(v) => onTabChange(v as "input" | "output" | "verdict")} className="flex h-full flex-col">
        <TabsList className="h-10 w-full justify-start rounded-none border-b border-border bg-transparent px-2">
          <TabsTrigger value="input" className="data-[state=active]:bg-muted">
            Input
          </TabsTrigger>
          <TabsTrigger value="output" className="data-[state=active]:bg-muted">
            Output
            {output && !isRunning && (
              <CheckCircle2 className="ml-1.5 h-3 w-3 text-success" />
            )}
          </TabsTrigger>
          <TabsTrigger value="verdict" className="data-[state=active]:bg-muted">
            Verdict
            {submission.result?.verdict && (
              submission.result.verdict === "AC" 
                ? <CheckCircle2 className="ml-1.5 h-3 w-3 text-success" />
                : <XCircle className="ml-1.5 h-3 w-3 text-destructive" />
            )}
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          {/* Input Tab */}
          <TabsContent value="input" className="m-0 h-full">
            <textarea
              value={customInput}
              onChange={(e) => onCustomInputChange(e.target.value)}
              placeholder="Enter your custom input here..."
              className="h-full w-full resize-none bg-background p-4 font-mono text-sm focus:outline-none"
              spellCheck={false}
            />
          </TabsContent>

          {/* Output Tab */}
          <TabsContent value="output" className="m-0 p-4">
            <div className="h-full"><OutputDisplay output={output} error={runError} isRunning={isRunning} /></div>
          </TabsContent>

          {/* Verdict Tab */}
          <TabsContent value="verdict" className="m-0 p-4">
            <div className="h-full"><VerdictDisplay submission={submission} /></div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
});

// Output Display (Raw stdout from /api/run)
const OutputDisplay = forwardRef<HTMLDivElement, {
  output: string | null;
  error: string | null;
  isRunning: boolean;
}>(({ output, error, isRunning }, ref) => {
  if (isRunning) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Running...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-destructive">
          <XCircle className="h-5 w-5" />
          <span className="font-medium">Error</span>
        </div>
        <pre className="rounded-lg bg-destructive/10 p-3 text-sm font-mono text-destructive overflow-x-auto whitespace-pre-wrap">
          {error}
        </pre>
      </div>
    );
  }

  if (!output) {
    return (
      <p className="text-sm text-muted-foreground">
        Click "Run" to execute your code with the custom input.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-success">
        <CheckCircle2 className="h-5 w-5" />
        <span className="font-medium">Output</span>
      </div>
      <pre className="rounded-lg bg-muted/30 p-3 text-sm font-mono overflow-x-auto whitespace-pre-wrap">
        {output}
      </pre>
    </div>
  );
});
OutputDisplay.displayName = "OutputDisplay";

// Verdict Display (Formal result from /api/submit)
const VerdictDisplay = forwardRef<HTMLDivElement, { submission: ReturnType<typeof useSubmission> }>(({ submission }, ref) => {
  const { status, result, isSubmitting, error } = submission;

  if (error) {
    return (
      <div className="flex items-center gap-2 text-destructive">
        <XCircle className="h-5 w-5" />
        <span>{error}</span>
      </div>
    );
  }

  if (!status && !isSubmitting) {
    return <p className="text-sm text-muted-foreground">Submit your code to see the verdict.</p>;
  }

  // Status Stepper
  const steps = ["QUEUED", "COMPILING", "RUNNING", "COMPLETED"] as const;
  const currentStep = status ? getStatusInfo(status).step : 0;

  return (
    <div className="space-y-4">
      {/* Progress Stepper */}
      <div className="flex items-center gap-2">
        {steps.map((step, idx) => {
          const isActive = idx === currentStep && status !== "COMPLETED";
          const isComplete = idx < currentStep || status === "COMPLETED";
          
          return (
            <div key={step} className="flex items-center gap-2">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-all",
                  isComplete
                    ? "bg-success text-success-foreground"
                    : isActive
                    ? "bg-primary text-primary-foreground animate-pulse"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {isComplete ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : isActive ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  idx + 1
                )}
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 w-8 transition-colors",
                    isComplete ? "bg-success" : "bg-muted"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Verdict Banner */}
      {result && result.verdict && (
        <div className={cn(
          "rounded-lg border p-4",
          result.verdict === "AC" 
            ? "border-success/30 bg-success/10" 
            : "border-destructive/30 bg-destructive/10"
        )}>
          <div className="flex items-center gap-3">
            {result.verdict === "AC" ? (
              <CheckCircle2 className="h-8 w-8 text-success" />
            ) : (
              <XCircle className="h-8 w-8 text-destructive" />
            )}
            <div>
              <h3 className={cn("text-lg font-semibold", getVerdictInfo(result.verdict).color)}>
                {getVerdictInfo(result.verdict).label}
              </h3>
              <p className="text-sm text-muted-foreground">
                {getVerdictInfo(result.verdict).description}
              </p>
            </div>
          </div>

          {/* Runtime & Memory */}
          {(result.runtime !== undefined || result.memory !== undefined) && (
            <div className="mt-4 flex gap-6 text-sm">
              {result.runtime !== undefined && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{result.runtime} ms</span>
                </div>
              )}
              {result.memory !== undefined && (
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-muted-foreground" />
                  <span>{(result.memory / 1024).toFixed(1)} MB</span>
                </div>
              )}
            </div>
          )}

          {/* Failed Test Case */}
          {result.failedTestCase && (
            <div className="mt-4 rounded-lg bg-destructive/10 p-3">
              <h4 className="mb-2 text-sm font-medium text-destructive">Failed Test Case</h4>
              <div className="space-y-1 text-sm font-mono">
                <div>
                  <span className="text-muted-foreground">Input: </span>
                  {result.failedTestCase.input}
                </div>
                <div>
                  <span className="text-muted-foreground">Expected: </span>
                  {result.failedTestCase.expected}
                </div>
                <div>
                  <span className="text-muted-foreground">Your Output: </span>
                  {result.failedTestCase.actual}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
});
VerdictDisplay.displayName = "VerdictDisplay";

// Typewriter text block
function TypewriterText({ text }: { text: string }) {
  const { displayed, isTyping } = useTypewriter({ text, speed: 18 });
  return (
    <p className="font-mono text-sm leading-relaxed whitespace-pre-wrap text-emerald-400">
      <span className="text-emerald-600 select-none">{'> '}</span>
      {displayed}
      {isTyping && <span className="animate-pulse text-emerald-300">▊</span>}
    </p>
  );
}

// AI Hint Panel (Overlay) – Progressive Reveal
function HintPanel({
  analysis,
  isLoading,
  error,
  revealedLevel,
  maxLevel,
  onClose,
  onRevealNext,
  onRetry,
}: {
  analysis: import("@/hooks/useAIHint").AIAnalysisResponse | null;
  isLoading: boolean;
  error: string | null;
  revealedLevel: number;
  maxLevel: number;
  onClose: () => void;
  onRevealNext: () => void;
  onRetry: () => void;
}) {
  const hints = analysis
    ? [analysis.hintLevel1, analysis.hintLevel2, analysis.hintLevel3].filter(Boolean)
    : [];

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[420px] max-w-[calc(100vw-32px)]">
      <div className="overflow-hidden rounded-lg border border-emerald-500/30 bg-slate-950/95 shadow-[0_0_30px_rgba(16,185,129,0.15)] backdrop-blur-xl">
        {/* Header – terminal style */}
        <div className="flex items-center justify-between border-b border-emerald-500/20 bg-slate-900/80 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="ml-2">
              <h3 className="font-mono text-sm font-bold text-emerald-400">AI_MENTOR.exe</h3>
              <p className="font-mono text-[10px] text-emerald-600">
                {analysis ? `[HINTS ${revealedLevel}/${maxLevel}]` : "[STANDBY]"}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-emerald-500 hover:text-emerald-300 hover:bg-emerald-500/10">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <ScrollArea className="h-80 p-4">
          {error ? (
            <div className="flex flex-col items-center gap-3 py-4 text-center">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <p className="font-mono text-sm text-red-400">[ERROR] {error}</p>
              <Button size="sm" onClick={onRetry} className="border-emerald-500/50 bg-emerald-500/10 font-mono text-emerald-400 hover:bg-emerald-500/20">
                $ retry --force
              </Button>
            </div>
          ) : isLoading ? (
            <div className="flex items-center gap-2 font-mono text-sm text-emerald-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="animate-pulse">Analyzing submission...</span>
            </div>
          ) : analysis ? (
            <div className="space-y-4">
              {/* Feedback – always shown */}
              <div>
                <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-cyan-500 mb-1.5">
                  {'// FEEDBACK'}
                </h4>
                <TypewriterText text={analysis.feedback} />
              </div>

              {/* Complexity – always shown */}
              {analysis.complexity && (
                <div>
                  <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-cyan-500 mb-1.5">
                    {'// COMPLEXITY'}
                  </h4>
                  <span className="inline-block rounded border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 font-mono text-xs text-cyan-400">
                    {analysis.complexity}
                  </span>
                </div>
              )}

              {/* Progressive hint levels */}
              {hints.map((hintText, idx) => {
                const level = idx + 1;
                if (level > revealedLevel) return null;
                return (
                  <div key={level} className="border-t border-emerald-500/15 pt-3">
                    <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-yellow-500 mb-1.5">
                      {'// HINT_LEVEL_'}{level}
                    </h4>
                    <TypewriterText text={hintText} />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-2 py-4">
              <p className="font-mono text-sm text-emerald-600">
                {'>'} Awaiting submission data...
              </p>
              <p className="font-mono text-xs text-emerald-700">
                Submit your code first. The AI Mentor will analyze your attempt and provide progressive hints.
              </p>
            </div>
          )}
        </ScrollArea>

        {/* Footer – reveal next hint level */}
        {analysis && !isLoading && revealedLevel < Math.min(hints.length, maxLevel) && (
          <div className="border-t border-emerald-500/20 bg-slate-900/60 px-4 py-3">
            <Button
              size="sm"
              variant="outline"
              onClick={onRevealNext}
              className="w-full border-emerald-500/40 bg-emerald-500/5 font-mono text-emerald-400 hover:bg-emerald-500/15 hover:border-emerald-400"
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              $ unlock --hint-level {revealedLevel + 1}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
