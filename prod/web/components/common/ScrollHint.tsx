'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function ScrollHint() {
   return (
      <div className="flex flex-col items-center -space-y-2">
         <motion.div
            className="text-muted-foreground"
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: 40, opacity: 0 }}
            transition={{
               duration: 4,
               repeat: Infinity,
               repeatType: 'loop',
               ease: 'easeInOut',
            }}
         >
            <ChevronDown size={40} />
         </motion.div>
      </div>
   );
}
