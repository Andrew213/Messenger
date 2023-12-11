import Block from '@/core/Block';

function isEqual(lhs: string, rhs: string) {
    return lhs === rhs;
}

function render(query: string, block: Block) {
    const root = document.querySelector(query);
    if (root) {
        root.append(block.getContent() as any);
        return root;
    }
    return false;
}

export default class Route {
    public _pathname = '';

    public _blockClass: typeof Block;

    public _block: Block | null = null;

    public _props: any;

    constructor(pathname: string, view: typeof Block, props?: unknown) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    get pathname() {
        return this._pathname;
    }

    public navigate(pathname: string): void {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    public leave(): void {
        if (this._block) {
            this._block.hide();
        }
    }

    public match(pathname: string): boolean {
        return isEqual(pathname, this._pathname);
    }

    public render(): void {
        this._block = new this._blockClass({});

        render(this._props.rootQuery, this._block);
    }
}
