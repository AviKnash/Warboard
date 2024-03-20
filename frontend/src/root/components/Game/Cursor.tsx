import { motion } from "framer-motion";

const Cursor = () => {
  return (
    <motion.div
      aria-hidden={true}
      className="inline-block bg-purple-900 w-0.5 h-5"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 1 }}
      transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
    />
  );
};

export default Cursor;
