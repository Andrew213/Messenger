import cloneDeep from '@/utils/cloneDeep';
import { v4 as makeUUID } from 'uuid';
import EventBus from './EventBust';
import isEqual from '@/utils/isEqual';
import Handlebars from 'handlebars';
import { merge } from '@/utils/mergeAndSet';

export default class Block<P extends Record<string, any> = any> {
    [x: string]: any;
    private static EVENTS = {
        INIT: 'INIT',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    } as const;

    public props: P;

    private _element: HTMLElement | null | Element = null;

    private _id = makeUUID();

    public children: Record<string, Block | Block[]>;

    private _eventBus: () => EventBus;

    private _tagName: string;

    constructor(propsWithChildren = {}, tagName = 'div') {
        const eventBus = new EventBus();
        const { props, children } = this._getChildrenAndProps(propsWithChildren as P);
        this._registerEvents(eventBus);
        this._eventBus = () => eventBus;
        this._tagName = tagName;
        this.props = this._makeProxy(props);
        this.children = this._makeProxy(children);

        // Поехали!
        eventBus.emit(Block.EVENTS.INIT);
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _getChildrenAndProps(childrenAndProps: P): { props: P; children: Record<string, Block | Block[]> } {
        const props: Record<string, unknown> = {};
        const children: Record<string, Block | Block[]> = {};

        Object.entries(childrenAndProps).forEach(([key, value]) => {
            if (value instanceof Block || value[0] instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return { props: props as P, children };
    }

    get element() {
        if (this._element) {
            return this._element;
        }
        throw new Error('Нет елемента');
    }

    private _makeProxy(propsOrChildren: any) {
        const proxyProps = new Proxy(propsOrChildren, {
            set: (target, p, newValue) => {
                const oldTarget = cloneDeep(target);
                target[p] = newValue;

                this._eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);

                return true;
            },
            deleteProperty() {
                throw new Error('Нет доступа');
            },
        });

        return proxyProps;
    }

    private _createResources() {
        this._element = this._createDocumentElement(this._tagName);
    }

    private _createDocumentElement(tagName: string) {
        const element = document.createElement(tagName);

        if (this._id) element.setAttribute('data-id', this._id);

        return element;
    }

    private _init() {
        this._createResources();
        this.init();
        this._eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    protected init() {}

    private _componentDidMount() {
        this.componentDidMount();
        this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    protected componentDidMount() {}

    private _removeEvents() {
        const { events = {} } = this.props as P & {
            events?: Record<string, () => void>;
        };
        Object.keys(events).forEach(eventName => {
            this._element?.addEventListener(eventName, events[eventName]);
        });
    }

    private _addEvents() {
        const { events = {} } = this.props as P & {
            events?: Record<string, () => void>;
        };

        Object.keys(events).forEach(eventName => {
            this._element?.addEventListener(eventName, events[eventName]);
        });
    }

    private _componentDidUpdate(oldProps: P, newProps: P) {
        const isPropsChanged = !isEqual(oldProps, newProps);

        if (isPropsChanged) {
            this.componentDidUpdate(oldProps, newProps);
            this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    protected componentDidUpdate(_oldProps: P, _newProp: P) {}

    setProps = (nextProps: Partial<P>) => {
        if (!nextProps) {
            return;
        }

        const { props, children } = this._getChildrenAndProps(nextProps as P);

        if (Object.keys(children).length) {
            merge(this.children, children);
        }

        merge(this.props, props);
    };

    private _render() {
        const blockHTML = this.render();
        this._removeEvents();

        const newElement = blockHTML.firstElementChild;

        if (this._element && newElement) {
            this._element.replaceWith(newElement);
        }

        this._element = newElement;

        this._addEvents();
    }

    protected render(): DocumentFragment {
        return new DocumentFragment();
    }

    public getContent() {
        return this._element;
    }

    // сердце
    protected compile(template: string, context?: Record<string, any>) {
        const contextAndStubs = { ...context };
        Object.entries(this.children).forEach(([name, component]) => {
            if (Array.isArray(component)) {
                contextAndStubs[name] = component.map(el => {
                    return `<div data-id="${el._id}"></div>`;
                });
            } else {
                contextAndStubs[name] = `<div data-id="${component._id}"></div>`;
            }
        });
        const html = Handlebars.compile(template)(contextAndStubs);

        const temp = document.createElement('template');

        temp.innerHTML = html;

        Object.entries(this.children).forEach(([_, component]) => {
            if (Array.isArray(component)) {
                component.forEach(el => {
                    const stub = temp.content.querySelector(`[data-id="${el._id}"]`);
                    if (!stub) {
                        return;
                    }
                    el.getContent()?.append(...Array.from(stub.childNodes));
                    stub.replaceWith(el.getContent()!);
                });
            } else {
                const stub = temp.content.querySelector(`[data-id="${component._id}"]`);

                if (!stub) {
                    return;
                }

                component.getContent()?.append(...Array.from(stub.childNodes));

                stub.replaceWith(component.getContent()!);
            }
        });

        return temp.content;
    }

    show() {
        (this.getContent() as HTMLElement).style.display = 'block';
    }
    public hide() {
        this._element?.remove();
    }
}
