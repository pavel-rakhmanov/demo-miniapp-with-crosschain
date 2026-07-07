# 1.Telegram Mini App integration

> Adjust this application to be a proper Telegram Mini App using `@tma.js` packages that suit the current codebase. Wire the app for a best-in-class Telegram Mini App experience with only the necessary Telegram functionality: SDK initialization, theme mode integration where actually needed, viewport expansion, safe-area/viewport CSS vars, back button handling integrated with the router, closing behavior, vertical swipe disabling, and Telegram chrome colors where appropriate. Do not invent custom visual styling, extra layout. Rely on Telegram-provided CSS variables and Telegram UI’s own styles, with only minimal reset styles and only the minimum shell CSS needed for correct Mini App behavior.

# 2. TonConnect integration

> add `@tonconnect` integration to this telegram-mini app using the official starting guide https://docs.ton.org/applications/ton-connect/get-started. Add `TonConnectButton` to the app layout for wallet connect/disconnect flows but do not add create any other UI elements for wallet-related information displaying. We only need a ton-connect as authentication mechanism for now. Ask me a question about how `tonconnect-manifest.json` file required for Ton connect initialization will be provided to the app if it is not directly clear from current application structure. Before asking a question about `tonconnect-manifest.json` file coincide all requirements for this file content/location to be a valid manifest file for Ton connect. This information explained in the official doc https://docs.ton.org/applications/ton-connect/get-started#1-prepare-the-manifest

# 3. Dynamic integration for TON auth -> EVM WaaS

> add Dynamic as the underlying auth and wallet provisioning layer, but keep the user experience fully in the native TonConnect UI. Follow the official React quickstart wording and provider setup from https://www.dynamic.xyz/docs/javascript/reference/react-quickstart.
>
> Required extra setup:
>
> - global `Buffer` polyfill, because Dynamic use Buffer calls;
> - TanStack Query context, because Dynamic React hooks require the Query client context.

Dynamic supports a simpler integration with its pre-defined TON plugin, where Dynamic owns the wallet selection flow and works with a single TON wallet path. This demo shows a more complex but optional approach: when the native TonConnect UI is used for the user-facing auth flow, then use Dynamic underneath to verify the TON session and provision the linked EVM WaaS wallet.
