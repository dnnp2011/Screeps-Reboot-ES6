export default class Logger {
    public static log(message: string, ...args: any[]): void {
        if (args.length) {
            console.log(message, ...args);
        } else {
            console.log(message);
        }
    }

    public static logf(message: string, ...args: any[]): void {
        console.log(Logger.format(message, ...args));
    }

    public static error(message: string, ...args: any[]): void {
        if (args.length) {
            console.log(`<div style="color: indianred">${ message }</div>`, ...args);
        } else {
            console.log(`<div style="color: indianred">${ message }</div>`);
        }
    }

    public static warn(message: string, ...args: any[]): void {
        if (args.length) {
            console.log(`<div style="color: darkorange">${ message }</div>`, ...args);
        } else {
            console.log(`<div style="color: darkorange">${ message }</div>`);
        }
    }

    public static info(message: string, ...args: any[]): void {
        if (args.length) {
            console.log(`<div style="color: dodgerblue">${ message }</div>`, ...args);
        } else {
            console.log(`<div style="color: dodgerblue">${ message }</div>`);
        }
    }

    public static debug(message: string, ...args: any[]): void {
        if (args.length) {
            console.log(`<div style="color: mediumseagreen">${ message }</div>`, ...args);
        } else {
            console.log(`<div style="color: mediumseagreen">${ message }</div>`);
        }
    }

    private static format(message: string, ...params: any[]): string {
        for (let i = 0; i < params.length; i++) {
            message = message.replace('%s', params[i]);
        }

        return message;
    }
}
