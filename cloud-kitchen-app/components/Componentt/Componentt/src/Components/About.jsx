import React from "react";
import { motion } from "framer-motion";
import "./About.css"; // Ensure you include the updated CSS classes here

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-center p-6 text-white relative overflow-hidden">
      {/* Add animated particles or elements */}
      <div className="absolute inset-0 opacity-50 z-0">
        <motion.div
          className="absolute w-20 h-20 bg-white rounded-full shadow-xl"
          style={{ top: "10%", left: "15%" }}
          animate={{ x: [0, 50, -50, 0], y: [0, -30, 30, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
        <motion.div
          className="absolute w-16 h-16 bg-yellow-300 rounded-full shadow-xl"
          style={{ top: "70%", left: "80%" }}
          animate={{ x: [0, -30, 30, 0], y: [0, 50, -50, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      </div>

      <motion.img
        src="/about-graphic.png"
        alt="About Quickbites"
        className="relative z-10 w-80 mb-6 drop-shadow-2xl hover:scale-110 hover:opacity-95 transition-all"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      />
      <motion.h1
        className="relative z-10 text-6xl font-extrabold text-white bg-clip-text bg-gradient-to-r from-yellow-300 via-red-500 to-pink-600"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Savor Homemade Meals Anytime
      </motion.h1>
      <motion.p
        className="relative z-10 text-2xl mt-4 font-light"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        Bridging the gap between home chefs and food enthusiasts
      </motion.p>
      <motion.button
        className="relative z-10 mt-8 bg-yellow-300 text-purple-800 px-8 py-4 rounded-full font-bold shadow-xl hover:bg-yellow-400 transition-all"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
      >
        Dive In
      </motion.button>
    </div>
  );
};

export default About;