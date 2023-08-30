type PlainObject<T = unknown> = {
    [k in string]: T;
};

function isArray(value: unknown): value is [] {
    return Array.isArray(value);
}

function isPlainObject(value: unknown): value is PlainObject {
    return (
        typeof value === 'object' &&
        value !== null &&
        value.constructor === Object &&
        Object.prototype.toString.call(value) === '[object Object]'
    );
}

function cloneDeep(obj: unknown): unknown {
    if (isArray(obj)) {
        return obj.map((el: unknown) => cloneDeep(el));
    }

    if (isPlainObject(obj)) {
        const cloneObj = {} as any;
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                cloneObj[key] = cloneDeep(obj[key]);
            }
        }
        return cloneObj;
    }
    return obj;
}
export default cloneDeep;
