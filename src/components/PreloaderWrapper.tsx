"use client";
import { useState } from "react";
import { Preloader } from "./Preloader";

export function PreloaderWrapper() {
  const [ready, setReady] = useState(false);

  if (ready) return null;

  return <Preloader onComplete={() => setReady(true)} />;
}
