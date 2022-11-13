import { useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";
import usePet from "../hooks/usePet";
import Carousel from "./Carousel";
import { useContext, useState, lazy } from "react";
import AdoptedPetContext from "../contexts/AdoptedPetContext";
const Model = lazy(() => import("./Model"));
const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const petQuery = usePet(id);
  const pet = petQuery?.data?.pets[0] ?? [];
  const [showModal, setShowModal] = useState(false);
  const [, setAdoptedPet] = useContext(AdoptedPetContext);
  // console.log(pet);

  return (
    <div className="details">
      {petQuery.isError && <h1>{petQuery.error}</h1>}
      {petQuery.isLoading && (
        <div className="search loader-container">
          <Loader />
        </div>
      )}
      {petQuery.data && (
        <div>
          <h2> Pet {id} Detail Page </h2>
          <h2>
            {pet.name}-{pet.animal}-{pet.breed}
          </h2>
          <p>{pet.description}</p>
          <Carousel images={pet.images} />
          <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>

          <button
            onClick={() => {
              navigate("/");
            }}
          >
            back Home
          </button>
          {showModal && (
            <Model>
              <div>
                <h1>would you like to adopt {pet.name}?</h1>
                <div>
                  <button
                    onClick={() => {
                      setAdoptedPet(pet);
                      navigate("/");
                    }}
                  >
                    yes
                  </button>
                  <button onClick={() => setShowModal(false)}>no</button>
                </div>
              </div>
            </Model>
          )}
        </div>
      )}
    </div>
  );
};
export default Details;
