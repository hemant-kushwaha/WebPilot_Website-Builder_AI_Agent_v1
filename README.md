# AI Website Builder Agent

An AI-powered website builder that uses **Google Gemini's Interactions
API** and **function calling** to create websites automatically from
natural-language instructions.

The agent doesn't just generate website code in the chat. It can
**create directories, write files, read files, and inspect the generated
project** through tools.

------------------------------------------------------------------------

## 🚀 Features

-   🤖 AI-powered website generation using Google Gemini
-   🛠️ Function/tool calling for filesystem operations
-   📁 Automatically creates separate projects for websites
-   📝 Generates `index.html`, `style.css`, and `script.js`
-   🔍 Can read existing files
-   📂 Can list project files
-   🔄 Maintains conversation context using Gemini interaction IDs
-   🔒 Restricts file operations to the `generated-sites` directory
-   🌐 REST API using Express
-   🔌 CORS enabled
-   📦 Uses vanilla HTML, CSS and JavaScript for generated websites

------------------------------------------------------------------------

## 🏗️ Architecture

``` text
                         User
                           │
                           │ POST /api/chat
                           ▼
                    ┌──────────────┐
                    │   Express    │
                    │  server.js   │
                    └──────┬───────┘
                           │
                           ▼
              ┌────────────────────────┐
              │ websiteBuilderAgent.js │
              │                        │
              │ Gemini orchestration   │
              └───────────┬────────────┘
                          │
                          ▼
                   ┌─────────────┐
                   │   Gemini    │
                   │     AI      │
                   └──────┬──────┘
                          │
                    Function Call
                          │
                          ▼
                    ┌───────────┐
                    │  tools.js │
                    └─────┬─────┘
                          │
                          ▼
                ┌───────────────────┐
                │   fileSystem.js   │
                └─────────┬─────────┘
                          │
                          ▼
                  generated-sites/
```

------------------------------------------------------------------------

## 📂 Project Structure

``` text
AiAgent/
│
├── generated-sites/
│   └── <generated websites>
│
├── src/
│   ├── server.js
│   ├── websiteBuilderAgent.js
│   ├── tools.js
│   ├── prompt.js
│   │
│   └── workspace/
│       └── fileSystem.js
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

### `server.js`

Responsible for the HTTP API.

``` text
POST /api/chat
DELETE /api
```

It receives the user's request and passes it to the website builder
agent.

------------------------------------------------------------------------

### `websiteBuilderAgent.js`

The **core agent/orchestrator**.

Responsible for:

-   Sending requests to Gemini
-   Maintaining the interaction ID
-   Detecting function calls
-   Executing tools
-   Sending tool results back to Gemini
-   Continuing the agent loop
-   Returning the final response

The basic agent loop is:

``` text
User request
     ↓
Gemini
     ↓
Function call?
     ↓
Execute tool
     ↓
Function result
     ↓
Gemini
     ↓
Function call?
     ↓
...
     ↓
Final response
```

------------------------------------------------------------------------

### `prompt.js`

Contains the system instructions that define how the website-building
agent should behave.

For example, the agent is instructed to:

-   Actually create files
-   Use the available tools
-   Create responsive websites
-   Inspect its work
-   Fix obvious issues
-   Verify the final project

------------------------------------------------------------------------

### `tools.js`

Defines the tools available to Gemini.

Current tools:

  Tool                Purpose
  ------------------- ------------------------------------
  `createDirectory`   Create a website/project directory
  `writeFile`         Create or overwrite files
  `readFile`          Read an existing file
  `listFiles`         List project files

It also contains the mapping between Gemini tool names and JavaScript
functions.

------------------------------------------------------------------------

### `workspace/fileSystem.js`

Contains the actual filesystem implementation.

It performs:

``` text
createDirectory()
writeFile()
readFile()
listFiles()
```

It also contains the `safePath()` function that prevents the AI from
accessing files outside the website workspace.

------------------------------------------------------------------------

# ⚙️ Installation

### 1. Clone the repository

``` bash
git clone <repository-url>
cd AiAgent
```

### 2. Install dependencies

``` bash
npm install
```

### 3. Create `.env`

Create:

``` text
.env
```

in the **project root**:

``` text
AiAgent/
├── .env
├── package.json
└── src/
```

Add:

``` env
GEMINI_API_KEY=your_gemini_api_key
MODEL=your_gemini_model
```

Do not commit `.env` to Git.

------------------------------------------------------------------------

# ▶️ Running the Server

Run the server from the **project root**:

``` bash
node src/server.js
```

The server runs on:

``` text
http://localhost:8080
```

You should see:

``` text
Server running on port 8080
```

------------------------------------------------------------------------

# 🔌 API

## POST `/api/chat`

Creates or modifies a website based on the user's request.

### Request

``` http
POST http://localhost:8080/api/chat
Content-Type: text/plain
```

### Body

``` text
Create a modern coffee shop website called Brew Haven.

Include:
- Navigation
- Hero section
- Menu section
- About section
- Contact section
- Footer

