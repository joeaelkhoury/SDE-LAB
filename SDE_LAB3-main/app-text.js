const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5600;

// Serve static files
app.use(express.static(path.join(__dirname, '.')));

app.get('/fetchJoke', async (req, res) => {
    fs.readFile('jokes.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading jokes:', err);
            return res.status(500).json({ error: 'Failed to fetch joke' });
        }
        
        const jokes = data.split('\n').filter(j => j.trim());
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        res.json({ joke: randomJoke });
    });
});

app.get('/script.js', (req, res) => {
    res.type('text/javascript');
    res.send(`
        async function fetchJoke() {
            try {
                const response = await fetch('/fetchJoke');
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
