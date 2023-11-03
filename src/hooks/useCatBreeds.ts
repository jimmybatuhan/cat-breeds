import { Breed } from "cat/breeds";
import { useEffect, useState } from "react";
import { fetchBreeds } from "../services/CatApi";

export default function useCatBreeds() {
    const [breeds, setBreeds] = useState<Breed[]>([]);

    useEffect(() => {
        const controller = new AbortController();
        const fetch = async () => setBreeds(await fetchBreeds(controller));

        fetch();

        return () => controller.abort();
    }, []);

    return breeds;

}
