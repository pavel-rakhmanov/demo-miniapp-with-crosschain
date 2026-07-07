import { createFileRoute } from "@tanstack/react-router";
import { MoveDown, MoveUp } from "lucide-react";

import { TonWalletSection } from "~/components/ton-wallet-section";
import { DynamicWalletSection } from "~/components/dynamic-wallet-section";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <main className="container mx-auto flex flex-col items-center p-4 *:w-full">
      <TonWalletSection />
      <SectionSeparator />
      <DynamicWalletSection />
    </main>
  );
}

function SectionSeparator() {
  return (
    <div className="grid grid-cols-2 my-2">
      <span className="flex justify-center">
        <MoveDown className="size-4 text-muted-foreground" />
      </span>
      <span className="flex justify-center">
        <MoveUp className="size-4 text-muted-foreground" />
      </span>
    </div>
  );
}
