import React from "react";
import { FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import "./AboutUs.css";
import AadiImage from "./Image/Aadi.jpg";
import AnuragD from "./Image/AnuragD.jpg"
const teamMembers = [
  { name: "Anurag Sharma", img: AnuragD,MobileNo:"+91 98776 53180", email:"anuragwork2005@gmail.com",role: "." },
  { name: "Anurag Sharma", img: "/team2.png", MobileNo:"+91 86999 49187",role: "." ,email:""},
  { name: "Aadityendra Singh ", img: AadiImage,MobileNo:"+91 7888782253",email:"aaditya191205@gmail.com", role: "." },
  { name: "Deepanshu", img: "/team4.png", MobileNo:"+91 94660 35285",email:"deepanshubad000@gmail.com" ,role: ". " },
];

const AboutUs = () => {
  return (
    <div className="about-container">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="about-header"
      >
        <h1>About <span>Quickbites</span></h1>
        <p>Connecting home chefs with food lovers worldwide.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="team-section"
      >
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="team-card"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img src={member.img} alt={member.name} />
              <h3>{member.name}</h3>
              <p>{member.MobileNo}</p>
              <p>{member.email}</p>
              <p>{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="contact-section">
        <h2>Get in Touch</h2>
        <p>Have questions? Reach out to us!</p>
        <div className="social-icons">
          <a href="https://linkedin.com" target="_blank"><FaLinkedin /></a>
          <a href="https://www.instagram.com/bitmatesteam/" target="_blank"><FaInstagram /></a>
          <a href="mailto:contact@quickbites.com" target="_blank"><FaEnvelope /></a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
