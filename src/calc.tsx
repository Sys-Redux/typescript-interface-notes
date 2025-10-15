// TypeScript Age Calculator

import './App.css'

function calcAge(birthYear: number, currentYear: number): number {
  return currentYear - birthYear
}

function App() {
  const myName: string = 'John Doe'
  const birthYear: number = 1995
  const currentYear: number = 2025

  return (
    <>
      <div className="App">
        <h1>Hello, {myName}!</h1>
        <p>You are {calcAge(birthYear, currentYear)} years old.</p>
      </div>
    </>
  )
}

export default App
