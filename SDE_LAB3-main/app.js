const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 5600;

// Serve static files
app.use(express.static(path.join(__dirname, '.')));

app.get('/fetchJoke', async (req, res) => {
    const apiUrl = "https://humor-jokes-and-memes.p.rapidapi.com/jokes/random";
    const prompt = req.query.prompt || ''; 

    try {
        const response = await axios.get(apiUrl, {
            params: {
                'exclude-tags': 'sexist,rude,racist,yo_mamma,sexual,political,religious',
                'max-length': '200',
                'include-tags': 'one_liner',
                'min-rating': '7',
                keywords: prompt
            },
            headers: {
                'X-RapidAPI-Key': 'ac6ff202a0msha62eaa2244cd01bp14eb56jsnc98f9268668c',
                'X-RapidAPI-Host': 'humor-jokes-and-memes.p.rapidapi.com'
            }
        });
        res.json({ joke: response.data.joke });
    } catch (error) {
        console.error('Error fetching joke:', error);
        res.status(500).json({ error: 'Failed to fetch joke' });
    }
});

app.get('/script.js', (req, res) => {
    res.type('text/javascript');
    res.send(`
        async function fetchJoke() {
            const prompt = document.getElementById('jokePrompt').value;
            try {
                const response = await fetch('/fetchJoke?prompt=' + encodeURIComponent(prompt));
                const data = await response.json();
                alert(data.joke);
            } catch (error) {
                console.error('Error:', error);
            }
        }
    `);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
