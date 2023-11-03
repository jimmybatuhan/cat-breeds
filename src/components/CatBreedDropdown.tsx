import { ChangeEvent } from "react";
import { Form } from "react-bootstrap";
import useCatContext from "../hooks/useCatContext";

const CatBreedDropdown: React.FC = () => {
    const { selectedBreed, catBreeds, setSelectedBreed } = useCatContext();
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedBreed(catBreeds.find(b => b.id === e.currentTarget.value) || null);
    };

    return (
        <div className="px-3">
            <Form.Select
                value={selectedBreed?.id}
                onChange={handleChange}
            >
                <option>Open this select menu</option>
                {catBreeds.length >= 1 && catBreeds.map((breed) =>
                    <option key={breed.id} value={breed.id}>
                        {breed.name}
                    </option>
                )}
            </Form.Select>
        </div>
    );
};

export default CatBreedDropdown;