Make it responsive and modern.

Actually create the files inside generated-sites.
```

### Response

The server returns the final text response from the AI:

``` text
The Brew Haven website has been created successfully.
```

The actual website files will be inside:

``` text
generated-sites/
└── brew-haven/
    ├── index.html
    ├── style.css
    └── script.js
```

------------------------------------------------------------------------

# 🧪 Testing with Postman

### Method

``` text
POST
```

### URL

``` text
http://localhost:8080/api/chat
```

### Header

``` text
Content-Type: text/plain
```

### Body

``` text
Create a modern portfolio website for a software developer.

Include:
- Navbar
- Hero section
- About section
- Skills
- Projects
- Contact form
- Footer

Use a modern dark design and make it responsive.

Create the actual files inside generated-sites using your tools.
```

------------------------------------------------------------------------

# 🔄 Reset Conversation

The API also provides:

``` http
DELETE /api
```

This resets the stored Gemini interaction ID.

Example:

``` bash
curl -X DELETE http://localhost:8080/api
```

After resetting, the next request starts a new conversation.

------------------------------------------------------------------------

# 🧠 Agent Tool Calling

The agent uses Gemini function calling to interact with the filesystem.

For example, when the user says:

``` text
Create a coffee shop website.
```

Gemini may decide:

``` text
createDirectory
```

with:

``` json
{
  "path": "brew-haven"
}
```

The application executes the function:

``` js
createDirectory({
  path: "brew-haven"
});
```

Gemini then receives the result and can decide to call:

``` text
writeFile
```

with:

``` text
brew-haven/index.html
```

Then:

``` text
writeFile
```

for:

``` text
brew-haven/style.css
```

and potentially:

``` text
writeFile
```

for:

``` text
brew-haven/script.js
```

This continues until Gemini determines that the website is complete.

------------------------------------------------------------------------

# 🛠️ Current Tools

### `createDirectory`

Creates a directory inside `generated-sites`.

Example:

``` text
createDirectory("brew-haven")
```

------------------------------------------------------------------------

### `writeFile`

Creates or overwrites a file.

Example:

``` text
writeFile(
    "brew-haven/index.html",
    "<html>...</html>"
)
```

------------------------------------------------------------------------

### `readFile`

Reads an existing file.

Example:

``` text
readFile("brew-haven/index.html")
```

Useful when the user asks the agent to modify an existing website.

------------------------------------------------------------------------

### `listFiles`

Lists the contents of a website project.

Example:

``` text
listFiles("brew-haven")
```

Useful for verifying that the expected files were created.

------------------------------------------------------------------------

# 🗺️ Future Improvements

The current implementation is the foundation of the website-building
agent.

Possible future additions:

### More filesystem tools

``` text
deleteFile
renameFile
moveFile
searchFiles
```

### Website preview

``` text
AI
 ↓
Generate website
 ↓
Start local preview server
 ↓
Browser preview
```

### Code validation

``` text
Generated code
      ↓
HTML validation
      ↓
CSS validation
      ↓
JavaScript validation
      ↓
Fix errors
```

### Browser testing

Allow the agent to:

``` text
Create website
      ↓
Run website
      ↓
Open browser
      ↓
Inspect page
      ↓
Find visual/functionality problems
      ↓
Modify files
      ↓
Test again
```

### Multiple users

The current implementation uses a single:

``` js
previousInteractionId
```

For production, this should be replaced with session/user-based storage:

``` text
User
 ↓
Session ID
 ↓
Interaction ID
 ↓
Gemini conversation
```

A database or Redis can then store the relationship.

------------------------------------------------------------------------

# 🔒 Environment Variables

Required:

``` env
GEMINI_API_KEY=...
MODEL=...
```

Never commit API keys.

Recommended `.gitignore`:

``` gitignore
node_modules/
.env
generated-sites/
```

------------------------------------------------------------------------

# 📋 Development Status

### Completed

-   [x] Express API
-   [x] Gemini integration
-   [x] Gemini interaction state
-   [x] Agent system prompt
-   [x] Function calling
-   [x] Directory creation
-   [x] File creation
-   [x] File reading
-   [x] File listing
-   [x] Workspace path protection
-   [x] Website generation workflow

### Planned

-   [ ] Multi-user sessions
-   [ ] Website preview
-   [ ] Browser-based testing
-   [ ] HTML/CSS/JS validation
-   [ ] Automatic error fixing
-   [ ] More filesystem tools
-   [ ] Persistent project management
-   [ ] Production deployment

------------------------------------------------------------------------

# 🎯 Goal

The long-term goal of this project is to build an **agentic website
builder** where a user can describe a website in natural language and
the AI can:

``` text
Understand requirements
        ↓
Plan the website
        ↓
Create files
        ↓
Write code
        ↓
Inspect files
        ↓
Fix problems
        ↓
Preview/test website
        ↓
Iterate based on user feedback
```

The key difference from a normal AI code generator is that the agent
**takes actions on the project filesystem instead of only generating
code in the chat**.
