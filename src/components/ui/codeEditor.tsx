
import React, { useState } from "react";

import AImodule from "./AIHelper/aimodule";

function CodeEditor() {
  return (
    <div className="flex-1 flex">
      <div className="flex-1 relative">
        <div className="absolute inset-0 bg-background">
          <div className="h-full overflow-auto">
            <div className="flex">
              {/* Line Numbers */}
              <div className="w-12 bg-muted/30 text-muted-foreground text-sm font-mono leading-6 text-right pr-2 py-4 select-none">
                {Array.from({ length: 25 }, (_, i) => (
                  <div key={i + 1}>{i + 1}</div>
                ))}
              </div>
              {/* Code Content */}
              <div className="flex-1 py-4 px-4">
                <pre className="text-sm font-mono leading-6 text-foreground">
                  <code></code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
       <AImodule/>
    </div>
  );
}

export default CodeEditor;
