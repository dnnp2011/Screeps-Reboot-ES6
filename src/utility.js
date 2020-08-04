export function calcBodyCost(body) {
    let cost = 0;
    body.map(part => {
        cost += BODYPART_COST[part];
    });

    console.log('Cost for body:', body, ' - ', cost);

    return cost;
}

export function report(message, context = null) {
    console.log(message, context);
}


export class Err extends Error {
    constructor(context, message, data = {}) {
        super();

        let output = `${ context }: ${ message }. ${ JSON.stringify(data) }`;

        throw new Error(output);
    }
}
