// 型は満たしつつ、実験フラグの未公開キーだけ型チェックを抑制する
import type { NextConfig } from "next";

const nextConfig = {
  output: "standalone",
  experimental: {
    // @ts-expect-error: not yet in public NextConfig types, but supported at runtime
    trustHostHeader: true,
  },
} satisfies NextConfig;

export default nextConfig;
