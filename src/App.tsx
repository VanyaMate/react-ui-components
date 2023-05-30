import React from 'react';
import UI from './ui/ui.collection';
import {useInputText} from "./ui/input/text/use-input-text.hook";


const App = () => {
    const input = useInputText('defaultValue');

    return (
        <div>
            <UI.Form onSubmit={(data) => console.log('form data', data)}>
                <UI.Input.Text hook={input} name={'title'}/>
                <UI.Button.Default/>
            </UI.Form>
        </div>
    );
};

export default App;