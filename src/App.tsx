import UI from './index';
import {useInputText} from "./ui/input/text/use-input-text.hook";
import {useForm} from "./ui/form/use-form.hook";

const App = () => {
    const title = useInputText('', {
        name: 'title',
        validationFunction: (value) => value.trim().length > 5 && value.trim().length < 10,
        message: (value) => `Длина заголовка ${ value } должно быть больше 5 и меньше 10`
    })
    const desc = useInputText('', {
        name: 'description',
        validationFunction: (value) => value.trim().length > 10,
        message: (value) => `Значение описания ${ value } должно быть больше 10`
    })
    const number = useInputText('', {
        name: 'number',
        validationFunction: (value) => !value.match(/\D/gi),
        message: (value) => `Значение ${ value } должно содержать только цифры`
    })
    const form = useForm<{ title: string[], description: string[], number: string[] }>(
        (formResponse) => {
            console.log(formResponse.data.get);
        },
        [title, desc, number]
    );

    return (
        <div>
            <div>
                { form.valid.errors.map((error, index) => <p key={index}>[{ error.name }] { error.message }</p>)}
            </div>
            <UI.Form hook={form}>
                <UI.Input.Text hook={title} placeholder={'Имя'}/>
                <UI.Input.Text hook={desc} placeholder={'Описание'}/>
                <UI.Input.Text hook={number} placeholder={'Число'}/>
                <UI.Button.Default active={form.valid.status}>Отправить</UI.Button.Default>
            </UI.Form>
        </div>
    );
};

export default App;