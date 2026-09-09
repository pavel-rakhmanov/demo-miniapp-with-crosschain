# TON-controlled EVM Telegram Mini App with Omniston

This repository demonstrates how an EVM-native Telegram Mini App flow can be exposed to users through TON wallet authorization, Dynamic WaaS, and Omniston cross-chain transfers.

The code is provided as an integration example. It is not a production-ready application.

The example combines:

- TON wallet connection through TonConnect.
- TON wallet verification and EVM WaaS wallet provisioning through Dynamic.
- Cross-chain liquidity movement between TON and EVM through Omniston.

Omniston is the cross-chain layer used under the hood for quotes, order construction, and settlement tracking.

The user-facing wallet is a TON wallet. The EVM wallet is created through Dynamic WaaS and can be accessed by the application for EVM operations.

## Flow

```txt
TON wallet
  -> TonConnect authorization with tonProof
  -> Dynamic verification
  -> EVM WaaS wallet provisioning
  -> Omniston TON <-> EVM transfers
  -> optional EVM application logic
```

The current demo uses TON USD₮ and Arbitrum USD₮0 to show both directions of the cross-chain flow:

- `Bridge to EVM`: move liquidity from the connected TON wallet to the Dynamic EVM WaaS wallet.
- `Return to TON`: move liquidity from the Dynamic EVM WaaS wallet back to the connected TON wallet.

## Documentation

- [Architecture](./docs/architecture.md) explains the role of TonConnect, Dynamic, and Omniston in this repository.
- [Extending the Example](./docs/extending.md) describes the code areas to inspect when adapting the example for another EVM use case.

## Requirements

- Node.js `>=24 <25`
- pnpm `11.9.0`
- A Dynamic environment configured with TON authentication and EVM WaaS support.
- Arbitrum enabled in the Dynamic environment for the default EVM asset.

## Configuration

Copy `.env.example` to `.env` and set the required values:

```sh
cp .env.example .env
```

```env
VITE_DYNAMIC_ENVIRONMENT_ID=
VITE_OMNISTON_INTEGRATOR_ADDRESS_ON_TON=
VITE_OMNISTON_INTEGRATOR_ADDRESS_ON_EVM=
```

Optional endpoints can be overridden when needed:

```env
VITE_STON_API_BASE_URL=
VITE_OMNISTON_API_URL=
VITE_TONCONNECT_MANIFEST_URL=
```

If `VITE_TONCONNECT_MANIFEST_URL` is not provided, the app serves a manifest from `/tonconnect-manifest.json`.

## Development

Install dependencies:

```sh
pnpm install
```

Start the development server:

```sh
pnpm dev
```

Build and type-check:

```sh
pnpm build
```

## Key Files

- `src/providers/wallet-auth-provider.tsx`: TON wallet authorization, Dynamic verification, and EVM WaaS provisioning.
- `src/hooks/use-cross-chain-swap-flow.ts`: Omniston quote, order, settlement, and signing flows.
- `src/components/dynamic-wallet-section.tsx`: UI entry points for TON-to-EVM and EVM-to-TON transfers.
- `src/constants.ts`: demo asset configuration.
- `src/routes/_public/tonconnect-manifest[.]json.ts`: default TonConnect manifest route.
