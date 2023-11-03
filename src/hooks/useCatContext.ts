import { useContext } from "react";
import CatContext from "../contexts/CatContext";

export default function useCatContext() {
    const catContext = useContext(CatContext);

    if (catContext === null) {
        throw new Error("CatContext must be used inside <CatContext.Provider>");
    }

    return catContext;
}
