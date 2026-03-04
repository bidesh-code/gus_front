import * as React from "react";
import MonacoEditorReact from "@monaco-editor/react";

import { cn } from "@/lib/utils";

export type MonacoEditorProps = React.ComponentProps<typeof MonacoEditorReact> & {
  /** Optional class applied to the outer wrapper div (the element that receives the ref). */
  containerClassName?: string;
};

/**
 * Wraps @monaco-editor/react with a ref-friendly outer div.
 * This prevents "Function components cannot be given refs" warnings when
 * an upstream wrapper tries to attach a ref to the editor component.
 */
const MonacoEditor = React.forwardRef<HTMLDivElement, MonacoEditorProps>(
  ({ containerClassName, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("h-full w-full", containerClassName)}>
        <MonacoEditorReact className={className} {...props} />
      </div>
    );
  },
);

MonacoEditor.displayName = "MonacoEditor";

export default MonacoEditor;
