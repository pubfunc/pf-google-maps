

export function coerceNumber(value: any, def = 0) {
    return (!isNaN(parseFloat(value as any)) && !isNaN(Number(value))) ? Number(value) : def;
}

