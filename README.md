# TON-controlled EVM Telegram Mini App with Omniston

This repository demonstrates how an EVM-native Telegram Mini App flow can be exposed to users through TON wallet authorization, Dynamic WaaS, and Omniston cross-chain transfers.

The code is provided as an integration example. It is not a production-ready application.

The example combines:

- TON wallet connection through TonConnect.
- EVM wallet creation with Dynamic WaaS (Wallet-as-a-Service).
- Cross-chain liquidity movement between TON and EVM through Omniston.

Omniston is the cross-chain layer used under the hood for quotes, order construction, and settlement tracking.

The user-facing wallet is a TON wallet. The EVM wallet is created and accessed through Dynamic WaaS for EVM operations.

## Flow

```txt
TON wallet
  -> TonConnect initialization
  -> Dynamic initialization
  -> TON wallet connect with Dynamic nonce
  -> EVM wallet creation with Dynamic WaaS
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
- A [Dynamic environment](https://app.dynamic.xyz/dashboard/developer/api) configured with TON authentication and EVM WaaS support.
- Arbitrum enabled in the Dynamic environment for the default EVM asset.

## Configuration

Copy `.env.example` to `.env` and set the required value:

```sh
cp .env.example .env
```

```env
VITE_DYNAMIC_ENVIRONMENT_ID=
```

Optional values:

```env
VITE_OMNISTON_INTEGRATOR_ADDRESS_ON_TON=
VITE_OMNISTON_INTEGRATOR_ADDRESS_ON_EVM=
VITE_STON_API_BASE_URL=
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
