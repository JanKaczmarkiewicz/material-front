import React from "react";

export default function createContext<A>() {
  const ctx = React.createContext<A | undefined>(undefined);
  const useCtx = () => {
    const c = React.useContext(ctx);
    if (!c) throw new Error("useCtx must be inside a Provider with a value");
    return c;
  };
  return [useCtx, ctx.Provider] as const;
}

export function useContext<T>(value: T) {
  return React.createContext<T>(value);
}
