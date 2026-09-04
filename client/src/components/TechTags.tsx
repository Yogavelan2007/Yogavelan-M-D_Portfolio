// TechTags helper component with glowing hover states

export function TechTags({ tags, compact = false }: { tags: string[]; compact?: boolean }) {
  return (
    <div className={`flex flex-wrap ${compact ? "gap-1.5" : "gap-2"}`}>
      {tags.map((tag) => (
        <span
          key={tag}
          className={`rounded-full border border-foreground/15 bg-foreground/[0.04] font-semibold text-foreground/75 transition duration-300 hover:border-signal/60 hover:text-signal hover:shadow-[0_0_12px_rgba(66,232,224,0.25)] ${
            compact ? "px-2.5 py-1 text-[10px]" : "px-3.5 py-1.5 text-xs"
          }`}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
