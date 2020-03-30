import React,{ useState } from 'react';
import './App.css';
import Child from './ChildComponent';
import { themes, ThemeContext } from './theme-context';

function App() {
  const [appTheme, setAppTheme] = useState(themes.dark);
  return (
    <ThemeContext.Provider value={{
      appTheme, // 默认皮肤
      toggleTheme(){ // 实现换肤功能
        setAppTheme(appTheme === themes.dark ? themes.light : themes.dark);
      }
    }} >
      <div className="App">
        <div style={{ background: appTheme.background,color: appTheme.foreground }}>222</div>
        <Child />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
