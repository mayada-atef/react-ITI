import { useQuery } from "@tanstack/react-query";

const fetchPet = async ({ queryKey }) => {
  const [, { animal, breed, location }] = queryKey;
  const res = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  );
  return res.json();
};
const usePetSearch = (searchParms) => {
  return useQuery(["pets", searchParms], fetchPet);
};
export default usePetSearch;
