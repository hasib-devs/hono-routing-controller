import type { Lifetime } from "@/types";
import { injectionMetadata } from "@/utils/meta-data";

type InjectableOptions = {
    lifetime?: Lifetime;
    token?: object; // For interface-based DI
};

export function Inject<T>(token: T) {
    return (
        target: object,
        _propertyKey: string | symbol | undefined,
        parameterIndex: number
    ) => {
        if (_propertyKey === undefined) {
            // Store metadata on the class constructor
            const ctor = target.constructor;
            const metadata = injectionMetadata.get(ctor) ?? [];

            metadata[parameterIndex] = token;
            injectionMetadata.set(ctor, metadata);
        }
    };
}

export function Injectable(options?: InjectableOptions) {
    return (target: any) => {
        const token = options?.token ?? target;
        const lifetime = options?.lifetime ?? "singleton";

        // Preserve original constructor for inheritance
        target.__originalConstructor = target;
        // console.log({ target, token, lifetime, instance: createInstance(target) });
        // Container.register(
        //     token,
        //     () => createInstance(target),
        //     lifetime
        // );
    };
}


// function createInstance<T>(constructor: Constructor<T>): T {
//     // Get metadata from the constructor directly
//     const metadata: any[] = injectionMetadata.get(constructor) ?? [];

//     console.log({ metadata });

//     const args = metadata.map(token => {
//         try {
//             return Container.resolve(token);
//         } catch (error) {
//             if (error instanceof Error) {
//                 throw new Error(`Dependency resolution failed: ${error.message}`);
//             }
//             throw error;
//         }
//     });

//     return new constructor(...args);
// }