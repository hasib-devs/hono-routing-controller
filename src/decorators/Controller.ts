
import { MetadataKey } from '../constants';
import { container } from "tsyringe";

export function Controller(path: string = '') {
    return (target: any) => {
        Reflect.defineMetadata(MetadataKey.Controller, path, target);
        container.register(target.name, new target());
    };
}