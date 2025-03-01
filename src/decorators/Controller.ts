
import { MetadataKey } from '../constants';
import { Container } from '../core/DIContainer';

export function Controller(path: string = '') {
    return (target: any) => {
        Reflect.defineMetadata(MetadataKey.Controller, path, target);
        Container.register(target.name, new target());
    };
}