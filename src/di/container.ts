type Token<T = any> = string | symbol | Newable<T> | Abstract<T>;
type Newable<T = any> = new (...args: any[]) => T;
type Abstract<T = any> = abstract new (...args: any[]) => T;
type Provider<T = any> = Newable<T> | { useValue: T; } | { useFactory: (container: DIContainer) => T; };

interface Registration<T = any> {
    provider: Provider<T>;
    scope: 'singleton' | 'transient';
    instance?: T;
}

export class DIContainer {
    private registry = new Map<Token, Registration>();
    private resolutionStack: Token[] = [];

    public register<T>(token: Token<T>, provider: Provider<T>, scope: 'singleton' | 'transient' = 'singleton'): void {
        this.registry.set(token, { provider, scope });
    }

    public resolve<T>(token: Token<T>): T {
        if (this.resolutionStack.includes(token)) {
            throw new Error(`Circular dependency detected: ${this.resolutionStack.join(' -> ')} -> ${token.toString()}`);
        }

        this.resolutionStack.push(token);
        try {
            const registration = this.registry.get(token);

            if (!registration) {
                throw new Error(`No provider registered for ${token.toString()}`);
            }

            if (registration.scope === 'singleton' && registration.instance) {
                return registration.instance;
            }

            let instance: T;
            if ('useValue' in registration.provider) {
                instance = registration.provider.useValue;
            } else if ('useFactory' in registration.provider) {
                instance = registration.provider.useFactory(this);
            } else {
                const ctor = registration.provider as Newable<T>;
                const params = this.getConstructorParams(ctor);
                instance = new ctor(...params);
            }

            if (registration.scope === 'singleton') {
                registration.instance = instance;
            }

            return instance;
        } finally {
            this.resolutionStack.pop();
        }
    }

    private getConstructorParams<T>(ctor: Newable<T>): any[] {
        const paramTypes: Newable[] = Reflect.getMetadata('design:paramtypes', ctor) || [];
        return paramTypes.map((param: Newable) => {
            if (!this.registry.has(param)) {
                throw new Error(`Unregistered dependency: ${param.name}`);
            }
            return this.resolve(param);
        });
    }

    public createChildContainer(): DIContainer {
        const child = new DIContainer();
        child.registry = new Map(this.registry);
        return child;
    }

    // Decorators
    static Injectable = (scope: 'singleton' | 'transient' = 'singleton'): ClassDecorator => {
        return (target: any) => {
            container.register(target, target, scope);
        };
    };

    static Inject = (token: Token): ParameterDecorator & PropertyDecorator => {
        return (target: any, propertyKey?: string | symbol, parameterIndex?: number) => {
            if (typeof parameterIndex === 'number') {
                const existingMetadata: Token[] = Reflect.getMetadata('di:params', target) || [];
                existingMetadata[parameterIndex] = token;
                Reflect.defineMetadata('di:params', existingMetadata, target);
            } else if (propertyKey !== undefined) {
                const existingMetadata: Record<string | symbol, Token> = Reflect.getMetadata('di:properties', target) || {};
                existingMetadata[propertyKey] = token;
                Reflect.defineMetadata('di:properties', existingMetadata, target.constructor);
            }
        };
    };
}

export const container = new DIContainer();