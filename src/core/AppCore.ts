import { injectable } from "tsyringe";

@injectable()
export class AppCore {
    constructor() {
        console.log('App constructor');
    }
}