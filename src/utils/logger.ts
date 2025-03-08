// console.log("\x1b[32m Output with green text \x1b[0m")
// console.log("\x1b[35m Output with magenta text \x1b[0m")
// console.log("\x1b[34m Output with blue text \x1b[0m")
// console.log("\x1b[36m Output with cyan text \x1b[0m")

// console.log("\x1b[41m Output with red background \x1b[0m")
// console.log("\x1b[42m Output with green background \x1b[0m")
// console.log("\x1b[43m Output with yellow background \x1b[0m")


export class Logger {
    public static info(message: string): void {
        console.log(`\x1b[36m${message}\x1b[0m`);
    }

    public static warn(message: string): void {
        console.log(`\x1b[33mWARN: ${message}\x1b[0m`);
    }

    public static error(message: string): void {
        console.log(`\x1b[31mERROR: ${message}\x1b[0m`);
    }

    public static success(message: string): void {
        console.log(`\x1b[34m${message}\x1b[0m`);
    }

    public static debug(message: string): void {
        console.log(`\x1b[35mDEBUG: ${message}\x1b[0m`);
    }
}