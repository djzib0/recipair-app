export const firstLetterToUpperCase = (str: string) : string => {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
}

export const addPeriodSuffix = (str: string | undefined) : string | undefined => {
    if (typeof str === "string" && str.slice(-1) != ".") {
        return str + "."
    }
    return str;
} 

export const trimText = (str: string | undefined, length: number) : string => {
    if (str && str.length > length) {
        return `${str.slice(0, length)}...`
    } else {
        return `${str?.slice(0, length)}`
    }
}