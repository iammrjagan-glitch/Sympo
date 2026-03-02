import { Calendar, MapPin, Users } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const stats = [
  {
    icon: Calendar,
    title: "Event Date",
    value: "March 18, 2026",
  },
  {
    icon: MapPin,
    title: "Venue",
    value: "Meenakshi Sundararajan Engineering College",
  },
  {
    icon: Users,
    title: "Participants",
    value: "Students across India",
  },
];

export default function AboutGear() {

  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  // Gear enters from left
  const gearX = useTransform(scrollYProgress, [0, 0.6], [-500, -150]);

  // Gear rotation
  const gearRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  // Content fade in
  const contentOpacity = useTransform(scrollYProgress, [0.5, 1], [0, 1]);

  const contentX = useTransform(scrollYProgress, [0.5, 1], [100, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-black overflow-hidden flex items-center"
    >

      {/* BACKGROUND */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dkyvctkhf/image/upload/v1771483014/wxtoryrid7adydn0vkv8.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* GEAR */}
      <motion.img
        src="https://res.cloudinary.com/dkyvctkhf/image/upload/v1772383699/qajctgng77aquwwo4nw0.png"   // place your image in public folder and rename gear.png
        alt="gear"
        style={{
          x: gearX,
          rotate: gearRotate,
        }}
        className="absolute left-0 w-[500px] opacity-90 pointer-events-none"
      />

      {/* CONTENT */}
      <motion.div
        style={{
          opacity: contentOpacity,
          x: contentX,
        }}
        className="relative z-10 ml-[35%] max-w-xl"
      >

        <h2 className="text-5xl font-bold text-white mb-10">
          ABOUT YANTRA
        </h2>

        <div className="space-y-6">

          {stats.map((item, index) => {

            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.3,
                  duration: 0.8,
                }}
                className="
                  flex items-center gap-4
                  bg-black/40 backdrop-blur-md
                  border border-yellow-500/40
                  rounded-xl p-5
                "
                style={{
                  boxShadow: `
                    0 0 10px rgba(255,215,0,0.4),
                    inset 0 0 15px rgba(255,215,0,0.15)
                  `,
                }}
              >

                <Icon className="text-yellow-500" size={28} />

                <div>
                  <div className="text-yellow-500 font-semibold">
                    {item.title}
                  </div>

                  <div className="text-white">
                    {item.value}
                  </div>
                </div>

              </motion.div>
            );
          })}

        </div>

      </motion.div>

    </section>
  );
}