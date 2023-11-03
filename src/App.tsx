import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import CatContext from "./contexts/CatContext";
import { useState } from "react";
import { Breed } from "cat/breeds";
import useCatBreeds from "./hooks/useCatBreeds";

function App() {
    const breeds = useCatBreeds();
    const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null);
    const [breedImageUrl, setBreedImageUrl] = useState<string | undefined>();

    return (
        <CatContext.Provider value={{
            breedImageUrl,
            catBreeds: breeds,
            selectedBreed,
            setBreedImageUrl,
            setSelectedBreed
        }}
        >
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path=':breed' element={<Details />} />
                </Routes>
            </BrowserRouter>
        </CatContext.Provider>
    );
}

export default App;
