import { Server } from './core/Server';
import type { ServerOptions } from './types';

// -------------------------------------------------------------------------
// Main exports
// -------------------------------------------------------------------------

export * from './decorators/Controller';
export * from './decorators/HttpMethods';
export * from './decorators/Inject';
export * from './di/Container';

export function createServer(app: any, options: ServerOptions): void {
    Server.create(app, options);
}