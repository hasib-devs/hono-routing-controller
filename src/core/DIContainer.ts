class DIContainer {
    private instances = new Map<string | symbol, any>();
    private classes = new Map<string | symbol, new (...args: any[]) => any>();

    register<T>(token: string | symbol, instance: T) {
        this.instances.set(token, instance);
    }

    registerClass<T>(token: string | symbol, Class: new (...args: any[]) => T) {
        this.classes.set(token, Class);
    }

    resolve<T>(token: string | symbol): T {
        if (this.instances.has(token)) {
            return this.instances.get(token) as T;
        }
        if (this.classes.has(token)) {
            const Class = this.classes.get(token)!;
            return new Class() as T;
        }
        throw new Error(`No registration found for ${token.toString()}`);
    }
}

export const Container = new DIContainer();