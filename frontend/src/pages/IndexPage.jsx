import React, { useState } from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useViewportScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(34, 197, 94, 0)", "rgba(34, 197, 94, 0.9)"]
  );

  return (
    <div className="font-sans text-gray-900 bg-gray-50">
      <motion.nav
        style={{ backgroundColor }}
        className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:py-5"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white">UnionEase</Link>
          <div className="hidden md:flex space-x-6">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </motion.nav>

      <motion.div
        className={`fixed inset-0 z-40 bg-green-900 ${isOpen ? 'block' : 'hidden'} md:hidden`}
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "tween" }}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <NavLink to="/" onClick={() => setIsOpen(false)}>Home</NavLink>
          <NavLink to="/services" onClick={() => setIsOpen(false)}>Services</NavLink>
          <NavLink to="/about" onClick={() => setIsOpen(false)}>About</NavLink>
          <NavLink to="/contact" onClick={() => setIsOpen(false)}>Contact</NavLink>
        </div>
      </motion.div>

      <header className="relative h-screen flex items-center justify-center bg-gradient-to-br from-green-600 to-green-700 overflow-hidden decoration-transparent">
        <motion.div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: "url('../public/assets/images/ring1.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        />
        <div className="absolute inset-0 bg-green-900 opacity-70 z-10"></div>
        <div className="relative z-20 text-center px-4 max-w-3xl">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Your Path to Marital Bliss in Cameroon
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-green-200 mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Simplify your journey from engagement to "I do" with UnionEase
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              to="/login"
              className="bg-green-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-green-600 transition duration-300 shadow-lg"
            >
              Begin Your Forever
            </Link>
          </motion.div>
        </div>
      </header>

      <AnimatedSection title="Our Services" bgColor="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard
            title="Document Checklist"
            description="Personalized list of all required documents for your Cameroonian marriage registration."
            icon="📋"
          />
          <ServiceCard
            title="Appointment Booking"
            description="Seamlessly schedule appointments with relevant offices through our app."
            icon="📅"
          />
          <ServiceCard
            title="Traditional Ceremony Guide"
            description="Comprehensive resources for planning your traditional Cameroonian wedding."
            icon="👰🤵"
          />
        </div>
      </AnimatedSection>

      <AnimatedSection title="Why Choose UnionEase?" bgColor="bg-gradient-to-br from-green-50 to-green-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <BenefitItem
            title="Time-Saving Solutions"
            description="Complete most of your paperwork online, avoiding multiple trips to government offices."
          />
          <BenefitItem
            title="Expert Cameroonian Guidance"
            description="Receive advice from professionals well-versed in Cameroonian marriage laws and customs."
          />
          <BenefitItem
            title="Stress-Free Process"
            description="Our step-by-step approach ensures a smooth journey through marriage registration."
          />
          <BenefitItem
            title="Cultural Sensitivity"
            description="We honor Cameroonian traditions while providing a modern, digital experience."
          />
        </div>
      </AnimatedSection>

      <AnimatedSection title="Success Stories" bgColor="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard
            name="Acha & Emilie"
            location="Douala"
            quote="UnionEase transformed our marriage registration into a joyful experience. Highly recommended!"
          />
          <TestimonialCard
            name="Kouam"
            location="Yaoundé"
            quote="The app's guidance on blending traditional ceremonies with legal requirements was priceless."
          />
          <TestimonialCard
            name="Bih & Tabi"
            location="Bamenda"
            quote="UnionEase saved us countless hours. It's an essential tool for couples marrying in Cameroon."
          />
        </div>
      </AnimatedSection>

      <footer className="bg-green-900 text-white py-6 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center">
          <div className="w-full md:w-auto mb-4 md:mb-0">
            <h3 className="text-xl font-bold">UnionEase</h3>
            <p className="text-sm">Simplifying marriage procedures in Cameroon</p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end space-x-6">
            <Link to="/about" className="hover:text-green-300 transition duration-300">About</Link>
            <Link to="/services" className="hover:text-green-300 transition duration-300">Services</Link>
            <Link to="/contact" className="hover:text-green-300 transition duration-300">Contact</Link>
            <Link to="/privacy" className="hover:text-green-300 transition duration-300">Privacy</Link>
          </div>
        </div>
        <div className="mt-4 text-center text-sm">
          © 2024 UnionEase. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

const NavLink = ({ to, children, ...props }) => (
  <Link
    to={to}
    className="text-white hover:text-green-200 transition duration-300"
    {...props}
  >
    {children}
  </Link>
);

const ServiceCard = ({ title, description, icon }) => (
  <motion.div
    className="bg-white p-6 rounded-lg shadow-lg border border-green-100"
    whileHover={{ y: -5, boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)" }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-green-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const BenefitItem = ({ title, description }) => (
  <motion.div
    className="flex items-start space-x-4"
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <div className="flex-shrink-0 mt-1">
      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <div>
      <h3 className="text-lg font-semibold mb-1 text-green-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </motion.div>
);

const TestimonialCard = ({ name, location, quote }) => (
  <motion.div
    className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow-md"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <p className="text-gray-700 italic mb-4">"{quote}"</p>
    <p className="font-semibold text-green-800">{name}</p>
    <p className="text-sm text-green-600">{location}</p>
  </motion.div>
);

const AnimatedSection = ({ title, children, bgColor }) => (
  <section className={`py-20 px-4 md:px-8 lg:px-16 ${bgColor}`}>
    <motion.h2
      className="text-3xl md:text-4xl font-bold mb-12 text-center text-green-900"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {title}
    </motion.h2>
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  </section>
);

export default HomePage;