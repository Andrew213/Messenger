import { IUser } from '@/api/AuthAPI/interfaces';
import { IChatsList } from '@/api/ChatAPI/interfaces';
import { IMessage } from '@/controllers/MessageController';
import EventBus from '@/core/EventBust';
import cloneDeep from '@/utils/cloneDeep';
import isEqual from '@/utils/isEqual';

export interface State {
    user?: IUser | null;
    chatsList?: IChatsList | null;
    chatToken?: string;
    messages?: IMessage[];
    currentChatId?: number;
    usersSearch?: IUser[] | [];
}

export enum StoreEvent {
    INIT = 'init',
    FLOW_SDM = 'flow:store-did-mount',
    FLOW_SDU = 'flow:store-did-update',
    FLOW_USE = 'flow:use',
}

class Store {
    public state: State = {};

    private subscribers: ((...args: any[]) => void)[];

    private _meta: {
        state: State;
    };

    private eventBus: () => EventBus;

    constructor(initialState: State = {}) {
        this._meta = {
            state: initialState,
        };
        const eventBus = new EventBus();
        this.eventBus = () => eventBus;
        this.subscribers = [];
        this.state = this._makeStateProxy(initialState);
        this._registerLifecycleEvents(eventBus);
    }

    private _registerLifecycleEvents(eventBus: EventBus) {
        eventBus.on(StoreEvent.INIT, this._init.bind(this));
        eventBus.on(StoreEvent.FLOW_SDM, this._storeDidMount.bind(this));
        eventBus.on(StoreEvent.FLOW_SDU, this._storeDidUpdate.bind(this));
        eventBus.on(StoreEvent.FLOW_USE, this._use.bind(this));
    }

    private _init() {
        this.eventBus().emit(StoreEvent.FLOW_SDM);
    }

    private _storeDidMount() {
        this.storeDidMount();
    }

    public storeDidMount() {}

    private _storeDidUpdate(oldState: State, newState: State) {
        const response = this.storeDidUpdate(oldState, newState);
        if (response) {
            this.eventBus().emit(StoreEvent.FLOW_USE);
        }
    }

    public storeDidUpdate(oldState: State, newState: State) {
        return !isEqual(oldState, newState);
    }

    private _use() {
        this.subscribers.forEach(subscriber => {
            subscriber(this.state);
        });
    }

    public setState(nextState: State) {
        if (!nextState) {
            return;
        }

        Object.assign(this.state, nextState);
    }

    private _makeStateProxy(state: State) {
        return new Proxy(state, {
            set: (target, item: keyof State, value) => {
                const oldTarget = cloneDeep(target);
                target[item] = value;
                this._meta.state = this.state;
                this.eventBus().emit(StoreEvent.FLOW_SDU, oldTarget, target);
                return true;
            },
            deleteProperty: () => {
                throw new Error('Нет доступа');
            },
        });
    }

    public subscribe(subscriber: (state: State) => void) {
        this.subscribers.push(subscriber);
        subscriber(this.state);
    }
}

const store = new Store({ messages: [] });

export default store;
