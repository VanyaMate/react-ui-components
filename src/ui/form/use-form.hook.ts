export interface IUseFormOptions {
    onSubmit: (formData: FormData) => void;
}

export interface IUseForm {
    form: null;
    formData: FormData;
}

export const useForm = function (options: IUseFormOptions): IUseForm {

}