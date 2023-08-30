import Block from '@/core/Block';

export default class Route {
    public pathname = '';

    public view: typeof Block;

    public block: Block | null = null;

    public props: Record<string, any>;

    constructor(pathname: string, view: typeof Block, props: Record<string, any>) {
        this.pathname = pathname;
        this.view = view;
        this.props = props;
        this.block = null;
    }

    get getPathname(): string {
        return this.pathname;
    }

    public navigate(newPathname: string) {
        if (newPathname === this.pathname) {
            this.pathname = newPathname;
            this.render();
        }
    }

    public render() {
        this.block = new this.view();

        //Причина всех причин, начало всех начал
        const root = document.querySelector('#app');
        const content = this.block.getContent() as HTMLElement;
        if (root) {
            root.append(content);
            return root;
        }
        return false;
    }

    public match(pathname: string): boolean {
        return pathname === this.pathname;
    }

    public leave() {
        if (this.block) {
            this.block.hide();
        }
    }
}
