import { useContext, useState } from "react";
import usePetSearch from "../hooks/usePetSearch";
import Loader from "./Loader";
import Results from "./Results";
import useBreedList from "../hooks/useBreedList";
import AdoptedPetContext from "../contexts/AdoptedPetContext";
const SearchParams = () => {
  const animals = ["bird", "cat", "dog", "rabbit", "reptile"];
  const [adoptedPet] = useContext(AdoptedPetContext);
  const [searchParams, setSearchParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  // console.log("searchParams", searchParams);
  const petsQuery = usePetSearch(searchParams);
  const pets = petsQuery?.data?.pets??[];
  // console.log("pets", pets);
  const breedQuery = useBreedList(searchParams.animal);
  console.log(breedQuery);
  const breeds = breedQuery?.data?.breeds ?? [];
  // console.log("breeds",breeds);
  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const animal = formData.get("animal");
          const location = formData.get("location");
          const breed = formData.get("breed");
          setSearchParams({ animal, location, breed });
        }}
      >
        {adoptedPet && (<div className="pet image-container">
          <img src={adoptedPet.images[0]}  alt={adoptedPet.name}/>
        </div>)}
        <label htmlFor="location">
          <input id="location" placeholder="location" name="location" />
        </label>
        <label htmlFor="animal">
          <select
            id="animal"
            placeholder="animal"
            name="animal"
            onChange={(e) => {
              setSearchParams({
                ...searchParams,
                breed: "",
                animal: e.target.value,
              });
            }}
          >
            {animals.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="bread">
          <select
            id="breed"
            placeholder="breed"
            disabled={!breeds.length}
            name="breed"
          >
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button type="sumbit"> submit</button>
      </form>
      {petsQuery.isLoading && (
        <div className="search loader-container">
          <Loader />
        </div>
      )}
      {petsQuery.isError && <span>{petsQuery.error}</span>}
      {petsQuery.data && <Results pets={pets} />}
    </div>
  );
};
export default SearchParams;
