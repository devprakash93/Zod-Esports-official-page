import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "h2" | "h3";
};

export function Reveal({ children, delay = 0, y = 24, className = "", as: Tag = "div" }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      // @ts-expect-error -- ref typing across union element types
      ref={ref}
      style={{
        transform: visible ? "translate3d(0,0,0)" : `translate3d(0, ${y}px, 0)`,
        opacity: visible ? 1 : 0,
        transition: `transform 900ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, opacity 700ms ease-out ${delay}ms`,
        willChange: "transform, opacity",
      }}
      className={className}
    >
      {children}
    </Tag>
  );
}