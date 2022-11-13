import { useQuery } from "@tanstack/react-query";
const fetchBreed = async ({ queryKey }) => {
  const [, animal] = queryKey;
  if (!animal) {
    return [];
  }
  const res = await fetch(
    `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
  );
  return res.json();
};
const useBreedList = (animal) => {
  return useQuery(["breedList", animal], fetchBreed);
};
export default useBreedList;
