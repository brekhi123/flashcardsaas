
'use client'
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { db } from "@/firebase"
import { useSearchParams } from "next/navigation"
import { Box, Container, Typography, Grid, CardActionArea, CardContent } from "@mui/material"


export default function Flashcard() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [proflashcards, setProFlashcards] = useState([]);
    const [flipped, setFlipped] = useState([]);

    const searchParams = useSearchParams()
    const search = searchParams.get('id')

    useEffect(() => {
        async function getFlashcard() {
            if (!search || !user) return
            const colref = collection(doc(collection(db, 'users'), user.id), search)
            const docs = await getDocs(colref)
            const proflashcards = []

            docs.forEach((doc) => {
                proflashcards.push({ id: doc.id, ...doc.data() })
            })
            setProFlashcards(proflashcards)
        }
        getFlashcard()
    }, [user, search])

    if (!isLoaded || !isSignedIn) {
        return <></>
    }

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" sx={{
                mt: 2,
                color: '#003366',
                textAlign: 'center',
                fontWeight: 'bold',
            }}>
                Flashcards
            </Typography>
            <Grid container spacing={3} sx={{ mt: 4 }}>
                {proflashcards.map((flashcard, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <CardActionArea onClick={() => handleCardClick(index)} sx={{
                            borderRadius: 3,
                            boxShadow: 3,
                            transition: 'transform 0.3s, box-shadow 0.3s, background-color 0.3s',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                boxShadow: 6,
                                backgroundColor: '#F1F1F1',
                            },
                        }}>
                            <CardContent sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                minHeight: '220px',
                                backgroundImage: 'linear-gradient(to bottom right, #00B2A9, #003366)',
                                color: '#fff',
                            }}>
                                <Box sx={{
                                    border: '1px solid #fff',
                                    perspective: '1000px',
                                    width: '100%',
                                    '& > div': {
                                        transition: 'transform 0.6s',
                                        transformStyle: 'preserve-3d',
                                        position: 'relative',
                                        width: '100%',
                                        height: '200px',
                                        transform: flipped[index] ? 'rotateY(-180deg)' : 'rotateY(0deg)',
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
                                        backgroundColor: '#003366',
                                        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                                    },
                                    '& > div > div:nth-of-type(2)': {
                                        transform: 'rotateY(-180deg)',
                                    },
                                }}>
                                    <div>
                                        <div>
                                            <Typography variant="h6" component="div" sx={{
                                                textAlign: 'center',
                                                padding: 2,
                                                fontWeight: 'bold',
                                                color: '#fff',
                                                letterSpacing: '1px',
                                                fontSize: '1.2em',
                                                textShadow: '2px 2px 4px #000',
                                            }}>
                                                {flashcard.front}
                                            </Typography>
                                        </div>
                                        <div>
                                            <Typography variant="h6" component="div" sx={{
                                                textAlign: 'center',
                                                padding: 2,
                                                fontStyle: 'italic',
                                                color: '#f0f0f0',
                                                fontSize: '1.1em',
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
        </Container>
    )
}
