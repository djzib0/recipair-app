// import enums
import { IngredientType } from "../enums/enums";
// images import
import milkProducts from '../../images/icons/milk.png'
import fatsAndOils from '../../images/icons/fatsandoils.png'
import fruits from '../../images/icons/fruits.png'
import grainNutsAndBakingProducts from '../../images/icons/grain.png'
import herbsAndSpices from '../../images/icons/herbs.png'
import meat from '../../images/icons/meat.png'
import fish from '../../images/icons/seafood.png'
import pastaAndRice from '../../images/icons/pasta.png'
import vegetables from '../../images/icons/vegetable.png'
import other from '../../images/icons/stepscolicon.png'



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

export const setTypeIcon = (type: IngredientType) => {
    switch (type) {
        case IngredientType.MilkProducts:
            return milkProducts;
        case IngredientType.FatsAndOils:
            return fatsAndOils;
        case IngredientType.Fruits:
            return fruits;
        case IngredientType.GrainNutsAndBakingProducts:
            return grainNutsAndBakingProducts;
        case IngredientType.HerbsAndSpices:
            return herbsAndSpices;
        case IngredientType.Meat:
            return meat;
        case IngredientType.Fish:
            return fish;
        case IngredientType.PastaAndRice:
            return pastaAndRice;
        case IngredientType.Vegetables:
            return vegetables;
        case IngredientType.Other:
            return other;
    }
}