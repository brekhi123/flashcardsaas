'use client'
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { collection, doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { useRouter } from "next/navigation"
import { Card, CardActionArea, CardContent, Container, Grid, Typography, Box } from "@mui/material"

export default function Flashcards() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [proflashcards, setProFlashcards] = useState([])
    const router = useRouter();

    useEffect(() => {
        async function getFlashcards() {
            if (!user) return
            const docRef = doc(collection(db, 'users'), user.id)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                const collections = docSnap.data().proflashcards || []
                setProFlashcards(collections)
            }
            else {
                await setDoc(docRef, { proflashcards: [] })
            }
        }
        getFlashcards()
    }, [user])

    if (!isLoaded || !isSignedIn) {
        return <></>
    }
    const handleCardClick = (id) => {
        router.push(`/flashcardpro?id=${id}`)
    }
    return (
        <Container maxWidth="md">
            <Box sx={{
                backgroundColor: '#F5F5F5', // Light grey background color
                padding: 4,
                borderRadius: 2,
                boxShadow: 3,
                mt: 4
            }}>
                <Typography variant="h4" sx={{
                    mb: 4,
                    color: '#002244', // Deep navy
                    fontWeight: 600,
                    textAlign: 'center',
                }}>
                    Your Flashcards
                </Typography>
                <Grid container spacing={3}>
                    {proflashcards.map((flashcard, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{
                                border: '1px solid #003366', // Deep navy border
                                borderRadius: 2,
                                boxShadow: 2,
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    boxShadow: 4,
                                },
                            }}>
                                <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                                    <CardContent>
                                        <Typography variant="h6">
                                            {flashcard.name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    )
}

