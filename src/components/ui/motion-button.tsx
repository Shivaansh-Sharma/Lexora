"use client";

import { motion }
from "framer-motion";

import type {
  ReactNode,
  ButtonHTMLAttributes,
} from "react";

type MotionButtonProps =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
  };

export function MotionButton({
  children,
  className,
  ...props
}: MotionButtonProps) {

  return (

    <motion.button

      whileHover={{
        scale: 1.02,
      }}

      whileTap={{
        scale: 0.98,
      }}

      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}

      className={className}

      {...(props as any)}
    >

      {children}

    </motion.button>
  );
}