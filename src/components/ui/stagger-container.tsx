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

export function StaggerContainer({
  children,
  className,
}: Props) {

  return (

    <motion.div

      initial="hidden"

      animate="visible"

      variants={{
        hidden: {},

        visible: {
          transition: {
            staggerChildren: 0.12,
          },
        },
      }}

      className={className}
    >
      {children}
    </motion.div>
  );
}