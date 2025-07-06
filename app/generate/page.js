'use client';

import { useRouter } from 'next/navigation'; // Correct import
import { useUser } from "@clerk/nextjs";
import { Box, Button, Container, Paper, TextField, Typography, Grid, CardActionArea, CardContent, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from "@mui/material";
import { collection, writeBatch, doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from 'react';
import { db } from '@/firebase';
import FlashcardIcon from '@mui/icons-material/InsertDriveFile'; // Use a relevant icon
import { CircularProgress } from '@mui/material';


export default function Generate() {
    const router = useRouter(); // Initialize the router here
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [text, setText] = useState('');
    const [name, setName] = useState('');
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [flashcardsLoading, setFlashcardsLoading] = useState(false);


    useEffect(() => {
        if (isLoaded) {
            if (!isSignedIn) {
                router.push('/sign-in'); // Redirect to sign-in page if not signed in
            } else {
                setLoading(false); // User is signed in, stop loading
            }
        }
    }, [isLoaded, isSignedIn, router]);

    // Inside your Generate component
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }


    const handleSubmit = async () => {
        setFlashcardsLoading(true); // Start loading
        fetch('api/generate', {
            method: 'POST',
            body: text,
        })
            .then((res) => res.json())
            .then((data) =>  {
                setFlashcards(data);
                setFlashcardsLoading(false); // Stop loading
            });
    };

        // Inside your Generate component
        if (flashcardsLoading) {
            return (
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                    <Typography variant="h6" sx={{ mt: 2, color: '#002244' }}>
                        Flashcards are loading...
                    </Typography>
                </Box>
            );
        }

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const saveFlashcards = async () => {
        if (!name) {
            alert('Please enter a name.');
            return;
        }
        const batch = writeBatch(db);
        const userDocRef = doc(collection(db, 'users'), user.id);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
            const collections = docSnap.data().flashcards || [];

            if (collections.length >= 10) {
                alert('You have exceeded the limit of 10 flashcard sets.'); // Alert for limit exceeded
                return;
            }

            if (collections.find((f) => f.name === name)) {
                alert('Flashcard collection with the same name already exists.');
                return;
            } else {
                collections.push({ name });
                batch.set(userDocRef, { flashcards: collections }, { merge: true });
            }
        } else {
            batch.set(userDocRef, { flashcards: [{ name }] });
        }
        const colRef = collection(userDocRef, name);
        flashcards.forEach((flashcard) => {
            const cardDocRef = doc(colRef);
            batch.set(cardDocRef, flashcard);
        });

        await batch.commit();
        handleClose();
        router.push('/flashcards'); // Use the router to navigate
    };

    return (
        <Container maxWidth='md' sx={{
            my: 4,
            px: 2,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: '#F0F4F8',
            overflow: 'hidden'
        }}>
            <Box sx={{
                mt: 4, mb: 6, display: 'flex', flexDirection: 'column', alignItems: 'center'
            }}>
                <Typography variant="h4" sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#002244',
                    fontWeight: 600, // Slightly lighter than bold
                    mb: 4, // Margin bottom to create spacing from content below
                    gap: 1, // Space between the icon and text
                    letterSpacing: 0.5, // Optional: Adds spacing between letters
                }}>
                    Generate Flashcards
                </Typography>
                <Paper sx={{
                    p: 4,
                    width: '100%',
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: '#FFFFFF',
                }}>
                    <TextField
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        label='Enter Text'
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        sx={{
                            mb: 2,
                            '& .MuiInputLabel-root': { color: '#003366' }, // Deep Navy
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#003366' }, // Vibrant Teal
                                '&:hover fieldset': { borderColor: '#003366' }, // Vibrant Teal
                                '&.Mui-focused fieldset': { borderColor: '#003366' }, // Vibrant Teal
                            },
                            '& .MuiInputBase-root': { fontSize: '1rem' } // Adjust font size
                        }} />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        fullWidth
                        sx={{
                            borderRadius: 2,
                            backgroundColor: '#002244',
                            '&:hover': {
                                backgroundColor: '#001a33',
                            },
                        }}>
                        Submit
                    </Button>
                </Paper>
            </Box>

            {flashcards.length > 0 && (
                <Box sx={{ mt: 4 }}>
                    <Typography
                        variant="h5"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            color: '#002244',
                            fontWeight: 600, // Slightly lighter than bold
                            mb: 2, // Margin bottom to create spacing from content below
                            gap: 1, // Space between the icon and text
                            letterSpacing: 0.5 // Optional: Adds spacing between letters
                        }}
                    >
                        <FlashcardIcon sx={{
                            fontSize: 30,
                            color: '#002244'
                        }} />
                        Flashcards Preview
                    </Typography>
                    <Grid container spacing={3} sx={{mt: 1}}>
                        {flashcards.map((flashcard, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <CardActionArea onClick={() => {
                                    handleCardClick(index);
                                }} sx={{
                                    border: '1px solid #003366',
                                    borderRadius: 2,
                                    boxShadow: 4,
                                    transition: 'transform 0.3s, box-shadow 0.3s, background-color 0.3s',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: 6,
                                        backgroundColor: '#F1F1F1',
                                    },
                                }}>
                                    <CardContent>
                                        <Box sx={{
                                            border: '1px solid #003366',
                                            perspective: '1000px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: '100%', // Ensure the box takes up the full height of the card
                                            width: '100%',  // Ensure the box takes up the full width of the card
                                            '& > div': {
                                                transition: 'transform 0.6s',
                                                transformStyle: 'preserve-3d',
                                                position: 'relative',
                                                width: '100%',
                                                height: '200px',
                                                boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                                                transform: flipped[index]
                                                    ? 'rotateY(-180deg)'
                                                    : 'rotateY(0deg)',
                                            },
                                            '& > div > div': {
                                                position: 'absolute',
                                                width: '100%',
                                                height: '100%',
                                                backfaceVisibility: 'hidden',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                padding: 2,
                                                boxSizing: 'border-box',
                                            },
                                            '& > div > div:nth-of-type(2)': {
                                                transform: 'rotateY(-180deg)',
                                            },
                                        }}>
                                            <div>
                                                <div>
                                                    <Typography variant="body1" component="div">
                                                        {flashcard.front}
                                                    </Typography>
                                                </div>
                                                <div>
                                                    <Typography variant="body1" component="div" sx={{
                                                        textAlign: 'center',                                                        
                                                        padding: 2, // Padding to prevent text from touching edges
                                                    }}>
                                                        {flashcard.back}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                            </Grid>
                        ))}
                    </Grid>
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained" color="secondary" onClick={handleOpen} sx={{
                            borderRadius: 2,
                            backgroundColor: '#003366', // Deep Navy
                            color: '#FFFFFF', // White
                            '&:hover': {
                                backgroundColor: '#002244', // Darker Navy
                            },
                            m: 2,
                        }}>
                            Save
                        </Button>
                    </Box>
                </Box>
            )}
            <Dialog open={open} onClose={handleClose} sx={{
                '& .MuiDialog-paper': {
                    borderRadius: 2,
                    boxShadow: 6,
                    backgroundColor: '#FFFFFF'
                }
            }}>
                <DialogTitle> Save Flashcards </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter a name for your flashcard collection.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label='Collection Name'
                        type="text"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        variant="outlined" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}> Cancel </Button>
                    <Button onClick={saveFlashcards}> Save </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
