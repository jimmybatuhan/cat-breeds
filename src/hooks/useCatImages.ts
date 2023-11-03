import { CatImage } from "cat/breeds";
import { useEffect, useState } from "react";
import { fetchCatImages } from "../services/CatApi";

export default function useCatImages(breedId: string | undefined, page: number) {
    const [images, setImages] = useState<CatImage[]>([]);

    useEffect(() => {
        if (breedId !== undefined) {
            const controller = new AbortController();
            const fetch = async () => {
                setImages(await fetchCatImages(breedId, page, controller));
            };

            fetch();

            return () => controller.abort();
        }
    }, [breedId, page]);

    return images;

}
