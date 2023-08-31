import Block from '@/core/Block';
import { AttributesMap } from '@/utils/AttributesMap';
import inputTmp from './tmp';
import getProps from '@/utils/getProps';

export interface InputProps {
    wrapperClassName?: string;
    classNames?: string;
    label?: string;
    value?: string;
    inputProps?: AttributesMap<HTMLInputElement>;
    rules?: { rule: RegExp; message: string }[];
    message?: string;
    events?: Record<string, (e: any) => void>;
    validate?: (element: HTMLInputElement) => void;
    name?: string;
    required?: boolean;
}

export default class Input extends Block<InputProps> {
    // validate: (element: HTMLInputElement) => void;

    constructor(props: InputProps) {
        if (props.inputProps) {
            const attributes = getProps(props.inputProps);

            props.inputProps = attributes.trim();
        }
        props.value = props.value || '';
        super(props);
    }

    init(): void {
        this.setProps({
            events: {
                focusout: this.validate.bind(this),
            },
        });
    }

    protected validate(e: Event | HTMLInputElement): boolean {
        let element = e as HTMLInputElement;
        if ('target' in e) {
            element = e.target as HTMLInputElement;
        }
        // const element = e.target as HTMLInputElement;
        if (this.props.required && !element.value) {
            this.setProps({
                message: 'Поле не может быть пустым',
                value: element.value,
            });
            this.element.classList.add('input-error');
            return false;
        }

        if (this.props.rules?.length) {
            return this.props.rules.every(({ rule, message }) => {
                if (!rule.test(element.value)) {
                    this.setProps({
                        message,
                        value: element.value,
                    });
                    this.element.classList.add('input-error');
                    return false;
                }
                this.setProps({
                    message: '',
                    value: element.value,
                });
                return true;
            });
        }

        this.setProps({
            message: '',
            value: element.value,
        });
        return true;
    }

    protected render() {
        return this.compile(inputTmp, this.props);
    }
}
