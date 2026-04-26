# AI-Powered Code Reviewer 🤖🚀

An intelligent code review application that leverages Google's Gemini AI to provide instant, detailed feedback on your code. Whether you're looking for bug fixes, performance optimizations, or best practices, this tool has you covered.

---

## ✨ Features

- **Real-time Code Editing**: Integrated CodeMirror editor with syntax highlighting.
- **AI-Driven Feedback**: Powered by Google Gemini for deep code analysis.
- **Markdown Support**: Beautifully rendered reviews with highlighted code snippets.
- **Modern UI**: Sleek, responsive design with a dark mode aesthetic.
- **Detailed Insights**: Covers code quality, potential bugs, performance, security, and more.

---

## 🛠️ Tech Stack

### Frontend
- **React 19**
- **Vite**
- **CodeMirror** (for the editor)
- **React Markdown** & **Rehype Highlight** (for review rendering)
- **Axios** (for API communication)

### Backend
- **Node.js** & **Express**
- **Google Generative AI (@google/generative-ai)**
- **Dotenv** (for environment variables)
- **Cors**

---

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [NPM](https://www.npmjs.com/)
- A Google Gemini API Key. Get one [here](https://aistudio.google.com/api-keys).

### 2. Backend Setup

1. Navigate to the Backend directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `Backend` root:
   ```bash
   touch .env
   ```
4. Add your Gemini API key to the `.env` file:
   ```env
   GOOGLE_GEMINI_KEY=your_actual_api_key_here
   ```
5. Start the backend server:
   ```bash
   npx nodemon
   ```
   *The server will start on `http://localhost:3000`*

### 3. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the URL provided (usually `http://localhost:5173`).

---

## 📖 How to Use

1. Paste or write your code in the left-hand editor.
2. Click the **"Review Code"** button.
3. Wait for the AI to analyze your code.
4. Read the detailed feedback and suggestions in the right-hand panel.

---

## 🛡️ License

This project is licensed under the ISC License.

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

---

