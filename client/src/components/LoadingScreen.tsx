// Signal Architecture style reminder: the opening state should feel like an engineering system coming online.

import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-[#090c10] px-6 text-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -18, transition: { duration: 0.48, ease: [0.77, 0, 0.175, 1] } }}
        >
          <div className="w-full max-w-md text-center">
            <motion.div
              className="mb-6 text-[10px] font-bold uppercase tracking-[0.34em] text-[#42e8e0]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Engineering portfolio / 2026
            </motion.div>
            <motion.h1
              className="font-display text-4xl font-bold tracking-[-0.06em] sm:text-6xl"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.45 }}
            >
              YOGAVELAN M D
            </motion.h1>
            <motion.div className="mt-8 h-px overflow-hidden bg-white/15" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.32 }}>
              <motion.div className="h-full bg-[#42e8e0]" initial={{ x: "-100%" }} animate={{ x: "0%" }} transition={{ delay: 0.35, duration: 0.8, ease: "easeInOut" }} />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
