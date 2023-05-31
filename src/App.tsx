import UI from './ui/ui.collection';
import {useInputText} from "./ui/input/text/use-input-text.hook";
import {useForm} from "./ui/form/use-form.hook";

const App = () => {
    const input = useInputText('', {
        validationFunction: (value) => !!value.match('1'),
    })
    const form = useForm<{ name: [string] }>();

    return (
        <div>
            <UI.Form hook={form}>
                <UI.Input.Text hook={input} name={'name'} placeholder={'Имя'}/>
                <UI.Button.Default active>Отправить</UI.Button.Default>
            </UI.Form>
        </div>
    );
};

export default App;