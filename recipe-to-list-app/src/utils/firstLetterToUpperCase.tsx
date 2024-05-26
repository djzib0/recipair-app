export const firstLetterToUpperCase = (str: string) : string => {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
}

export const addPeriodSuffix = (str: string | undefined) : string | undefined => {
    if (typeof str === "string" && str.slice(-1) != ".") {
        return str + "."
    }
    return str;
} 