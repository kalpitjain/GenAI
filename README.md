# GenAi

GenAi is a Chatbot Chrome Extension built using React.js for its frontend which gives responses using OpenAi's ChatGPT api which is integrated using Node.js for its server side logic which interactes with frontend using server api.

## Installation

```bash
  git clone https://github.com/kalpitjain/GenAI-Assignment.git
```

### Frontend:

**Step 1:** Navigate to the frontend directory

```bash
  cd genai-extension
```

**Step 2:** Install the required dependencies

```bash
  npm install
```

**Step 3:** Build the extension

```bash
  npm run build
```

**Step 4:**
Open Google Chrome, go to Extensions, and enable Developer Mode.

**Step 5:**
Turn ON Developer Mode

**Step 6:**
Click on Load Package, then select the build directory of the genai-extension.

**Step 7:**
Find and enable the "GenAI Chat Extension 1.0" in the list of installed extensions.

### Backend:

**Step 1:** Navigate to the backend directory

```bash
  cd genai-api
```

**Step 2:**
In the .env file, add your OpenAI ChatGPT API key.

**Step 3:** Install the required dependencies

```bash
  npm install
```

**Step 4:**
Start the Node.js server

```bash
  node server.js
```

Once all completed these steps, the GenAi Chrome Extension should be successfully installed and operational.

## Challenges Faced and Solutions

#### Packaging as a Chrome Extension:

Creating a Chrome Extension using react involved specific requirements and restrictions. I overcame this challenge by following Chrome Extension development guidelines and using the appropriate development tools.
