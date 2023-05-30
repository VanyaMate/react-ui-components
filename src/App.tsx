import React from 'react';
import UI from './ui/ui.collection';


const App = () => {
    const input = UI.Input.useInputText('defaultValue');

    return (
        <div>
            <UI.Input.Text hook={input}/>
        </div>
    );
};

export default App;