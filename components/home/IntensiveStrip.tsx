"use client";

import { motion } from "motion/react";
import Link from "next/link";

const courses = ["3 Days", "5 Days", "7 Days", "10 Days"];

export default function IntensiveStrip() {
  return (
    <div className="text-center">
      <p className="text-xs font-semibold text-on-primary/70 mb-4 uppercase tracking-wider">
        Fast-Track Intensive Courses Available
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {courses.map((course, i) => (
          <motion.div
            key={course}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: 0.5,
              delay: i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Link
              href="/intensive-courses"
              className="group relative inline-flex items-center overflow-hidden rounded-full border border-surface/20 px-4 py-2 text-xs font-semibold text-on-primary backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container"
            >
              <span className="absolute inset-0 -translate-x-full bg-secondary-container transition-transform duration-300 ease-out group-hover:translate-x-0" />
              <span className="relative transition-colors duration-300 group-hover:text-on-secondary-fixed-variant">
                {course}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
