import React from 'react';
import { ThemeContext } from './theme-context';

export default function Child(props) {
    return (
            <ThemeContext.Consumer>
                { ({appTheme,toggleTheme})=>(<div>
                    <div style={{background: appTheme.background, color: appTheme.foreground}}>child component</div>
                    <button onClick={toggleTheme}>
                        changeTheme
                    </button>                      
                </div>) }
            </ThemeContext.Consumer>
            )
}
