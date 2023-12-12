// Node.js built-in module imports
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5600;

app.use(cors());
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/getJoke', async (req, res) => {
    const prompt = req.query.prompt || '';
    const options = {
        method: 'GET',
        url: 'https://humor-jokes-and-memes.p.rapidapi.com/jokes/random',
        params: {
            'max-length': '200',
            'include-tags': 'one_liner',
            'min-rating': '7',
            'exclude-tags': 'sexist,rude,racist,yo_mamma,sexual,political,religious',
            keywords: prompt
        },
        headers: {
            'X-RapidAPI-Key': 'ac6ff202a0msha62eaa2244cd01bp14eb56jsnc98f9268668c',
            'X-RapidAPI-Host': 'humor-jokes-and-memes.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        res.json({ joke: response.data.joke });
    } catch (error) {
        console.error('Error fetching joke:', error);
        res.status(500).json({ error: 'Failed to fetch joke' });
    }
});

// app.get('/getQuote', async (req, res) => {
//     const options = {
//         method: 'GET',
//         url: 'https://random-quote-generator2.p.rapidapi.com/randomQuote',
//         headers: {
//             'X-RapidAPI-Key': 'ac6ff202a0msha62eaa2244cd01bp14eb56jsnc98f9268668c',
//             'X-RapidAPI-Host': 'random-quote-generator2.p.rapidapi.com'
//         }
//     };

//     try {
//         const response = await axios.request(options);
//         res.json({ quote: response.data.Quote, author: response.data.Author });
//     } catch (error) {
//         console.error('Error fetching quote:', error);
//         res.status(500).json({ error: 'Failed to fetch quote' });
//     }
// });


app.get('/breakSentence', async (req, res) => {
    const text = req.query.text;

    if (!text) {
        return res.status(400).json({ error: 'Text parameter is missing' });
    }

    const options = {
        method: 'POST',
        url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
        params: {
            'to[0]': 'it',
            'api-version': '3.0',
            from: 'en',
            profanityAction: 'NoAction',
            textType: 'plain'
        },
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'ac6ff202a0msha62eaa2244cd01bp14eb56jsnc98f9268668c',
            'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
        },
        data: [{ Text: text }]
    };

    try {
        const response = await axios.request(options);
        
        if (response && response.data && Array.isArray(response.data) && response.data.length > 0 && response.data[0].translations && response.data[0].translations.length > 0) {
            const translatedText = response.data[0].translations[0].text;
            res.json({ translatedText });
        } else {
            res.status(500).json({ error: 'Unexpected API response' });
        }
    } catch (error) {
        console.error('Error processing response:', error);
        res.status(500).json({ error: 'Failed to process response' });
    }
});



app.get('/toVoice', async (req, res) => {
    try {
        const response = await axios.post(
            'https://text-to-speech53.p.rapidapi.com/',
            {
                text: req.query.text,
                lang: req.query.lang || 'it',
                format: 'wav'
            },
            {
                headers: {
                    'content-type': 'application/json',
                    'X-RapidAPI-Key': 'ac6ff202a0msha62eaa2244cd01bp14eb56jsnc98f9268668c',
                    'X-RapidAPI-Host': 'text-to-speech53.p.rapidapi.com'
                }
            }
        );

        console.log('Text-to-Speech API response:', response.data);
        response.data.speech 
            ? res.json({ speech: response.data.speech }) 
            : res.status(500).json({ error: 'Failed to convert text to voice' });
    } catch (error) {
        console.error('Text-to-Voice error:', error);
        res.status(500).json({ error: 'Failed to convert text to voice' });
    }
});





app.get('/audioProxy', async (req, res) => {
    const audioURL = req.query.url;
    if (!audioURL) {
        return res.status(400).send('URL parameter is required.');
    }
    try {
        const audioResponse = await axios.get(audioURL, { responseType: 'stream' });
        audioResponse.data.pipe(res);
    } catch (error) {
        console.error('Error fetching audio:', error);
        res.status(500).send('Failed to fetch audio.');
    }
});

// // Define an endpoint on the server named '/audioProxy'
// app.get('/audioProxy', async (req, res) => {

//     // Extract the audio URL from the request's query parameters
//     const audioURL = req.query.url;

//     // Check if the 'url' parameter was provided in the request
//     if (!audioURL) {
//         // If not, send a 400 Bad Request response with a message
//         return res.status(400).send('URL parameter is required.');
//     }

//     // Attempt to fetch and stream the audio
//     try {
//         // Use axios to fetch the audio from the provided URL
//         // The 'responseType: stream' option means we want the data as a stream
//         const audioResponse = await axios.get(audioURL, { responseType: 'stream' });

//         // Stream the audio data directly to the client
//         audioResponse.data.pipe(res);

//     } catch (error) { // Handle any errors that might occur

//         // Log the error for debugging purposes
//         console.error('Error fetching audio:', error);

//         // Send a 500 Internal Server Error response with a message
//         res.status(500).send('Failed to fetch audio.');
//     }
// });





app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
