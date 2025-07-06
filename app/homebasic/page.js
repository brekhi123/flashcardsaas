'use client'

import Head from "next/head";
import { Button, Box, Grid, AppBar, Container, Toolbar, Typography, Divider, IconButton } from "@mui/material";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import ThemeWrapper from "@/ThemeWrapper";
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import StarIcon from '@mui/icons-material/Star';
import getStripe from "@/utils/get-stripe";

const UniqueFlashcardIcon = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
    <CloudQueueIcon
      style={{
        color: 'white',
        fontSize: 50,
        zIndex: 1
      }}
    />
    <LibraryAddCheckIcon
      style={{
        color: '#ffeb3b', 
        fontSize: 15,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 2
      }}
    />
  </div>
);

const handleSubmit = async (subscriptionType) => {
  const checkoutSession = await fetch('api/checkout_sessions', {
    method: "POST",
    headers: {
      origin: "http://localhost:3000",
    },
    //addition of the subscriptiontype
    body: JSON.stringify({ subscriptionType }),
  })

  const checkoutSessionJson = await checkoutSession.json()

  if (checkoutSession.statusCode === 500) {
    console.error(checkoutSession.message)
    return
  }

  const stripe = await getStripe()
  const {error} = await stripe.redirectToCheckout({
    sessionId: checkoutSessionJson.id,
  })

  if (error) {
    console.warn(error.message)
  } 

}


export default function HomeBasic() {
  
 


  return (
    <ThemeWrapper>
      <Head>
        <title>Basic Flashcard Generator</title>
        <meta name="description" content="Create and manage up to 12 flashcards" />
      </Head>

      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" style={{ marginRight: 16 }}>
            <UniqueFlashcardIcon />
          </IconButton>
          <Typography variant="h6" sx={{ 
            flexGrow: 1, 
            display: { xs: 'none', sm: 'block' },
            color: 'white'
            }}>
            Flashcard SaaS
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, ml: 'auto', alignItems: 'center' }}>
            <SignedOut>
              <Button
                color="inherit"
                startIcon={<LoginIcon />}
                sx={{ fontSize: '0.75rem' }} // Adjust font size and margin for larger screens
                href="/sign-in"
              >
                Login
              </Button>
              <Button
                color="inherit"
                startIcon={<AppRegistrationIcon />}
                sx={{ fontSize: '0.75rem' }} // Adjust font size for larger screens
                href="/sign-up"
              >
                Sign Up
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Box>
          <Box sx={{ display: { xs: 'flex', sm: 'none' }, ml: 'auto', alignItems: 'center'}}>
            <SignedOut>
              <Button
                color="inherit"
                startIcon={<LoginIcon />}
                sx={{ fontSize: '0.65rem', textTransform: 'none'}} // Adjust font size and margin for mobile screens
                href="/sign-in"
              >
                Login
              </Button>
              <Button
                color="inherit"
                startIcon={<AppRegistrationIcon />}
                sx={{ fontSize: '0.65rem', textTransform: 'none'}} // Adjust font size for mobile screens
                href="/sign-up"
              >
                Sign Up
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", my: 6 }}>
          <Typography variant="h3">Welcome to the Basic Flashcard Generator</Typography>
          <Typography variant="h5">
            Create up to 12 flashcards and save up to 10. Manage your study materials easily.
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }} href="/generate">
            Get Started
          </Button>
        </Box>

        <Box sx={{ my: 6, textAlign: 'center' }}>
          <Typography variant="h4" component="h2" sx={{ mb: 4, position: 'relative', display: 'inline-block' }}>
            Features
            <Divider sx={{ position: 'absolute', bottom: '-5px', left: '50%', transform: 'translateX(-50%)', width: '60%', height: '3px', bgcolor: 'secondary.main' }} />
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <TextFieldsIcon fontSize="large" color="secondary" />
              <Typography variant="h6">Easy Text Input</Typography>
              <Typography>
                Simply input the text and let the software do the rest. Creating flashcards has never been easier.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <FlashOnIcon fontSize="large" color="secondary" />
              <Typography variant="h6">Smart Flashcards</Typography>
              <Typography>
                Our AI intelligently breaks down your text into concise flashcards, perfect for studying.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <AccessibilityNewIcon fontSize="large" color="secondary" />
              <Typography variant="h6">Accessible Anywhere</Typography>
              <Typography>
                Access your flashcards from any device, at any time. Study on the go with ease.
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Grid item xs={12} md={6}>
              <Box sx={{
                p: 3,
                border: '2px solid',
                borderColor: 'secondary.main',
                borderRadius: 2,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
                backgroundColor: 'background.paper',
                boxShadow: 3,
              }}>
                <StarIcon fontSize="large" color="secondary" />
                <Typography variant="h5" gutterBottom color={'secondary.main'}>Pro</Typography>
                <Typography variant="h6" gutterBottom sx={{ color: 'secondary.main', fontWeight: 'bold' }}>$10 / Month</Typography>
                <Typography sx={{ mb: 2, color: 'secondary.main' }}>
                  Enjoy unlimited flashcards and storage with top-priority support.
                </Typography>
                {/* <Button variant="contained" color="secondary" sx={{ color: 'white' }} onClick={handleSubmit}>Choose Pro</Button> */}
                <Button variant="contained" color="secondary" sx={{ color: 'white' }} onClick={() => handleSubmit('Pro')}>Choose Pro</Button>
              </Box>
            </Grid>
      </Container>
    </ThemeWrapper>
  );
}
