# SDE Lab 03: REST ADVANCED

# DOCUMENTATION: Example 01

### What is node js? Why it is called node? Why does it differ from other javascript libraries?

Node.js is a runtime environment that allows for the execution of JavaScript code server-side, using asynchronous, event-driven architecture; it is called "Node" to emphasize its intention for easily creating scalable network applications and differs from JavaScript libraries which are typically client-side and provides pre-written JavaScript code to simplify development tasks within a browser context.

In the Virtual Machine, you can see the folder named Example 1. When you open the folder using vs code, you can see there are two Javascript files and one html file as shown in the figure. 

![Alt text](https://github.com/Yusuke-Sugihara/SDE_LAB3/blob/main/Images/Image_0.JPG)

### app.js: 

This file typically serves as the main entry point for defining the core logic and functionality of the application. Functions and code in this file may include:

- managing user interaction and events on the webpage, such as form submissions, button clicks and user input
- making an API request to fetch data from the server or send data to the server
- updating the user interface (UI) dynamically to reflect the changes in the application’s state
- handling routing and navigation within a single-page application (SPA).

### index.html:

It is the main HTML file of the web application and it defines the structure and content of the web page. It is the entry point of your web application and it specifies how the page is initially displayed to the user. It includes a reference to the JavaScript file that provides the application’s functionality and interactivity.
## Getting Started with the Example 01:

After you load the Example 1 folder in the VS Code, open the `app.js` file, where you see the functions and code for making API requests to fetch the humor jokes. You can see all the codes are commented on, now we will uncomment them and discuss how the code works and how API request is made. Let’s get started:

### Frontend (index.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Joke Fetcher App</title>
</head>
<body>
    <input type="text" id="jokePrompt" placeholder="Enter joke keyword...">
    <button onclick="fetchJoke()">Get Joke</button>
    <script src="/script.js"></script>
</body>
</html>
```

### `<button onclick="fetchJoke()">Get Joke</button>`:

A button element that the user can click to trigger a joke fetch. The `onclick` attribute is an event handler that calls the `fetchJoke()` function when the button is clicked.

### `<script src="/script.js"></script>`:

This tag links an external JavaScript file named "script.js" to the HTML document. This file is expected to contain the `fetchJoke()` function that will be executed when the user clicks the "Get Joke" button.

### Backend (app.js)
```javascript
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 5600;
```
### Import necessary modules:

- `express`: a web server framework to handle HTTP requests.
- `axios`: a popular HTTP client library to make requests to the API server.
- `path`: a core Node.js module to handle file paths.

`app` is an instance of express, which you will use to define routes and handle HTTP requests.

`PORT` is set to 5600 as the port on which the server will listen for incoming requests.

```javascript
// Serve static files
app.use(express.static(path.join(__dirname, '.')));
```
This line serves static files (e.g., HTML, CSS, JavaScript) from the current directory (indicated by `__dirname`) using Express's built-in `express.static` middleware.

- `express.static`: `express.static` middleware serves static files such as HTML, CSS, and JavaScript directly from the server's current directory, providing efficient delivery of these unchanging resources.

`express.static` middleware serves static files like HTML, CSS, and images.

There are some other options for middleware:
- `express.json()` for parsing JSON bodies, which is used in Ex2.
- `express.urlencoded()`, which is for parsing URL-encoded bodies.
- Custom middleware for tasks like logging, authentication, and error handling.
```javascript
app.get('/fetchJoke', async (req, res) => {
    const apiUrl = "https://humor-jokes-and-memes.p.rapidapi.com/jokes/random";
    const prompt = req.query.prompt || '';
});
```
`app.get()` defines a route for HTTP GET requests to the endpoint '/fetchJoke'. 

- **`async (Asynchronous Operations)`:** Asynchronous operations in JavaScript let your program do things like talk to a database or another website while still being able to do other tasks at the same time. By using async, you tell JavaScript that you might have to wait for some actions to finish, like waiting for a joke to be fetched from another website. It's like saying, "I'll wait for this joke to arrive, but in the meantime, I can still listen to other requests or do other things."
- __why do we use async?:__ You use asynchronous operations to perform tasks that take some time to complete, like fetching data from the internet, without stopping your program from doing other work while it waits for those tasks to finish.

- **`(req, res)`:** In Express, `req` handles incoming request details, and `res` is used to send back the server's response. Both are parameters in route callbacks for managing HTTP interactions.

`apiUrl` is set to the URL of an external joke API.

`prompt` is extracted from the query parameters and set to an empty string if not provided.
```javascript
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
                'X-RapidAPI-Key': '.......',
                'X-RapidAPI-Host': 'humor-jokes-and-memes.p.rapidapi.com'
            }
        });
        res.json({ joke: response.data.joke });
    } catch (error) {
        console.error('Error fetching joke:', error);
        res.status(500).json({ error: 'Failed to fetch joke' });
    }
});
```
The `const response = await axios.get(apiUrl)` is a client-side command that waits for a response from an API request made with Axios, while `app.get('/fetchJoke', async (req, res) => { ... })` defines a server-side endpoint in an Express application that handles incoming GET requests to the '/fetchJoke' path asynchronously.

Inside this route handler, which is a function that processes requests to a specific endpoint and determines the response sent back to the client, an external API request is made using the axios library. The API request includes query parameters and headers.

The `res.json()` method in Express automatically sends a JSON response with the appropriate Content-Type header set, ensuring the client interprets the response as JSON.

If the request is successful, the response from the external API is sent as a JSON Response with the key 'joke' in the response.

If there's an error in the API request, an error message is logged, and a 500 Internal Server Error response is sent.
```javascript
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
            'X-RapidAPI-Key': '.................',
            'X-RapidAPI-Host': 'humor-jokes-and-memes.p.rapidapi.com'
        }
    });
}
```
The code within a `try` block is used to attempt to fetch a joke from an external API, and if any errors occur during this process, such as a failed network request or a bad response, they can be caught and dealt with gracefully in `catch(error){...}`.


`await`:  The await keyword in JavaScript pauses an async function until a Promise is fulfilled, letting other code run without blocking.

This line uses Axios to make a GET request to the defined API URL. The following parameters and headers are set for the request:

- Exclude jokes with tags matching the prompt.
- Jokes should not exceed 200 characters.
- Jokes should be of the 'one_liner' tag.
- Jokes should have a minimum rating of 7.
- Jokes should have the keyword ‘prompt.
    - We would like to create a joke associated with prompts provided by users.

It also sets API-specific headers for authentication and identification.
```javascript
});
if (response.data.jokes && response.data.jokes.length > 0) {
    res.json({ joke: response.data.jokes[0].joke });
} else {
    res.json({ joke: "No joke found!" });
}
} catch (error) {
    console.error('Error fetching joke:', error);
    res.status(500).json({ error: `Failed to fetch joke: ${error.message}` });
}
});
```
If the code finds jokes, it sends the first one back. However, if there are no jokes, it sends back a message saying "No joke found!". If something goes wrong during the process, it logs the error and sends back a message saying there was an error trying to fetch a joke.
```javascript
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
```
API Endpoint `/script.js`:

This code defines a route for HTTP GET requests to '/script.js'. The response is set to the type 'text/javascript', indicating that it's JavaScript code. The response body is a JavaScript function named `fetchJoke`. This function fetches a joke using an input prompt from the client, and upon success, it displays the joke using an alert. This code is serving a client-side script for the web page.

`const prompt = document.getElementById('jokePrompt').value;` in the JavaScript code fetches the value entered by the user into an input field with the ID `jokePrompt` on the webpage.

`encodeURIComponent(prompt)` function in JavaScript is used to safely encode a string (the user input from `prompt`) so that it can be included in a URL query string without interfering with the URL's structure by escaping special characters.

`fetch`: The fetch function in JavaScript requests data from servers and uses Promises to deal with the response later, allowing you to continue running other code while waiting for the data.
```javascript
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
```
The express application listens on the specified ‘PORT’, and a message is logged to the console when the server starts

Now we have uncommented all the codes. 

Let's open the new terminal. After you open the terminal, first, you need to install the libraries using the command prompt: 

```bash
npm install express cors axios path
```
Doing this creates a package.json file on the side window:

```bash
npm init --yes
``````
After that, you can start the application with the following command:

