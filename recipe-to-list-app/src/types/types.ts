import { Unit, IngredientType } from "../enums/enums";

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
    unit: Unit;
    ingredientType: IngredientType;

}

export type Recipe = {
    id?: string;
    title: string;
    description: string;
    imgUrl: string;
    steps?: CookingStep[];
    ingredients?: Ingredient[];
}

export type ShopListItem = {
    recipeId: string | undefined;
    quantity: number;
}

export type ShopList = {
    items: ShopListItem[];
}
