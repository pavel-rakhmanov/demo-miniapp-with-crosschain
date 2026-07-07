import {
  backButton,
  closingBehavior,
  init,
  isTMA,
  miniApp,
  themeParams,
  swipeBehavior,
  viewport,
  useSignal,
} from "@tma.js/sdk-react";
import { useCanGoBack } from "@tanstack/react-router";
import * as React from "react";

function TelegramChrome() {
  const isDarkMode = useSignal(miniApp.isDark);

  const canGoBack = useCanGoBack();

  React.useEffect(() => {
    const backButtonClickResult = backButton.onClick.ifAvailable(() => {
      window.history.back();
    });

    return () => {
      if (backButtonClickResult.ok) {
        backButtonClickResult.data();
      }
    };
  }, []);

  React.useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
      return;
    }

    document.body.classList.remove("dark");
  }, [isDarkMode]);

  React.useEffect(() => {
    if (canGoBack) {
      backButton.show.ifAvailable();
      return;
    }

    backButton.hide.ifAvailable();
  }, [canGoBack]);

  return null;
}

export function TelegramMiniAppProvider({ children }: { children: React.ReactNode }) {
  const [isTelegramMiniApp, setIsTelegramMiniApp] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined" || !isTMA()) {
      return;
    }

    setIsTelegramMiniApp(true);

    init();
    miniApp.mount();
    backButton.mount.ifAvailable();
    closingBehavior.mount.ifAvailable();
    swipeBehavior.mount.ifAvailable();

    if (miniApp.mount.isAvailable()) {
      themeParams.mount();
      miniApp.mount();
      themeParams.bindCssVars();
    }

    if (viewport.mount.isAvailable()) {
      viewport.mount().then(() => {
        viewport.bindCssVars();
      });
    }
  }, []);

  return (
    <>
      {children}
      {isTelegramMiniApp ? <TelegramChrome /> : null}
    </>
  );
}
