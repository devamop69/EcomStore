import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
} from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Home = () => {
  const navigate = useNavigate();

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
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              color: '#fff',
              fontWeight: 700,
              textShadow: '0 0 20px rgba(0, 255, 163, 0.3)',
              mb: 3,
              fontSize: { xs: '2.5rem', md: '3.75rem' }
            }}
          >
            Welcome to Gaming Zone
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              mb: 6,
              maxWidth: '800px',
              mx: 'auto'
            }}
          >
            Experience the ultimate gaming adventure or shop for your favorite gaming gear
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={5}>
              <Paper
                elevation={24}
                sx={{
                  p: 4,
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(0, 255, 163, 0.2)',
                  },
                }}
                onClick={() => navigate('/booking')}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <SportsEsportsIcon
                    sx={{
                      fontSize: 64,
                      color: '#00ffa3',
                      mb: 2,
                      filter: 'drop-shadow(0 0 10px rgba(0, 255, 163, 0.5))'
                    }}
                  />
                  <Typography
                    variant="h4"
                    sx={{
                      color: '#fff',
                      mb: 2,
                      fontWeight: 600
                    }}
                  >
                    Book a Slot
                  </Typography>
                  <Typography
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      mb: 3
                    }}
                  >
                    Reserve your gaming session and enjoy our state-of-the-art gaming setups
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      background: 'linear-gradient(90deg, #00ffa3, #03e1ff)',
                      color: '#000',
                      fontWeight: 600,
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      textTransform: 'none',
                      borderRadius: '8px',
                      '&:hover': {
                        background: 'linear-gradient(90deg, #00ffa3, #03e1ff)',
                        filter: 'brightness(1.1)',
                      }
                    }}
                  >
                    Book Now
                  </Button>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={5}>
              <Paper
                elevation={24}
                sx={{
                  p: 4,
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(0, 255, 163, 0.2)',
                  },
                }}
                onClick={() => navigate('/products')}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <ShoppingCartIcon
                    sx={{
                      fontSize: 64,
                      color: '#00ffa3',
                      mb: 2,
                      filter: 'drop-shadow(0 0 10px rgba(0, 255, 163, 0.5))'
                    }}
                  />
                  <Typography
                    variant="h4"
                    sx={{
                      color: '#fff',
                      mb: 2,
                      fontWeight: 600
                    }}
                  >
                    Visit Shop
                  </Typography>
                  <Typography
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      mb: 3
                    }}
                  >
                    Browse and shop for the latest gaming gear and accessories
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      background: 'linear-gradient(90deg, #00ffa3, #03e1ff)',
                      color: '#000',
                      fontWeight: 600,
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      textTransform: 'none',
                      borderRadius: '8px',
                      '&:hover': {
                        background: 'linear-gradient(90deg, #00ffa3, #03e1ff)',
                        filter: 'brightness(1.1)',
                      }
                    }}
                  >
                    Shop Now
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
