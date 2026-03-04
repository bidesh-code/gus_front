

# Fix: API URL + Code Cleanup

## Changes

### 1. `src/lib/api.ts` - Restore Local API URL (Line 3)
Change:
```
const API_BASE_URL = "https://liftable-unusefully-anisa.ngrok-free.dev";
```
To:
```
const API_BASE_URL = "http://localhost:8080";
```

### 2. `src/pages/Arena.tsx` - Verify ref guard correctness
After reviewing the code, the `useRef` guards (`runningRef`, `submittingRef`) are already correctly implemented -- they are only used in `handleRun` and `handleSubmit` logic, and are **not** passed as `ref` props to any UI components. The `forwardRef` wrappers on `EditorToolbar` and `ConsolePanel` are also correct and cause no warnings.

No changes needed in Arena.tsx -- the double-submit protection is already clean and correct.

## Summary
Only one file needs editing: updating the API base URL in `api.ts` from the ngrok tunnel back to `localhost:8080`.

