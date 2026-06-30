import { motion } from "framer-motion";
import type { DashboardStat } from "@/types/dashboard";

const cardVariant = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08 },
  }),
};

const StatsGrid = ({ stats }: { stats: DashboardStat[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((item, i) => {
        const Icon = item.icon;
        console.log(item);
        return (
          <motion.div
            key={item.title}
            variants={cardVariant}
            initial="hidden"
            animate="show"
            custom={i}
            className="bg-card border border-border rounded-lg p-3 sm:p-4 flex items-center gap-3"
          >
            <div
              className={`${item.bg} ${item.color} p-2.5 sm:p-3 rounded-lg shrink-0`}
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <p className="text-[11px] sm:text-xs text-muted-foreground truncate">
                {item.title}
              </p>
              <h2 className="text-sm sm:text-lg font-semibold leading-tight font-inter">
                {item.value}
              </h2>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatsGrid;
