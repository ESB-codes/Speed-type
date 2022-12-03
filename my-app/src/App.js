import './App.css';
import React from "react"

function App() {

  const Starting_time=5

  // creating a state to store value of textarea
  let [text, setText]=React.useState("")

  // state to know the time remaining
  let [timeRemaining, setTimeRemaining]=React.useState(Starting_time)

  // state to start counter when we click the start button

  let [isGameRunning, setIsGameRunning]= React.useState(false)

  // creating a state variable to display word count at the end of time

  let [wordCount, setWordCount]= React.useState(0)

  let textArea=React.useRef(null)

  function handleChange(e){
    const {value}= e.target
    setText(value)
  }

  // function to calculate the number of words typed
  function numberOfWords(text){
    let words= text.trim().split(" ");
    return words.filter(x=> x!=="").length

  }

  function startGame(){
    setIsGameRunning(true)
    setWordCount(0)
    setTimeRemaining(Starting_time)
    setText("")
    textArea.current.disabled=false;
    textArea.current.focus()

  }

  function endGame(){
    setIsGameRunning(false)
      setWordCount(numberOfWords(text))

  }

  // making useeffect hook to decrement time using settimeout
  React.useEffect(()=>{
    if (isGameRunning && timeRemaining>0){
      setTimeout(() => {
        setTimeRemaining(time=> time-1)
      }, 1000);
    }
    else if (timeRemaining===0){
      endGame()

    }

  }, [timeRemaining, isGameRunning])

  return (
   <div>
      <h1>How fast do you type?</h1>
      <textarea 
      ref={textArea}
        disabled={!isGameRunning}
        onChange={handleChange}
        value= {text}
      />
      <h4>Time Remaining: {timeRemaining}</h4>
      <button 
      disabled={isGameRunning}
      onClick={startGame }>Start</button>
      <h1>Word Count: {wordCount}</h1>
   </div>
  );
}

export default App;
