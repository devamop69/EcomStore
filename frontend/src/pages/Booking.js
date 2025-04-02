import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Grid,
  MenuItem,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  useTheme,
  useMediaQuery,
  Alert,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MuiTelInput } from 'mui-tel-input';
import CloseIcon from '@mui/icons-material/Close';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import Confetti from 'react-confetti';

const timeSlots = [
  '10:00 AM - 12:00 PM',
  '12:00 PM - 2:00 PM',
  '2:00 PM - 4:00 PM',
  '4:00 PM - 6:00 PM',
  '6:00 PM - 8:00 PM',
  '8:00 PM - 10:00 PM'
];

const Booking = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '+91',
    date: null,
    timeSlot: '',
    gamingSystem: '',
    numberOfPlayers: ''
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePhoneChange = (value) => {
    setFormData(prev => ({
      ...prev,
      phone: value
    }));
    if (errors.phone) {
      setErrors(prev => ({
        ...prev,
        phone: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone || formData.phone === '+91') newErrors.phone = 'Phone number is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.timeSlot) newErrors.timeSlot = 'Time slot is required';
    if (!formData.gamingSystem) newErrors.gamingSystem = 'Gaming system is required';
    if (!formData.numberOfPlayers) newErrors.numberOfPlayers = 'Number of players is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Booking details:', formData);
      setShowConfetti(true);
      setShowSuccess(true);
    }
  };

  const handleClose = () => {
    setShowSuccess(false);
    setShowConfetti(false);
    setFormData({
      name: '',
      email: '',
      phone: '+91',
      date: null,
      timeSlot: '',
      gamingSystem: '',
      numberOfPlayers: ''
    });
  };

  const textFieldStyle = {
    '& .MuiOutlinedInput-root': {
      color: '#fff',
      '& fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.23)',
      },
      '&:hover fieldset': {
        borderColor: '#00ffa3',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#00ffa3',
      },
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(255, 255, 255, 0.7)',
      '&.Mui-focused': {
        color: '#00ffa3',
      },
    },
    '& .MuiSelect-icon': {
      color: 'rgba(255, 255, 255, 0.7)',
    },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        pt: { xs: 12, md: 20 },
        pb: 4,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
          backgroundSize: '15px 15px',
          opacity: 0.5,
          pointerEvents: 'none',
        }
      }}
    >
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <SportsEsportsIcon
            sx={{
              fontSize: 64,
              color: '#00ffa3',
              mb: 2,
              filter: 'drop-shadow(0 0 10px rgba(0, 255, 163, 0.5))'
            }}
          />
          <Typography
            variant="h3"
            component="h1"
            sx={{
              color: '#fff',
              fontWeight: 700,
              textShadow: '0 0 20px rgba(0, 255, 163, 0.3)',
              mb: 2,
              fontFamily: 'Orbitron',
              fontSize: { xs: '2rem', md: '3rem' }
            }}
          >
            Book Your Gaming Slot
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            Select your preferred time and date to experience gaming at its finest
          </Typography>
        </Box>

        <Paper
          elevation={24}
          sx={{
            p: { xs: 3, md: 4 },
            background: 'rgba(22, 28, 36, 0.8)',
            backdropFilter: 'blur(8px)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-4px)',
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #00ffa3, #03e1ff)',
            }
          }}
        >
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  required
                  sx={textFieldStyle}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  required
                  sx={textFieldStyle}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MuiTelInput
                  fullWidth
                  label="Phone Number"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  required
                  sx={textFieldStyle}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Select Date"
                    value={formData.date}
                    onChange={(newValue) => {
                      setFormData(prev => ({ ...prev, date: newValue }));
                      if (errors.date) {
                        setErrors(prev => ({ ...prev, date: '' }));
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={!!errors.date}
                        helperText={errors.date}
                        required
                        sx={textFieldStyle}
                      />
                    )}
                    minDate={new Date()}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Time Slot"
                  name="timeSlot"
                  value={formData.timeSlot}
                  onChange={handleChange}
                  error={!!errors.timeSlot}
                  helperText={errors.timeSlot}
                  required
                  sx={textFieldStyle}
                >
                  {timeSlots.map((slot) => (
                    <MenuItem key={slot} value={slot}>
                      {slot}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Gaming System"
                  name="gamingSystem"
                  value={formData.gamingSystem}
                  onChange={handleChange}
                  error={!!errors.gamingSystem}
                  helperText={errors.gamingSystem}
                  required
                  sx={textFieldStyle}
                >
                  <MenuItem value="PS5">PlayStation 5</MenuItem>
                  <MenuItem value="PS4">PlayStation 4</MenuItem>
                  <MenuItem value="XBOX">Xbox Series X</MenuItem>
                  <MenuItem value="PC">Gaming PC</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Number of Players"
                  name="numberOfPlayers"
                  value={formData.numberOfPlayers}
                  onChange={handleChange}
                  error={!!errors.numberOfPlayers}
                  helperText={errors.numberOfPlayers}
                  required
                  sx={textFieldStyle}
                >
                  <MenuItem value="1">1 Player</MenuItem>
                  <MenuItem value="2">2 Players</MenuItem>
                  <MenuItem value="3">3 Players</MenuItem>
                  <MenuItem value="4">4 Players</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{
                    mt: 2,
                    background: 'linear-gradient(45deg, #00ffa3, #03e1ff)',
                    color: '#000',
                    fontWeight: 600,
                    py: 1.5,
                    '&:hover': {
                      background: 'linear-gradient(45deg, #03e1ff, #00ffa3)',
                    }
                  }}
                >
                  Book Now
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>

      <Dialog
        open={showSuccess}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            background: 'rgba(22, 28, 36, 0.8)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }
        }}
      >
        <DialogTitle sx={{ color: '#fff' }}>
          Booking Confirmed!
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'rgba(255, 255, 255, 0.7)'
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Alert
            severity="success"
            sx={{
              background: 'rgba(0, 255, 163, 0.1)',
              color: '#00ffa3',
              border: '1px solid rgba(0, 255, 163, 0.2)',
              '& .MuiAlert-icon': {
                color: '#00ffa3'
              }
            }}
          >
            Your gaming slot has been successfully booked! We'll send you a confirmation email with all the details.
          </Alert>
          <Box sx={{ mt: 2, color: 'rgba(255, 255, 255, 0.7)' }}>
            <Typography variant="body1" paragraph>
              Booking Details:
            </Typography>
            <Typography variant="body2">Name: {formData.name}</Typography>
            <Typography variant="body2">Date: {formData.date?.toLocaleDateString()}</Typography>
            <Typography variant="body2">Time: {formData.timeSlot}</Typography>
            <Typography variant="body2">Gaming System: {formData.gamingSystem}</Typography>
            <Typography variant="body2">Number of Players: {formData.numberOfPlayers}</Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Booking;
