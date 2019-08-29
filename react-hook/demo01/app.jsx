import React, {useState} from 'react';
import ReactDOM from 'react-dom';


function App() {
  const [text, setText] = useState('Hello World!');
  let inputText = '';
  return (
    <div>
       <div>{text}</div>
       <input onInput={(event)=>{inputText = event.target.value}}/>
       <button onClick={()=>{ setText(inputText) }}>Change text</button>
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'))