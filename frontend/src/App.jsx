import { useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'
import axios from 'axios'
import './App.css'

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1
}`)

  const [review, setReview] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function reviewCode() {
    setIsLoading(true)
    try {
      const response = await axios.post('http://localhost:3000/ai/get-review', { code })
      setReview(response.data)
    } catch (error) {
      console.error('Error reviewing code:', error)
      setReview('## Error\nUnable to get code review. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="heading">
        <h1>AI-Powered Code Reviewer</h1>
      </div>
      <main>
        <div className="left">
          <div className="code">
            <CodeMirror
              value={code}
              height="100%"
              extensions={[javascript()]}
              theme={oneDark}
              onChange={(value) => setCode(value)}
              basicSetup={{
                lineNumbers: true,
                highlightActiveLine: true,
                highlightSelectionMatches: true,
                autocompletion: true,
                foldGutter: true,
                bracketMatching: true,
                closeBrackets: true,
              }}
            />
          </div>
          <div
            onClick={reviewCode}
            className={`review-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="loader">
                <div className="loader__circle" />
                <div className="loader__circle" />
                <div className="loader__circle" />
                <div className="loader__circle" />
                <div className="loader__circle" />
              </div>
            ) : (
              'Review Code'
            )}
          </div>
        </div>
        <div className="right">
          {isLoading ? (
            <div className="loading-state">
              <div className="loader">
                <div className="loader__circle" />
                <div className="loader__circle" />
                <div className="loader__circle" />
                <div className="loader__circle" />
                <div className="loader__circle" />
              </div>
              <p>AI is reviewing your code...</p>
            </div>
          ) : review ? (
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          ) : (
            <div className="placeholder">
              <h3>Welcome to AI Code Reviewer</h3>
              <p>Write your code in the editor and click "Review Code" to get AI-powered feedback on:</p>
              <ul>
                <li>Code quality and best practices</li>
                <li>Potential bugs and issues</li>
                <li>Performance improvements</li>
                <li>Security concerns</li>
                <li>Alternative approaches</li>
              </ul>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default App