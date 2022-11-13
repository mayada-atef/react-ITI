import { useQuery } from "@tanstack/react-query";

const fetchpet = async ({ queryKey }) => {
  const [, id] = queryKey;
  const res = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);
  return res.json();
};
const usePet = (id) => {
  return useQuery(["pet", id], fetchpet);
};
export default usePet;
