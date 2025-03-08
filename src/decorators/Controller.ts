import { Container } from "../core/Container";
import { controllerMetadata } from "../meta-data";

export function Controller(path: string) {
    return (target: object) => {
        controllerMetadata.set(target, path);
        // Auto-register the controller as a singleton
        Container.register(target, () => new (target as any)(), "singleton");
    };
}