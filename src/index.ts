import Text from "./ui/input/text/input-text.component";
import Form from "./ui/form/form.component";
import Button from "./ui/button/button.component";
import {useInputText} from "./ui/input/text/use-input-text.hook";
import {useForm} from './ui/form/use-form.hook';

const UI = {
    Input: {
        Text: Text
    },
    Form: Form,
    Button: {
        Default: Button
    },
    useForm: useForm,
    useInputText: useInputText,
}

export default UI;