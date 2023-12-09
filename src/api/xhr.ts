enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

type OptionT = {
    method: METHOD;
    data?: XMLHttpRequestBodyInit | Document;
    headers?: Record<string, string>;
};

type OptionsWithoutMethod = Omit<OptionT, 'method'>;

export default class HTTPTransport {
    static apiUrl = 'https://ya-praktikum.tech/api/v2';

    protected endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = `${HTTPTransport.apiUrl}${endpoint}`;
    }

    public get<Response>(url: string, options: OptionsWithoutMethod = {}): Promise<Response> {
        return this.request(this.endpoint + url, { ...options, method: METHOD.GET });
    }

    public post<Response>(path: string, options?: OptionsWithoutMethod): Promise<Response> {
        return this.request(this.endpoint + path, { ...options, method: METHOD.POST });
    }

    public delete(url: string, options: OptionsWithoutMethod = {}): Promise<Response> {
        return this.request(this.endpoint + url, { ...options, method: METHOD.DELETE });
    }

    public put<Response>(url: string, options: OptionsWithoutMethod = {}): Promise<Response> {
        return this.request(this.endpoint + url, { ...options, method: METHOD.PUT });
    }

    private request<Response>(url: string, options: OptionT = { method: METHOD.GET }): Promise<Response> {
        const { method, data, headers } = options;
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);

            if (headers) {
                Object.entries(headers).forEach(([key, value]) => {
                    xhr.setRequestHeader(key, value);
                });
            } else {
                xhr.setRequestHeader('Content-Type', 'application/json');
            }

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;
            xhr.onload = () => {
                if (xhr.status >= 300) {
                    reject(xhr);
                } else {
                    resolve(xhr.response as Response);
                }
            };

            // подключаю куки
            xhr.withCredentials = true;
            xhr.responseType = 'json';

            if (method === METHOD.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    }
}
