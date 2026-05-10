import { useState } from 'react'
import blueImg from './assets/blue.svg'
import './App.css'

function App() {

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={blueImg} className="base" width="200" height="200" alt="" />
        </div>
        <div>
          <h1>Welcome to Blue</h1>
          <h2>The Broad Learning Universal Education System</h2>
        </div>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Blue community</p>
          <ul>
            <li>
              <a href="https://github.com/tonylam0/blue" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
