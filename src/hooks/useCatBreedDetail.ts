import { BreedDetail } from "cat/breeds";
import { useEffect, useState } from "react";
import { fetchBreedDetail } from "../services/CatApi";

export default function useCatBreedDetail(breedId: string) {
    const [breedDetail, setBreedDetail] = useState<BreedDetail>();

    useEffect(() => {
        const controller = new AbortController();
        const fetch = async () => setBreedDetail(await fetchBreedDetail(breedId, controller));

        fetch();

        return () => controller.abort();
    }, [breedId]);

    return breedDetail;
}
