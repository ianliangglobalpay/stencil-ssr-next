"use client";

import { useEffect } from "react";

// Full page reload when stencil packages are recompiled

const HASH_KEY = "stencil-last-hash";

export function StencilReloader() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const ws = new WebSocket(
      `${protocol}//${window.location.host}/_next/webpack-hmr`
    );

    ws.onmessage = (event) => {
      try {
        const messages = event.data.split("\n").filter(Boolean);
        for (const msg of messages) {
          const data = JSON.parse(msg);

          if (data.action === "built" && data.hash) {
            const lastHash = sessionStorage.getItem(HASH_KEY);
            if (lastHash && lastHash !== data.hash) {
              sessionStorage.setItem(HASH_KEY, data.hash);
              window.location.reload();
              return;
            }
            sessionStorage.setItem(HASH_KEY, data.hash);
          }
        }
      } catch {
        // Ignore parse errors
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  return null;
}
