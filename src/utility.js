export function calcBodyCost(body) {
    let cost = body.reduce((part, acc) => {
        acc += BODYPART_COST[part];
    });

    console.log('Cost for body:', body, cost);
}

export function report(message, context) {
    console.log();
}


export class Err extends Error {
    constructor(context, message, data = {}) {
        super();

        let output = `${ context }: ${ message }. ${ data.toString() }`;

        throw new Error(output);
    }
}
