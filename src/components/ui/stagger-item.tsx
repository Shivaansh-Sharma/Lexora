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

export function StaggerItem({
  children,
  className,
}: Props) {

  return (

    <motion.div

      variants={{
        hidden: {
          opacity: 0,
          y: 20,
        },

        visible: {
          opacity: 1,
          y: 0,
        },
      }}

      transition={{
        duration: 0.45,
        ease: "easeOut",
      }}

      className={className}
    >
      {children}
    </motion.div>
  );
}