import { Container } from "@/di/Container";
import type { Constructor } from "@/types";
import { controllerMetadata } from "@/utils/meta-data";

export function Controller(path: string) {
    return <T extends Constructor>(target: T) => {
        controllerMetadata.set(target, path);
        // Auto-register the controller as a singleton
        Container.register(target, () => new target(), "singleton");
    };
}