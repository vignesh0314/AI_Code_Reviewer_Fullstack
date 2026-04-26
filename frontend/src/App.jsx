import { useState, useRef } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import { java } from '@codemirror/lang-java'
import { cpp } from '@codemirror/lang-cpp'
import { oneDark } from '@codemirror/theme-one-dark'
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'
import axios from 'axios'
import './App.css'

const LANGUAGES = [
  { label: 'JavaScript', value: 'javascript', ext: () => javascript({ jsx: true }) },
  { label: 'Python', value: 'python', ext: () => python() },
  { label: 'Java', value: 'java', ext: () => java() },
  { label: 'C++', value: 'cpp', ext: () => cpp() },
  { label: 'TypeScript', value: 'typescript', ext: () => javascript({ typescript: true, jsx: true }) },
]

const DEFAULT_CODE = {
  javascript: `function sum(a, b) {\n  return a + b\n}\n\nconsole.log(sum(1, 2))`,
  python: `def sum(a, b):\n    return a + b\n\nprint(sum(1, 2))`,
  java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
  cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}`,
  typescript: `function greet(name: string): string {\n  return \`Hello, \${name}!\`\n}\n\nconsole.log(greet("World"))`,
}

function App() {
  const [lang, setLang] = useState(LANGUAGES[0])
  const [code, setCode] = useState(DEFAULT_CODE.javascript)
  const [review, setReview] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const reviewRef = useRef(null)

  function handleLangChange(e) {
    const selected = LANGUAGES.find(l => l.value === e.target.value)
    setLang(selected)
    setCode(DEFAULT_CODE[selected.value])
    setReview('')
    setError('')
  }

  async function reviewCode() {
    if (!code.trim()) {
      setError('Please write some code before reviewing.')
      return
    }
    setIsLoading(true)
    setError('')
    setReview('')
    try {
      const response = await axios.post('/ai/get-review', { code })
      setReview(response.data)
    } catch (err) {
      console.error('Error reviewing code:', err)
      const msg = err.response?.data?.error || err.message || 'Unknown error'
      setError(`Review failed: ${msg}`)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleCopy() {
    if (!review) return
    try {
      await navigator.clipboard.writeText(review)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  return (
    <>
      <div className="heading">
        <h1>AI-Powered Code Reviewer</h1>
        <p className="heading-sub">Paste your code · Select language · Get expert feedback instantly</p>
      </div>

      <main>
        {/* ── LEFT PANEL ── */}
        <div className="left">
          <div className="left-toolbar">
            <label htmlFor="lang-select" className="toolbar-label">Language</label>
            <select
              id="lang-select"
              className="lang-select"
              value={lang.value}
              onChange={handleLangChange}
            >
              {LANGUAGES.map(l => (
                <option key={l.value} value={l.value}>{l.label}</option>
              ))}
            </select>
            <span className="char-count">{code.length} chars</span>
          </div>

          <div className="code">
            <CodeMirror
              value={code}
              height="100%"
              extensions={[lang.ext()]}
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

          <button
            id="review-btn"
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
          </button>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="right" ref={reviewRef}>
          {error && (
            <div className="error-banner">
              <span className="error-icon">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {isLoading ? (
            <div className="loading-state">
              <div className="loader" style={{ transform: 'scale(1.5)' }}>
                <div className="loader__circle" />
                <div className="loader__circle" />
                <div className="loader__circle" />
                <div className="loader__circle" />
                <div className="loader__circle" />
              </div>
              <p>AI is reviewing your code…</p>
            </div>
          ) : review ? (
            <>
              <div className="review-header">
                <span className="review-badge">✅ Review Ready</span>
                <button
                  id="copy-btn"
                  className="copy-btn"
                  onClick={handleCopy}
                  title="Copy review to clipboard"
                >
                  {copied ? '✓ Copied!' : '⎘ Copy'}
                </button>
              </div>
              <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
            </>
          ) : !error ? (
            <div className="placeholder">
              <div className="placeholder-icon">🤖</div>
              <h3>Welcome to AI Code Reviewer</h3>
              <p>Write your code in the editor and click <strong>"Review Code"</strong> to get AI-powered feedback on:</p>
              <ul>
                <li>Code quality &amp; best practices</li>
                <li>Potential bugs &amp; issues</li>
                <li>Performance improvements</li>
                <li>Security concerns</li>
                <li>Alternative approaches</li>
              </ul>
            </div>
          ) : null}
        </div>
      </main>
    </>
  )
}

export default App