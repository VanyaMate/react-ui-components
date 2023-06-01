import UI from './index';
import {useInputText} from "./ui/input/text/use-input-text.hook";
import {useForm} from "./ui/form/use-form.hook";

const App = () => {
    const input = useInputText('', {
        validationFunction: (value) => !!value.match('1'),
        message: (value) => `Значение ${ value } у имени должно содержать "1"`
    })
    const form = useForm<{ name: string[] }>(
        (formResponse) => {
            console.log(formResponse.data.get.name);
        },
        [input]
    );

    return (
        <div>
            <div>
                { form.valid.errors.map((error, index) => <p key={index}>{ error }</p>)}
            </div>
            <UI.Form hook={form}>
                <UI.Input.Text hook={input} name={'name'} placeholder={'Имя'}/>
                <UI.Button.Default active={form.valid.status}>Отправить</UI.Button.Default>
            </UI.Form>
        </div>
    );
};

export default App;