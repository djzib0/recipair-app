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
    stepNumber: number;
    description: string;
}

export type Ingredient = {
    recipeId: string;
    name: string;
    unit: Unit
}

export type Recipe = {
    title: string;
    description: string;
    step?: CookingStep[];
    ingredients?: Ingredient[];
}