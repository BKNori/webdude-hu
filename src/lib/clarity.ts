// Microsoft Clarity integration for heatmap and session recording
// src/lib/clarity.ts

declare global {
  interface Window {
    clarity?: (command: string, ...args: unknown[]) => void;
  }
}

export function getClarityScript(projectId: string): string {
  if (!projectId) return "";

  return `
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${projectId}");
  `;
}

export function trackCustomEvent(eventName: string, ...args: unknown[]) {
  if (typeof window === "undefined" || !window.clarity) return;
  window.clarity("event", eventName, ...args);
}

export function identifyUser(userId: string, sessionId?: string) {
  if (typeof window === "undefined" || !window.clarity) return;
  window.clarity("identify", userId, sessionId);
}

export function setCustomTag(key: string, value: string) {
  if (typeof window === "undefined" || !window.clarity) return;
  window.clarity("set", key, value);
}
