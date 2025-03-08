import { Container } from "@/di/Container";
import type { Constructor, Lifetime } from "@/types";
import { injectionMetadata } from "@/utils/meta-data";

type InjectableOptions = {
    lifetime?: Lifetime;
    token?: object; // For interface-based DI
};

export function Inject(token: unknown) {
    return (target: object, _: string | symbol, parameterIndex: number) => {
        const metadata = injectionMetadata.get(target) ?? [];
        metadata[parameterIndex] = token;
        injectionMetadata.set(target, metadata);
    };
}

export function Injectable(options?: InjectableOptions) {
    return (target: any) => {
        const token = options?.token ?? target;
        const lifetime = options?.lifetime ?? "singleton";

        // Register the class in the container
        Container.register(
            token,
            () => {
                // Use the existing createInstance function for dependency resolution
                return createInstance(target);
            },
            lifetime
        );

        // Store original constructor for potential edge cases
        target.__originalConstructor = target.prototype.constructor;

    };
}


function createInstance<T>(constructor: Constructor<T>): T {
    // Use original constructor if available
    const ctor = constructor.prototype?.__originalConstructor || constructor;
    const metadata: any[] = injectionMetadata.get(ctor) ?? [];

    const args = metadata.map((token) => {
        try {
            return Container.resolve(token);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error resolving ${token}: ${error.message}`);
            }
            throw error;
        }
    });

    return new ctor(...args);
}