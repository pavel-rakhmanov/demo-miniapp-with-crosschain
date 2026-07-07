import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  ClientOnly,
} from "@tanstack/react-router";
import { OmnistonProvider, Omniston } from "@ston-fi/omniston-sdk-react";
import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";
import * as React from "react";

import { DynamicSdkProvider } from "~/providers/dynamic-provider";
import { TelegramMiniAppProvider } from "~/providers/telegram-mini-app-provider";
import { TonConnectProvider } from "~/providers/ton-connect-provider";
import { WalletAuthProvider } from "~/providers/wallet-auth-provider";
import { OMNISTON_API_URL } from "~/constants";

import appCss from "~/styles/app.css?url";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover",
      },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const { queryClient } = Route.useRouteContext();

  const [omniston] = React.useState(
    () =>
      new Omniston({
        apiUrl: OMNISTON_API_URL,
        logger: console,
      }),
  );

  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <ClientOnly>
            <TelegramMiniAppProvider>
              <TonConnectProvider>
                <DynamicSdkProvider>
                  <OmnistonProvider omniston={omniston}>
                    <WalletAuthProvider>{children}</WalletAuthProvider>
                  </OmnistonProvider>
                </DynamicSdkProvider>
              </TonConnectProvider>
            </TelegramMiniAppProvider>
          </ClientOnly>
        </QueryClientProvider>

        <Scripts />
      </body>
    </html>
  );
}
