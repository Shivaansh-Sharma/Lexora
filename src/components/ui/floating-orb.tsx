"use client";

import {
  motion,
} from "framer-motion";

type Props = {
  className?: string;
};

export function FloatingOrb({
  className,
}: Props) {

  return (

    <motion.div

      animate={{
        y: [0, -25, 0],

        x: [0, 12, 0],
      }}

      transition={{
        duration: 10,

        repeat: Infinity,

        ease: "easeInOut",
      }}

      className={className}
    />
  );
}