"use client";

import {
  motion,
} from "framer-motion";

import {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type Props =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;

    className?: string;
  };

export function MotionButton({
  children,
  className,
  ...props
}: Props) {

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

        stiffness: 320,

        damping: 18,
      }}

      className={className}

      {...props}
    >
      {children}
    </motion.button>
  );
}