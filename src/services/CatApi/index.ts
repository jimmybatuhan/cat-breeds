import { Breed, BreedDetail, CatImage } from "cat/breeds";

const parseResponse = async <T>(response: Response): Promise<T> => {
    /**
     * when the response failed to parse the response into a json object,
     * throw an error.
     */
    try {
        return await response.json();
    } catch (error) {
        throw new Error("Unable to parse the response");
    }
};

export const fetchCatImages = async (breedId: string, page: number, controller: AbortController) => {
    const response = await fetch(
        `https://api.thecatapi.com/v1/images/search?page=${page}&limit=12&breed_id=${breedId}`,
        { signal: controller.signal }
    );

    if (!response.ok) {
        throw new Error("Unable to fetch cat images");
    }

    return await parseResponse<CatImage[]>(response);
};

export const fetchBreeds = async (controller: AbortController) => {
    const response = await fetch("https://api.thecatapi.com/v1/breeds", { signal: controller.signal });

    if (!response.ok) {
        throw new Error("Unable to fetch cat breeds");
    }

    return await parseResponse<Breed[]>(response);
};


export const fetchBreedDetail = async (breedId: string, controller: AbortController) => {
    const response = await fetch(`https://api.thecatapi.com/v1/images/${breedId}`, { signal: controller.signal });

    if (!response.ok) {
        throw new Error("Unable to fetch cat breed details");
    }

    return await parseResponse<BreedDetail>(response);
};
