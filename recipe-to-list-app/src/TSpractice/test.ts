type Car = {
    make: string;
    model: string;
}

const showDetails = <T>(car: T): void => {
    console.log(car)
}

const makeDetail: string = "honda";
const modelDetail: string = "civic"

const newCar = showDetails<{make: string, model: string}>({make: makeDetail, model: modelDetail})