```bash
node app.js
````
Doing this should now display a message. 


![Alt text](https://github.com/Yusuke-Sugihara/SDE_LAB3/blob/main/Images/Image_1.JPG)

After this, you can go to the browser and enter `http://localhost:5600` and refresh the page.


![Alt text](https://github.com/Yusuke-Sugihara/SDE_LAB3/blob/main/Images/Image_2.JPG)

You can enter a keyword that you want now, let's say `education`, and now you can see the joke:

![Alt text](https://github.com/Yusuke-Sugihara/SDE_LAB3/blob/main/Images/Image_3.JPG)

**Suggested keywords: tech, apple, computer, knock, education, computer, football**

# DOCUMENTATION: Example 02

## Frontend (HTML)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Joke Fetcher App</title>
    <script src="/app2.js"></script>
</head>
<body>
    <input type="text" id="jokePrompt" placeholder="Enter joke prompt (currently not used)...">
    <button onclick="fetchJokeAndTranslate()">Get and Translate Joke</button>
</body>
</html>
````
- The `<script src="/app2.js"></script>` tag links an external JavaScript file, which is served by the Express server at the route `/app2.js` and contains the function `fetchJokeAndTranslate()`.
- A button `<button onclick="fetchJokeAndTranslate()">Get and Translate Joke</button>` is provided for the user to trigger the `fetchJokeAndTranslate()` function when clicked, which is supposed to fetch a joke and then translate it.

## Backend (app.js)
The backend server is set up with the following middleware:

```javascript
// Middleware for serving static files
app.use(express.static(path.join(__dirname, '.')));
app.use(express.json());  // Middleware for parsing JSON payloads
````
- `app.use(express.json());` This middleware adds a JSON parser to the Express app pipeline. It automatically parses incoming requests with JSON payloads, converting the JSON data in the request body into a JavaScript object that can be accessed with `req.body` in route handlers. (Note: Do you remember that we used `express.static()` in Example 1?)
The `fetchJokeAndTranslate` function is served as a separate JavaScript script:

```javascript
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
````
## The main flow of “app.js”

- `app.get('/app2.js', (req, res) => { ... })` : This defines a route handler in the Express application that listens for GET requests to the path '/app2.js'. 
- `res.type('text/javascript');` : This ensures that the served content is identified as JavaScript by the client.
- `res.send(...);` : This sends the string contents within the backticks(`...`) to the client. This string is actually a JavaScript function that can be used by the client's web page.
- `async function fetchJokeAndTranslate()`: It is an asynchronous function, as indicated by the async keyword, which means it can perform asynchronous operations like network requests.
- `const jokeResponse = await fetch('/getJoke');` : Performs an asynchronous GET request to the server's /getJoke endpoint and waits for the response before proceeding.
- `const jokeData = await jokeResponse.json();` : Once the joke is retrieved, it parses the response as JSON. The .json() method is also asynchronous and returns a promise, so await is used again.
- `const randomJoke = jokeData.joke;` : Assigns the value of the joke key from the jokeData object to the variable randomJoke.
- The `async function fetchJokeAndTranslate()` then proceeds to make another fetch call, this time to the /translateJoke endpoint. This is a POST request, indicated by the method property. The headers specify that the request body format is JSON. The body contains the joke to be translated, converted to a JSON string with JSON.stringify().
- After the translation request, the response is also parsed as JSON.
- The function then checks if the translatedText property is present in the parsed data. If it is, it displays the translation using an alert(). If not, it logs an unexpected response error. 
- If any error occurs during these asynchronous operations, the catch block will log the error to the console.

This concludes the main flow of the `app.js` file. Now, let's go into the part about how created jokes are translated.

The full code for the route handler that translates jokes is as follows:

```javascript
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
``````
**Lets see the code step by step.** 
```javascript
app.post('/translateJoke', async (req, res) => {
```
**Define a POST Route Handler:**

An asynchronous route handler is created for POST requests to the /translateJoke endpoint.

 ```javascript
app.post('/translateJoke', async (req, res) => {
const text = req.body.text;
```
**Extract Text from Request Body:**

const text = req.body.text;: The text that needs to be translated is extracted from the incoming request's body.  

```
```javascript
try {
    // The rest of your code goes here
} catch (error) {
    // Error handling code goes here
}
````
**Try-Catch Block:**

The try block is used for handling asynchronous operations that may throw exceptions (errors). If an error is thrown inside the try block, execution is immediately shifted to the catch block.

The next line of code in the try block is an asynchronous operation that sends a POST request to the Microsoft Translator Text API:

```javascript
const response = await axios.post('https://microsoft-translator-text.p.rapidapi.com/translate?to[0]=it&api-version=3.0&from=en&profanityAction=NoAction&textType=plain',
[{ Text: text }],
``````
**Make a POST Request with Axios:**

```javascript
const response = await axios.post('https://...');
``````
An asynchronous POST request is made to the Microsoft Translator Text API using Axios. It sends the text to be translated into Italian (as indicated by to[0]=it), specifies the API version to use, instructs to leave any profanity as is, and states that the text is plain. The request includes the content type, which is JSON, and the special keys needed to authenticate with the API.

**Why do we use “POST”?**

We use POST for the /translateJoke endpoint to securely send the joke text in the request body for translation, which cannot be done with a GET request.

```javascript
if (response && response.data && Array.isArray(response.data) && response.data.length > 0 && response.data[0].translations && response.data[0].translations.length > 0) {
    // Extract the translated text from the response
    const translatedText = response.data[0].translations[0].text;
    res.json({ translatedText });
} else {
    res.status(500).json({ error: 'Unexpected API response' });
}
``````
**Check the Response:** 
An if-else block checks if the response from the API has the expected format, i.e., if it contains a non-empty array with a translations property.


**Send Back the Translated Text:** 
If the response is in the correct format, the translated text is sent back to the client in JSON format.

```javascript
res.json({ translatedText });
``````
**Handle Unexpected API Response:**
 If the response format is not as expected, a 500 internal server error is returned with a message indicating an unexpected API response.
 ```javascript
res.status(500).json({ error: 'Unexpected API response' });
``````
Error Handling: The catch block handles any issues that might occur while trying to translate a joke, logs the error, and sends a response to the user indicating that the translation failed.


```javascript
} catch (error) {
    // Handle errors and send an error response if the translation request fails
    console.error('Error translating joke:', error);
    res.status(500).json({ error: 'Failed to translate joke' });
}
``````
# DOCUMENTATION: Example 03

### An Overview 

This application serves as a bridge between the user and several online services. It fetches jokes, translates them, and provides an audible version of the joke. Let's dive into its components:

**Initialization**

In the initialization phase, we create an instance of an Express application, preparing it to handle the requests.

```javascript
const app = express();
``````
**Waiting for Requests**

The application is set to "listen" on a specific port. When a user interacts with the web page, the application will receive this as a request on this port.

```javascript
app.listen(PORT, () => {});
``````

**1. Frontend (HTML):**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Other head elements -->
    <script src="client.js" defer></script>
</head>
<!-- Rest of the HTML -->
</html>
``````
- `<!DOCTYPE html>`: Declares the document to be HTML5.
- `<html lang="en">`: The root element of an HTML page, with “en” specifying that the language is English.
- `<head>`: Contains meta information and other resources like scripts and styles.
- `<script src="client.js" defer></script>`: Links the JavaScript file (client.js) to the HTML. The defer attribute ensures that the script is executed after the HTML is parsed.
  
**2. Frontend (JavaScript):**
```javascript
async function fetchJokeTranslateAndPlay() {
    // Your code goes here
}
``````

- `async`: This keyword allows the function to use the await keyword inside it, indicating asynchronous operations.
- `function`: Defines a JavaScript function.
- `document.getElementById(...)`: Fetches a DOM element by its ID.
- `.value`: Gets the value of an input element.
- `fetch(...)`: A browser method used for fetching data from a given URL.
- `encodeURIComponent(...)`: Encodes a URI component, ensuring characters like spaces, &, /, etc., are safely transmitted.
- `await`: Waits for a Promise to resolve.
- `.json()`: Parses the response body as JSON.
  
**2.1. Fetching a Joke**
When the user wants a joke, the application fetches it from the server:

```javascript
const jokeResponse = await 
fetch(`http://localhost:5600/getJoke?prompt=${encodeURIComponent(prompt)}`);
``````
The application communicates with an online joke service asking it for a joke based on the user's preference (e.g., "cats"). 

**2.2. Translating the Joke Once the joke is retrieved:**

```javascript
const breakSentenceResponse = await fetch(`http://localhost:5600/breakSentence?text=${encodeURIComponent(text)}`);
``````
The joke, initially in English, is sent to a translation service to be converted into Italian

**2.3. Converting Text to Voice With the translated joke in hand:**
``````javascript
const voiceResponse = await fetch(`http://localhost:5600/toVoice?text=${encodeURIComponent(breakSentenceData.translatedText)}&lang=it`);
``````
The application communicates with another service that turns the Italian text into audible speech.

**2.4. Delivering the Audio To make the audio accessible:**
``````javascript
audioElement.src = `http://localhost:5600/audioProxy?url=${encodeURIComponent(audioURL)}`;
``````
The application prepares the audio to be played directly from the web page, ensuring the user can hear i

**2.5. Displaying the Translated Joke In addition to hearing the joke:**
```javascript
document.getElementById('translatedText').innerText = breakSentenceData.translatedText;
``````
The Italian version of the joke is also displayed on the web page for the user to read.

**3. Backend (Node.js):**

**3.1. Importing Modules**

In Node.js, we import modules using the `require` function. Here, we're importing the `express` module, which is a web application framework for Node.js.

```javascript
const express = require('express');
```
- `const`: Declares a constant variable in JavaScript.
- `require(...)`: Imports a module in Node.js.
- `express`: A web server framework for Node.js.
- `axios`: A library to make HTTP requests.
- `cors`: Middleware to handle Cross-Origin Resource Sharing.
- `path`: Utilities for working with file and directory paths.

**3.2. Middleware and Static Content Serving:**

```javascript
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname)));
```
- `express()`: Initializes the Express application.
- `app.use(...)`: Uses middleware or other application settings in Express.
- `cors()`: Initializes the CORS middleware to handle cross-origin requests that allows the server to accept requests from different origins (websites).
- `express.static(...)`: Serves static files from a specified directory.
- `path.join(...)`: Joins path segments together.

**3.3. Routes:**

3.3.1. Root Route (`/`):
```javascript
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
```
- `app.get(...)`: Defines an HTTP GET route in Express.
- `req, res`: Represents the request and response objects in an Express route.
- `res.sendFile(...)`: Sends a file as a response.
  
3.3.2. Joke Route (`/getJoke`):

```javascript
app.get('/getJoke', async (req, res) => {
``````
- `req.query`: Contains the parsed query-string from the URL.
- `axios.request(...)`: Makes an HTTP request using axios.
- `res.json(...)`: Sends a JSON response.
  
3.3.3. Translation Route (`/breakSentence`):

```javascript
app.get('/breakSentence', async (req, res) => {
```
- `res.status(...)`: Sets the HTTP status code for the response.
  
3.3.4. Text-to-Voice Route (`/toVoice`):

```javascript
app.get('/toVoice', async (req, res) => {}
```
- `axios.post(...)`: Makes an HTTP POST request using axios.

3.3.5. Audio Proxy Route (`/audioProxy`):

```javascript
app.get('/audioProxy', async (req, res) => {
````
- `axios.get(...)`: Makes an HTTP GET request using axios.
- `.pipe(res)`: Streams data to the response.

**3.4. Server Initialization:**

```javascript
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
``````
## Client:
- The HTML provides an input field for the user to enter a joke prompt.
- Two buttons are present:
  1. To fetch a joke, translate it to Italian, and play it using a text-to-speech service.
  2. To fetch a joke and play it in English.
- The fetched joke’s translation (if translated) is displayed in a paragraph element, and the audio playback controls are provided for the user to play the joke.

## Server (Node.js with Express):
- Serves static files from the current directory.
- Provides the root endpoint (`/`) to serve the HTML file.
- Uses CORS middleware to handle cross-origin requests.
- The `/getJoke` endpoint fetches a random joke from an external API.
- The `/breakSentence` endpoint translates the provided text to Italian using the Microsoft Translator Text API.
- The `/toVoice` endpoint converts the provided text to voice (either in English or Italian) using an external text-to-speech API.
- The `/audioProxy` endpoint acts as a proxy to fetch audio data from an external URL and stream it to the client.

# Comparison:

**1. HTML Structure & User Interaction:**
   - Here we do forking where we have two buttons (for different functionalities), a display area for translated text, and audio controls for playback.
     
**2. Server Functionality:**
   - Before, we had endpoints for fetching a joke, translating a joke, and serving the JS function.
   - Here this example has more diverse functionalities with endpoints for fetching a joke, translating text, converting text to speech, and proxying audio data.  It also uses CORS to handle cross-origin requests.
     
**3. Integration:**
   - Before the JavaScript function is served directly from the server as a static file.
   - In this way, the client-side script is separated as “client.js”.
     
**4. Error Handling & Feedback:**
   - Both ways handle errors by logging them to the console, but the second way provides a more comprehensive client-side error handling mechanism.
     
**5. Audio Playback:**
   - This way enhances the user experience by not only translating the joke but also playing it audibly for the user in either English or Italian.
     
**6. API Calls:**
   - Both methods interact with external APIs, but this has more interactions, including text-to-speech conversion and fetching audio data.
     

In summary, while all ways achieve the goal of fetching and translating jokes, this way offers a richer and more interactive user experience with added functionalities like text-to-speech and audio playback.
