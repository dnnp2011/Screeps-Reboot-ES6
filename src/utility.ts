export function calcBodyCost(body : string[]) : number {
    let cost = 0;

    body.map(part => {
        cost += BODYPART_COST[part];
    });

    console.log('Cost for body:', body, ' - ', cost);

    return cost;
}

export function report(message : string, context : any = null) : void {
    console.log(message, context.toString());
}


export class Err extends Error {
    constructor(context : string, message : string, data : any = {}) {
        super();

        const output = `${ context }: ${ message }. ${ JSON.stringify(data) }`;

        throw new Error(output);
    }
}
