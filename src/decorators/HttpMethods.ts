import { MetadataKey } from '../constants';

function createMethodDecorator(method: string, path: string = '') {
    return (target: any, key: string, _: PropertyDescriptor) => {
        Reflect.defineMetadata(MetadataKey.Route, { method, path }, target, key);
    };
}

export const Get = (path: string = '') => createMethodDecorator('get', path);
export const Post = (path: string = '') => createMethodDecorator('post', path);
export const Put = (path: string = '') => createMethodDecorator('put', path);
export const Patch = (path: string = '') => createMethodDecorator('patch', path);
export const Delete = (path: string = '') => createMethodDecorator('delete', path);