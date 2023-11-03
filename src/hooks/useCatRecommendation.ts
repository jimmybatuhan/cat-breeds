import { Breed } from "cat/breeds";
import { useMemo } from "react";
import useCatContext from "./useCatContext";

export default function useCatRecommendation(
    filter: (breeds: Breed[]) => Breed[],
    totalRecommendation = 4
) {
    const { catBreeds } = useCatContext();
    const recommendations = useMemo(() => filter(catBreeds)
        // for randomness
        .filter(() => Math.random() < 0.4)
        .slice(0, totalRecommendation),
        [filter, catBreeds]
    );

    return recommendations;

}
