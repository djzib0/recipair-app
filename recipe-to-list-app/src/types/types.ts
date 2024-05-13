import { Unit } from "../enums/enums";

export type PostProps = {
    key: number;
    id: number;
    title: string;
    body: string
}

export type MenuItem = {
    id: number;
    icon: JSX.Element;
    linkTo: string
}

export type CookingStep = {
    description: string;
}

export type Ingredient = {
    name: string;
    quantity: number;
    unit: Unit
}

export type Recipe = {
    title: string;
    description: string;
    steps?: CookingStep[];
    ingredients?: Ingredient[];
}