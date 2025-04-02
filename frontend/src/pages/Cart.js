import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Grid,
  Divider,
  Fade,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ShoppingCart as CartIcon,
  KeyboardReturn as ReturnIcon,
  CreditCard as CreditCardIcon,
  AccountBalance as UPIIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { removeFromCart, updateQuantity, clearCart } from '../redux/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const [openCheckout, setOpenCheckout] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState('');
  const [checkoutData, setCheckoutData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
    upiId: '',
  });
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);

  const steps = ['Shipping Details', 'Payment Method', 'Confirm Order'];

  const handleCheckoutSubmit = () => {
    if (activeStep === 0) {
      if (!checkoutData.name || !checkoutData.email || !checkoutData.phone || !checkoutData.address) {
        setError('Please fill in all required fields');
        return;
      }
      setActiveStep(1);
    } else if (activeStep === 1) {
      if (checkoutData.paymentMethod === 'card') {
        if (!checkoutData.cardNumber || !checkoutData.cardExpiry || !checkoutData.cardCVV) {
          setError('Please fill in all card details');
          return;
        }
      } else if (!checkoutData.upiId) {
        setError('Please enter UPI ID');
        return;
      }
      setActiveStep(2);
    } else {
      // Process payment
      setProcessing(true);
      setTimeout(() => {
        setProcessing(false);
        setPaymentSuccess(true);
        dispatch(clearCart()); // Clear the cart after successful payment
        
        setTimeout(() => {
          setOpenCheckout(false);
          setPaymentSuccess(false);
          setActiveStep(0);
          setCheckoutData({
            name: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            pincode: '',
            paymentMethod: 'card',
            cardNumber: '',
            cardExpiry: '',
            cardCVV: '',
            upiId: '',
          });
          navigate('/');
        }, 2000);
      }, 1500);
    }
    setError('');
  };

  const renderCheckoutStep = () => {
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
      '& .MuiInputBase-input': {
        '&::placeholder': {
          color: 'rgba(255, 255, 255, 0.5)',
        },
      },
    };

    if (processing) {
      return (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <CircularProgress sx={{ color: '#00ffa3' }} />
          <Typography sx={{ color: '#fff', mt: 2 }}>Processing your payment...</Typography>
        </Box>
      );
    }

    if (paymentSuccess) {
      return (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <CheckCircleIcon sx={{ fontSize: 64, color: '#00ffa3', mb: 2 }} />
          <Typography variant="h5" sx={{ color: '#fff', mb: 1, fontFamily: 'Orbitron' }}>
            Payment Successful!
          </Typography>
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Thank you for your purchase. You will be redirected shortly...
          </Typography>
        </Box>
      );
    }

    switch (activeStep) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                value={checkoutData.name}
                onChange={(e) => setCheckoutData({ ...checkoutData, name: e.target.value })}
                required
                sx={textFieldStyle}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={checkoutData.email}
                onChange={(e) => setCheckoutData({ ...checkoutData, email: e.target.value })}
                required
                sx={textFieldStyle}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                value={checkoutData.phone}
                onChange={(e) => setCheckoutData({ ...checkoutData, phone: e.target.value })}
                required
                sx={textFieldStyle}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                multiline
                rows={3}
                value={checkoutData.address}
                onChange={(e) => setCheckoutData({ ...checkoutData, address: e.target.value })}
                required
                sx={textFieldStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                value={checkoutData.city}
                onChange={(e) => setCheckoutData({ ...checkoutData, city: e.target.value })}
                required
                sx={textFieldStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="PIN Code"
                value={checkoutData.pincode}
                onChange={(e) => setCheckoutData({ ...checkoutData, pincode: e.target.value })}
                required
                sx={textFieldStyle}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Box>
            <FormControl component="fieldset">
              <FormLabel 
                component="legend"
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  '&.Mui-focused': {
                    color: '#00ffa3',
                  }
                }}
              >
                Payment Method
              </FormLabel>
              <RadioGroup
                value={checkoutData.paymentMethod}
                onChange={(e) => setCheckoutData({ ...checkoutData, paymentMethod: e.target.value })}
              >
                <FormControlLabel
                  value="card"
                  control={
                    <Radio 
                      sx={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        '&.Mui-checked': {
                          color: '#00ffa3',
                        },
                      }}
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', color: '#fff' }}>
                      <CreditCardIcon sx={{ mr: 1, color: '#00ffa3' }} /> Credit/Debit Card
                    </Box>
                  }
                />
                <FormControlLabel
                  value="upi"
                  control={
                    <Radio 
                      sx={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        '&.Mui-checked': {
                          color: '#00ffa3',
                        },
                      }}
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', color: '#fff' }}>
                      <UPIIcon sx={{ mr: 1, color: '#00ffa3' }} /> UPI
                    </Box>
                  }
                />
              </RadioGroup>
            </FormControl>

            {checkoutData.paymentMethod === 'card' ? (
              <Box sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Card Number"
                  value={checkoutData.cardNumber}
                  onChange={(e) => setCheckoutData({ ...checkoutData, cardNumber: e.target.value })}
                  sx={{ ...textFieldStyle, mb: 2 }}
                />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Expiry (MM/YY)"
                      value={checkoutData.cardExpiry}
                      onChange={(e) => setCheckoutData({ ...checkoutData, cardExpiry: e.target.value })}
                      sx={textFieldStyle}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="CVV"
                      type="password"
                      value={checkoutData.cardCVV}
                      onChange={(e) => setCheckoutData({ ...checkoutData, cardCVV: e.target.value })}
                      sx={textFieldStyle}
                    />
                  </Grid>
                </Grid>
              </Box>
            ) : (
              <TextField
                fullWidth
                label="UPI ID"
                value={checkoutData.upiId}
                onChange={(e) => setCheckoutData({ ...checkoutData, upiId: e.target.value })}
                sx={{ ...textFieldStyle, mt: 2 }}
                helperText="Enter your UPI ID (e.g., username@upi)"
                FormHelperTextProps={{
                  sx: { color: 'rgba(255, 255, 255, 0.7)' }
                }}
              />
            )}
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" sx={{ color: '#fff', mb: 2, fontFamily: 'Orbitron' }}>
              Order Summary
            </Typography>
            {items.map((item) => (
              <Box key={item.id} sx={{ mb: 2 }}>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  {item.name} x {item.quantity} - ₹{(item.price * item.quantity).toLocaleString()}
                </Typography>
              </Box>
            ))}
            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', my: 2 }} />
            <Typography variant="h6" sx={{ color: '#00ffa3', fontWeight: 600 }}>
              Total: ₹{calculateTotal().toLocaleString()}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Payment Method: {checkoutData.paymentMethod === 'card' ? 'Credit/Debit Card' : 'UPI'}
              </Typography>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', mt: 1 }}>
                Shipping Address: {checkoutData.address}, {checkoutData.city} - {checkoutData.pincode}
              </Typography>
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleQuantityChange = (itemId, change) => {
    const item = items.find(i => i.id === itemId);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change);
      dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  if (items.length === 0) {
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
        <Container maxWidth="sm">
          <Fade in timeout={800}>
            <Card
              sx={{
                background: 'rgba(22, 28, 36, 0.8)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              }}
            >
              <CardContent sx={{ textAlign: 'center', py: 6 }}>
                <CartIcon sx={{ fontSize: 48, color: '#00ffa3', mb: 2 }} />
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    color: '#fff',
                    fontWeight: 700,
                    textShadow: '0 0 20px rgba(0, 255, 163, 0.3)',
                    fontFamily: 'Orbitron',
                    mb: 2
                  }}
                >
                  Your Cart is Empty
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 4 }}>
                  Add some awesome gaming gear to your cart!
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<ReturnIcon />}
                  onClick={() => navigate('/products')}
                  sx={{
                    background: 'linear-gradient(45deg, #00ffa3, #03e1ff)',
                    color: '#000',
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    '&:hover': {
                      background: 'linear-gradient(45deg, #03e1ff, #00ffa3)',
                    }
                  }}
                >
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>
          </Fade>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        pt: { xs: 12, md: 8 },
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
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 6,
            mt: { xs: 2, md: 4 },
            position: 'sticky',
            top: 0,
            zIndex: 10,
            background: 'linear-gradient(180deg, rgba(26, 26, 46, 1) 0%, rgba(26, 26, 46, 0.8) 100%)',
            backdropFilter: 'blur(8px)',
            py: 2,
            px: { xs: 2, md: 3 },
            mx: { xs: -2, md: -3 },
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{
              color: '#fff',
              fontWeight: 700,
              textShadow: '0 0 20px rgba(0, 255, 163, 0.3)',
              fontFamily: 'Orbitron',
              fontSize: { xs: '1.75rem', md: '2.25rem' },
              display: 'flex',
              alignItems: 'center'
            }}
          >
            Your Cart
            <CartIcon sx={{ ml: { xs: 1.5, md: 2 }, fontSize: { xs: 28, md: 36 }, color: '#00ffa3' }} />
          </Typography>
          
          <Button
            variant="contained"
            startIcon={<ReturnIcon />}
            onClick={() => navigate('/products')}
            sx={{
              background: 'linear-gradient(45deg, #00ffa3, #03e1ff)',
              color: '#000',
              fontWeight: 600,
              '&:hover': {
                background: 'linear-gradient(45deg, #03e1ff, #00ffa3)',
              }
            }}
          >
            Continue Shopping
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {items.map((item) => (
              <Fade key={item.id} in timeout={800}>
                <Card
                  sx={{
                    mb: 2,
                    background: 'rgba(22, 28, 36, 0.8)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <CardContent>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={6}>
                        <Typography
                          variant="h6"
                          sx={{
                            color: '#fff',
                            fontWeight: 600,
                            fontFamily: 'Orbitron',
                          }}
                        >
                          {item.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          {item.description}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton
                              onClick={() => handleQuantityChange(item.id, -1)}
                              sx={{ color: '#00ffa3' }}
                            >
                              <RemoveIcon />
                            </IconButton>
                            <Typography
                              sx={{
                                mx: 2,
                                color: '#fff',
                                fontWeight: 600,
                                minWidth: '40px',
                                textAlign: 'center'
                              }}
                            >
                              {item.quantity}
                            </Typography>
                            <IconButton
                              onClick={() => handleQuantityChange(item.id, 1)}
                              sx={{ color: '#00ffa3' }}
                            >
                              <AddIcon />
                            </IconButton>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography
                              variant="h6"
                              sx={{
                                color: '#00ffa3',
                                fontWeight: 600,
                                textShadow: '0 0 10px rgba(0, 255, 163, 0.3)',
                              }}
                            >
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </Typography>
                            <IconButton
                              onClick={() => handleRemoveItem(item.id)}
                              sx={{
                                color: '#ff4d4d',
                                '&:hover': {
                                  color: '#ff3333',
                                }
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Fade>
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <Fade in timeout={800}>
              <Card
                sx={{
                  background: 'rgba(22, 28, 36, 0.8)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                  position: 'sticky',
                  top: 100
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{
                      color: '#fff',
                      fontWeight: 700,
                      fontFamily: 'Orbitron',
                      mb: 3
                    }}
                  >
                    Order Summary
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        Items ({items.length})
                      </Typography>
                      <Typography sx={{ color: '#fff' }}>
                        ₹{calculateTotal().toLocaleString()}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        Shipping
                      </Typography>
                      <Typography sx={{ color: '#00ffa3' }}>
                        Free
                      </Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', my: 2 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600 }}>
                      Total
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: '#00ffa3',
                        fontWeight: 700,
                        textShadow: '0 0 10px rgba(0, 255, 163, 0.3)',
                      }}
                    >
                      ₹{calculateTotal().toLocaleString()}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={() => setOpenCheckout(true)}
                    sx={{
                      background: 'linear-gradient(45deg, #00ffa3, #03e1ff)',
                      color: '#000',
                      fontWeight: 600,
                      py: 1.5,
                      '&:hover': {
                        background: 'linear-gradient(45deg, #03e1ff, #00ffa3)',
                      }
                    }}
                  >
                    Proceed to Checkout
                  </Button>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        </Grid>
      </Container>
      <Dialog
        open={openCheckout}
        onClose={() => !processing && !paymentSuccess && setOpenCheckout(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            background: 'rgba(22, 28, 36, 0.95)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          }
        }}
      >
        <DialogTitle sx={{ 
          color: '#fff',
          fontFamily: 'Orbitron',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          {paymentSuccess ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h6" component="span" sx={{ color: '#00ffa3' }}>
                Payment Successful!
              </Typography>
              🎉
            </Box>
          ) : (
            'Checkout'
          )}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          {paymentSuccess ? (
            <Alert 
              severity="success" 
              sx={{ 
                mt: 2,
                background: 'rgba(0, 255, 163, 0.1)',
                color: '#00ffa3',
                border: '1px solid rgba(0, 255, 163, 0.3)',
                '& .MuiAlert-icon': {
                  color: '#00ffa3'
                }
              }}
            >
              Your order has been placed successfully! Redirecting to home page...
            </Alert>
          ) : (
            <Box sx={{ mt: 2 }}>
              <Stepper 
                activeStep={activeStep} 
                sx={{ 
                  mb: 4,
                  '& .MuiStepLabel-label': {
                    color: 'rgba(255, 255, 255, 0.7)',
                    '&.Mui-active': {
                      color: '#00ffa3',
                    },
                    '&.Mui-completed': {
                      color: '#00ffa3',
                    },
                  },
                  '& .MuiStepIcon-root': {
                    color: 'rgba(255, 255, 255, 0.3)',
                    '&.Mui-active': {
                      color: '#00ffa3',
                    },
                    '&.Mui-completed': {
                      color: '#00ffa3',
                    },
                  },
                }}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              {error && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    mb: 2,
                    background: 'rgba(255, 77, 77, 0.1)',
                    color: '#ff4d4d',
                    border: '1px solid rgba(255, 77, 77, 0.3)',
                    '& .MuiAlert-icon': {
                      color: '#ff4d4d'
                    }
                  }}
                >
                  {error}
                </Alert>
              )}

              {renderCheckoutStep()}
            </Box>
          )}
        </DialogContent>
        {!processing && !paymentSuccess && (
          <DialogActions sx={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', p: 2 }}>
            <Button 
              onClick={() => setOpenCheckout(false)}
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                '&:hover': {
                  color: '#fff',
                }
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCheckoutSubmit}
              variant="contained"
              sx={{
                background: 'linear-gradient(45deg, #00ffa3, #03e1ff)',
                color: '#000',
                fontWeight: 600,
                '&:hover': {
                  background: 'linear-gradient(45deg, #03e1ff, #00ffa3)',
                }
              }}
            >
              {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </Box>
  );
};

export default Cart;
