type Provider<T = any> = {
    factory: () => T;
    lifetime: "singleton" | "transient";
};

export class Container {
    private static registry = new Map<unknown, Provider>();
    private static instances = new WeakMap<object, unknown>();
    private static resolutionStack: unknown[] = []; // Track resolution path for circular dependencies

    static register<T>(
        token: unknown,
        factory: () => T,
        lifetime: "singleton" | "transient" = "singleton"
    ) {
        this.registry.set(token, { factory, lifetime });
    }

    static resolve<T>(token: unknown): T {
        // Detect circular dependencies
        if (this.resolutionStack.includes(token)) {
            const cycleStart = this.resolutionStack.indexOf(token);
            const cyclePath = [
                ...this.resolutionStack.slice(cycleStart),
                token
            ].map(t => this.getTokenName(t)).join(' -> ');

            throw new Error(`Circular dependency detected: ${cyclePath}`);
        }

        try {
            this.resolutionStack.push(token);
            const provider = this.registry.get(token);
            if (!provider) { throw new Error(`No provider for token: ${String(token)}`); };

            // Handle singleton lifetime
            if (provider.lifetime === "singleton") {
                if (!this.instances.has(token as object)) {
                    this.instances.set(token as object, provider.factory());
                }
                return this.instances.get(token as object) as T;
            }

            // Transient lifetime
            return provider.factory() as T;
        } finally {
            // Clean up stack even if errors occur
            this.resolutionStack.pop();
        }
    }

    private static getTokenName(token: unknown): string {
        if (typeof token === 'function') { return token.name || 'AnonymousClass'; };
        if (typeof token === 'symbol') { return token.toString(); };
        return String(token);
    }
}