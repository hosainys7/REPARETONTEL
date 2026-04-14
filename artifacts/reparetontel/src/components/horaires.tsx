import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const SCHEDULE = [
  { day: "Lundi", hours: "10:00 – 19:00" },
  { day: "Mardi", hours: "10:00 – 19:00" },
  { day: "Mercredi", hours: "10:00 – 19:00" },
  { day: "Jeudi", hours: "10:00 – 19:00" },
  { day: "Vendredi", hours: "10:00 – 19:00" },
  { day: "Samedi", hours: "10:00 – 18:15" },
  { day: "Dimanche", hours: null },
];

const TODAY_INDEX = new Date().getDay();
const DAY_MAP = [6, 0, 1, 2, 3, 4, 5];
const todayScheduleIdx = DAY_MAP[TODAY_INDEX];

export function Horaires() {
  return (
    <section className="py-16 bg-gray-50/60">
      <div className="container mx-auto px-4 md:px-8 max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                Horaires d'ouverture
              </h2>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Ouvert 6j/7
            </span>
          </div>

          <div className="bg-white rounded-2xl shadow-[0_2px_16px_-6px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden">
            {SCHEDULE.map((entry, idx) => {
              const isToday = idx === todayScheduleIdx;
              const isClosed = !entry.hours;
              return (
                <div
                  key={entry.day}
                  className={`flex items-center justify-between px-5 py-3.5 ${
                    idx < SCHEDULE.length - 1 ? "border-b border-gray-100" : ""
                  } ${isToday ? "bg-primary/5" : ""}`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-medium ${
                        isToday ? "text-primary font-semibold" : "text-foreground"
                      }`}
                    >
                      {entry.day}
                    </span>
                    {isToday && (
                      <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                        Aujourd'hui
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-sm font-semibold tabular-nums ${
                      isClosed
                        ? "text-muted-foreground/60"
                        : isToday
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                  >
                    {isClosed ? "Fermé" : entry.hours}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
