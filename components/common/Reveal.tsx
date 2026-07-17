"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds, useful for sequential card grids. */
  delay?: number;
  direction?: "up" | "none";
}

export default function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const offset = shouldReduceMotion ? 0 : direction === "up" ? 20 : 0;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: offset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
