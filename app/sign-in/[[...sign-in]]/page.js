
import { SignIn } from "@clerk/nextjs";
import { AppBar, Button, Container, Toolbar, Typography, Box, IconButton } from "@mui/material";
import Link from "next/link";
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import CloudQueueIcon from '@mui/icons-material/CloudQueue'; // Replace with your actual unique icon import
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';


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

export default function SignUpPage() {
    return (
        <Container maxWidth="sm">
            <AppBar position="fixed" sx={{backgroundColor: "#003366", width: '100%'}}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ marginRight: 2 }}>
                        <UniqueFlashcardIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ 
                        flexGrow: 1,
                        display: {xs: 'none', sm: 'block'},
                        fontWeight: 'bold'
                     }}>
                        Flashcard SaaS
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, ml: 'auto', alignItems: 'center' }}>
                        <Button
                            color="inherit"
                            startIcon={<LoginIcon />}
                            sx={{ fontSize: '0.75rem' }} // Adjust font size and margin for larger screens
                        >
                            
                            <Link href="/sign-in" passHref style={{textDecoration: 'none', color: 'white'}}>
                                Login
                            </Link>
                        </Button>
                        <Button
                            color="inherit"
                            startIcon={<AppRegistrationIcon />}
                            sx={{ fontSize: '0.75rem' }} // Adjust font size for larger screens
                        >
                            <Link href="/sign-up" passHref style={{textDecoration: 'none', color: 'white'}}>
                                Sign Up
                            </Link>
                        </Button>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', sm: 'none' }, ml: 'auto', alignItems: 'center' }}>
                        <Button
                            color="inherit"
                            startIcon={<LoginIcon />}
                            sx={{ fontSize: '0.65rem', textTransform: 'none' }} // Adjust font size and margin for mobile screens
                        >
                            <Link href="/sign-in" passHref style={{textDecoration: 'none', color: 'white'}}>
                                Login
                            </Link>
                        </Button>
                        <Button
                            color="inherit"
                            startIcon={<AppRegistrationIcon />}
                            sx={{ fontSize: '0.65rem', textTransform: 'none' }} // Adjust font size for mobile screens
                        >
                            <Link href="/sign-up" passHref style={{textDecoration: 'none', color: 'white'}}>
                                SignUp
                            </Link>
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{ my: 15 }}
            >
                <Typography variant="h4" gutterBottom>Sign In</Typography>
                <SignIn />
            </Box>
        </Container>
    );
}

