import Block from '@/core/Block';
import tmp from './tmp';

interface AlertI {
    text: string;
    type: 'success' | 'error';
    delay?: number;
}

class Alert extends Block<AlertI> {
    protected render(): DocumentFragment {
        return this.compile(tmp, this.props);
    }
}

const alert = (props: AlertI) => {
    const alertInstance = new Alert(props);
    document.body.append(alertInstance.getContent() as Node);

    setTimeout(() => {
        alertInstance.hide();
    }, props.delay || 3000);
};

export default alert;
