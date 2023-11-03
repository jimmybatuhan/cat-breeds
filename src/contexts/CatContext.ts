import { Breed } from "cat/breeds";
import { createContext } from "react";

export default createContext<{
    breedImageUrl?: string,
    catBreeds: Breed[],
    selectedBreed: Breed | null,
    setBreedImageUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
    setSelectedBreed: React.Dispatch<React.SetStateAction<Breed | null>>;
} | null>(null);
