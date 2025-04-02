import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Home as HomeIcon } from '@mui/icons-material';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

const BookingSuccess = ({ name, onClose }) => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      style={{ textAlign: 'center', padding: '2rem' }}
    >
      <motion.div variants={item}>
        <Typography
          variant="h4"
          sx={{
            color: '#00ff9f',
            fontFamily: 'Orbitron',
            fontWeight: 'bold',
            mb: 3,
          }}
        >
          🎮 Booking Confirmed! 🎉
        </Typography>
      </motion.div>

      <motion.div variants={item}>
        <Typography
          variant="h6"
          sx={{
            color: '#fff',
            mb: 3,
          }}
        >
          Hey {name}! Get ready for an epic gaming session! 🚀
        </Typography>
      </motion.div>

      <motion.div variants={item}>
        <Typography
          sx={{
            color: 'rgba(255,255,255,0.8)',
            mb: 4,
          }}
        >
          We've sent the booking details to your email. <br />
          See you at the gaming zone! 🎯
        </Typography>
      </motion.div>

      <motion.div 
        variants={item}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant="contained"
          size="large"
          startIcon={<HomeIcon />}
          onClick={onClose}
          sx={{
            background: 'linear-gradient(45deg, #00ff9f, #00b8ff)',
            color: '#000',
            fontWeight: 'bold',
            px: 4,
            py: 1.5,
            fontSize: '1.1rem',
            '&:hover': {
              background: 'linear-gradient(45deg, #00b8ff, #00ff9f)',
            },
          }}
        >
          Back to Home
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default BookingSuccess;
