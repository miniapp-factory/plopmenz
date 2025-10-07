"use client";

import { useMiniAppContext } from "./context/miniapp-provider";
import { Button } from "./ui/button";

export function Share({ text }: { text: string }) {
  const { sdk, isInMiniApp } = useMiniAppContext();

  if (!isInMiniApp) {
    return <></>;
  }

  return (
    <Button
      onClick={() => {
        sdk.share({
          text,
        });
      }}
    >
      <span>Share</span>
    </Button>
  );
}
