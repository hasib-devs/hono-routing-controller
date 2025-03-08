import { Container } from "@/di/Container";
import { controllerMetadata } from "@/utils/meta-data";

export function Controller(path: string) {
    return (target: Function) => {
        controllerMetadata.set(target, path);
        // Auto-register the controller as a singleton
        Container.register(target, () => new (target as any)(), "singleton");
    };
}