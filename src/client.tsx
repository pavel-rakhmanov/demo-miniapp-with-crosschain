import "./polyfills";

import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import { StartClient } from "@tanstack/react-start/client";

startTransition(() => {
  hydrateRoot(
    document,
    import.meta.env.DEV ? (
      <StrictMode>
        <StartClient />
      </StrictMode>
    ) : (
      <StartClient />
    ),
  );
});
