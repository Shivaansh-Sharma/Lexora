"use client";

import {
  motion,
} from "framer-motion";

import {
  ReactNode,
} from "react";

type Props = {
  children: ReactNode;

  className?: string;
};

export function MotionCard({
  children,
  className,
}: Props) {

  return (

    <motion.div

      whileHover={{
        y: -6,

        scale: 1.01,
      }}

      transition={{
        type: "spring",

        stiffness: 260,

        damping: 18,
      }}

      className={className}
    >
      {children}
    </motion.div>
  );
}