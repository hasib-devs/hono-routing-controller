import { Container } from "@/di/Container";
import { injectionMetadata } from "@/utils/meta-data";



export function Inject(token: unknown) {
    return (target: object, _: string | symbol, parameterIndex: number) => {
        const metadata = injectionMetadata.get(target.constructor) ?? [];
        metadata[parameterIndex] = token;
        injectionMetadata.set(target.constructor, metadata);
    };
}

export function Injectable() {
    return (constructor: new (...args: any[]) => any) => {
        Container.register(constructor, () => createInstance(constructor));
    };
}


export function createInstance<T>(constructor: new (...args: any[]) => T): T {
    const metadata = injectionMetadata.get(constructor) ?? [];
    const args = metadata.map((token) => {
        try {
            return Container.resolve(token);
        } catch (error) {
            if (error instanceof Error && error.message.startsWith('Circular dependency')) {
                // Enhance error message with class name
                throw new Error(
                    `${error.message} in ${constructor.name} constructor`
                );
            }
            throw error;
        }
    });
    return new constructor(...args);
}