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
    recipeId?: string | undefined;
    portionQuantity: number;
    isPurchased: boolean;
}

export type ShopListRecipeIds = {
    recipeIds?: (string | undefined)[];
}

export type ShopListIngredient = {
    // recipeId => it's required before aggregation, never use it 
    // later, beacuse there is a list of ids in this type as well
    recipeId?: string; 
    name: string;
    quantity: number;
    unit: Unit;
    ingredientType: IngredientType;
    recipeIds?: (string | undefined)[];
    portionQuantity: number;
    isPurchased: boolean;
}
export type ShopList = {
    id?: string;
    title: string;
    ingredients: ShopListIngredient[];
}
