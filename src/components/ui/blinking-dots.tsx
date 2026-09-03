import { cn } from "@/lib/utils";

interface BlinkingDotsProps {
  className?: string;
  dotClassName?: string;
  dotCount?: number;
}

export function BlinkingDots({
  className,
  dotClassName,
  dotCount = 3,
}: BlinkingDotsProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: dotCount }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "size-2 rounded-full bg-current animate-pulse",
            dotClassName
          )}
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  );
}
