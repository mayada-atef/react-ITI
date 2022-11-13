import Pet from "./Pet";
const Results = ({ pets }) => {
  return (
    <div className="search">
      {!pets.length && <h2>No Pets Found</h2>}
      {pets.length &&
        pets.map((pet) => (
          <Pet
            animal={pet.animal}
            name={pet.name}
            bread={pet.bread}
            key={pet.id}
            images={pet.images}
            location={`${pet.city} , ${pet.state}`}
            id={pet.id}
          />
        ))}
    </div>
  );
};
export default Results;
