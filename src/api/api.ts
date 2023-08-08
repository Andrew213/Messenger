import HTTPTransport from './xhr';

export default abstract class API {
    protected http: HTTPTransport;

    protected constructor(endpont: string) {
        this.http = new HTTPTransport(endpont);
    }
}
