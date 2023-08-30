import Block from '@/core/Block';
import formTmp from './tmp';
import { ButtonProps } from '../button';
import Input, { InputProps } from '../input';
import { Indexed } from '@/utils/mergeAndSet';

export interface FormProps {
    class: string;
    inputs: InputProps[];
    btnSubmit?: Block<ButtonProps>;
    onSuccess?: (data: unknown) => void;
    events: any;
}

export default class FormClass extends Block<FormProps> {
    init(): void {
        if (this.props.inputs?.length) {
            this.children.inputs = this.props?.inputs?.map((inp: InputProps) => new Input(inp));
        }

        this.setProps({
            events: {
                submit: this.submit.bind(this),
            },
        });
    }
    submit(e: Event) {
        e.preventDefault();

        const element = e.target as HTMLFormElement;
        const data = new FormData(element);

        const inputsInForm = Array.from(element.elements).filter((el: any) => el.name);

        if (Array.isArray(this.children.inputs)) {
            const isInputsValidate = this.children.inputs.every(inputInstance => {
                const currentInputEl = inputsInForm.find(
                    (inputElement: any) => inputElement.name === inputInstance.props.name
                ) as HTMLInputElement;

                if (currentInputEl) {
                    if (inputInstance.props.name === 'passwordRepeat') {
                        const password = inputsInForm.find(
                            (inputElement: any) => inputElement.name === 'password'
                        ) as HTMLInputElement;
                        if (password && password.value !== currentInputEl.value) {
                            inputInstance.setProps({
                                message: 'Пароли не совпадают',
                                value: currentInputEl.value,
                            });
                            return false;
                        }
                    }

                    return inputInstance.validate(currentInputEl);
                }

                return true;
            });

            if (isInputsValidate) {
                const newData: Indexed = {};
                data.forEach((value, key: any) => {
                    newData[key] = value;
                });
                this.props.onSuccess && this.props.onSuccess(newData);
            }
        }
    }
    render() {
        return this.compile(formTmp, this.props);
    }
}
