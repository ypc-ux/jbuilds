"use client";

import { useState } from "react";

export function WaitlistForm({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong.");
      }
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "done") {
    return (
      <div className={className}>
        <p className="text-base font-medium text-zinc-50">
          You&apos;re on the list. We&apos;ll email you when access opens.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="h-12 w-full flex-1 rounded-md border border-zinc-700 bg-zinc-950 px-4 text-base text-zinc-50 placeholder:text-zinc-500 focus:border-zinc-400 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="h-12 shrink-0 rounded-md bg-zinc-50 px-6 text-base font-semibold text-black transition-colors hover:bg-zinc-200 disabled:opacity-60"
        >
          {status === "loading" ? "Joining..." : "Get early access"}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-sm text-red-400">{error}</p>
      )}
    </form>
  );
}
