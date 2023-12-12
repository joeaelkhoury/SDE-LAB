async function fetchJokeTranslateAndPlay() {
    const prompt = document.getElementById('jokePrompt').value;

    try {
        const jokeResponse = await fetch(`http://localhost:5600/getJoke?prompt=${encodeURIComponent(prompt)}`);
        const jokeData = await jokeResponse.json();

        if (jokeData.joke) {
            const text = jokeData.joke;
            
            const breakSentenceResponse = await fetch(`http://localhost:5600/breakSentence?text=${encodeURIComponent(text)}`);
            const breakSentenceData = await breakSentenceResponse.json();

            if (breakSentenceData && breakSentenceData.translatedText) {
                document.getElementById('translatedText').innerText = breakSentenceData.translatedText;
                
                const voiceResponse = await fetch(`http://localhost:5600/toVoice?text=${encodeURIComponent(breakSentenceData.translatedText)}&lang=it`);
                const voiceData = await voiceResponse.json();
                const audioURL = voiceData.speech;

                if (audioURL) {
                    const audioElement = document.getElementById('translatedVoice');
                    audioElement.src = `http://localhost:5600/audioProxy?url=${encodeURIComponent(audioURL)}`;
                    audioElement.play();
                } else {
                    console.error('No audio URL received:', voiceData);
                }
            } else {
                console.error('Unexpected breakSentence response:', breakSentenceData);
            }
        } else {
            console.error('Unexpected joke response:', jokeData);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchJokeAndPlayEnglish() {
    const prompt = document.getElementById('jokePrompt').value;

    try {
        const jokeResponse = await fetch(`http://localhost:5600/getJoke?prompt=${encodeURIComponent(prompt)}`);
        const jokeData = await jokeResponse.json();

        if (jokeData.joke) {
            const text = jokeData.joke;
            
            const voiceResponse = await fetch(`http://localhost:5600/toVoice?text=${encodeURIComponent(text)}&lang=en`);
            const voiceData = await voiceResponse.json();
            const audioURL = voiceData.speech;

            if (audioURL) {
                const audioElement = document.getElementById('translatedVoice');
                audioElement.src = `http://localhost:5600/audioProxy?url=${encodeURIComponent(audioURL)}`;
                audioElement.play();
            } else {
                console.error('No audio URL received:', voiceData);
            }
        } else {
            console.error('Unexpected joke response:', jokeData);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
