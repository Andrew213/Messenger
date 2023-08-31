import Block from '@/core/Block';
import Route from './Route';

class Router {
    private static _instance: Router;

    // список роутов
    public routes: Route[] = [];

    private _pathnames: string[];

    private _history: History | undefined;

    private _currentRoute: Route | null = null;

    private _rootQuery = '';

    private _unprotectedPaths: `/${string}`[];

    public onRoute(callback: () => void) {
        this._onRouteCallback = callback;
        return this;
    }

    public setUnprotectedPaths(paths: `/${string}`[]) {
        this._unprotectedPaths = paths;
        return this;
    }

    //вызывается при переходах
    protected _onRouteCallback: () => void;

    constructor(rootQuery: string) {
        if (Router._instance) {
            throw new Error('Роутер уже создан');
        }

        this.routes = [];
        this._pathnames = [];
        this._unprotectedPaths = [];
        this._history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;
        this._onRouteCallback = () => {};
        Router._instance = this;
    }

    //записывает роуты
    public use(path: string, view: typeof Block<any>) {
        // создаём роут по этому пути
        const route = new Route(path, view, { rootQuery: this._rootQuery });

        this.routes.push(route);

        this._pathnames.push(path);

        return this;
    }

    private _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (!route) {
            this.go('/404');
            return;
        }

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;

        route.render();

        if (this._unprotectedPaths.includes(pathname as `/${string}`)) {
            this._onRouteCallback();
        }
    }

    public getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }

    public go(path: string) {
        if (this._history) {
            this._history.pushState({}, '', path);
            this._onRoute(path);
        }
    }

    public back() {
        this._history && this._history.back();
    }

    public forward() {
        this._history && this._history.forward();
    }

    private _hasRoute(pathname: string) {
        if (!this._pathnames.includes(pathname)) {
            return '*';
        }
        return pathname;
    }

    public start() {
        window.onpopstate = _event => {
            const pathname = this._hasRoute(window.location.pathname);
            this._onRoute(pathname);
        };
        const pathname = this._hasRoute(window.location.pathname);
        this._onRoute(pathname);
    }
}

export default new Router('#app');
