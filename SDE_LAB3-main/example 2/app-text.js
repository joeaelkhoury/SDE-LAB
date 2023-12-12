const express = require('express');
const axios = require('axios');
const path = require('path');
const fs = require('fs').promises; // Use promises version of fs

const app = express();
const PORT = 5600;

app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

// Endpoint to get a random joke from the text file
app.get('/getJoke', async (req, res) => {
    try {
        const jokes = await fs.readFile('./jokes.txt', 'utf-8');
        const jokesArray = jokes.split('\n').filter(joke => joke.trim() !== "");  // Split by newline and filter out empty strings
        const randomJoke = jokesArray[Math.floor(Math.random() * jokesArray.length)];
        res.json({ joke: randomJoke });
    } catch (error) {
        console.error('Error reading jokes:', error);
        res.status(500).json({ error: 'Failed to fetch joke from file' });
    }
});


// Endpoint to translate a joke
app.post('/translateJoke', async (req, res) => {
    const text = req.body.text;

    try {
        const response = await axios.post('https://microsoft-translator-text.p.rapidapi.com/translate?to[0]=it&api-version=3.0&from=en&profanityAction=NoAction&textType=plain', 
        [{ Text: text }], 
        {
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': 'ac6ff202a0msha62eaa2244cd01bp14eb56jsnc98f9268668c',
                'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
            }
        });

        if (response && response.data && Array.isArray(response.data) && response.data.length > 0 && response.data[0].translations && response.data[0].translations.length > 0) {
            const translatedText = response.data[0].translations[0].text;
            res.json({ translatedText });
        } else {
            res.status(500).json({ error: 'Unexpected API response' });
        }

    } catch (error) {
        console.error('Error translating joke:', error);
        res.status(500).json({ error: 'Failed to translate joke' });
    }
});

// Serving the fetchJokeAndTranslate function as a separate JavaScript script
app.get('/app2.js', (req, res) => {
    res.type('text/javascript');
    res.send(`
        async function fetchJokeAndTranslate() {
            try {
                const jokeResponse = await fetch('/getJoke');
                const jokeData = await jokeResponse.json();
                const randomJoke = jokeData.joke;

                const translationResponse = await fetch('/translateJoke', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ text: randomJoke })
                });
                
                const translationData = await translationResponse.json();

                if (translationData.translatedText) {
                    alert(translationData.translatedText);
                } else {
                    console.error('Unexpected translation response:', translationData);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    `);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
