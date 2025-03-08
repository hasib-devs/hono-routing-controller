import { Application } from './core/Application';
import type { Constructor, ServerOptions } from './types';

// -------------------------------------------------------------------------
// Main exports
// -------------------------------------------------------------------------

export * from './decorators/Controller';
export * from './decorators/HttpMethods';
export * from './decorators/Inject';
export * from './di/Container';

export function generateControllers(app: any, options: ServerOptions): void {
    Application.initialize(app, options);
}