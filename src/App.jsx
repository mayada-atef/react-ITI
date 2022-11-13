import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdoptedPetContext from "./contexts/AdoptedPetContext";
import { lazy, Suspense, useState } from "react";
import Loader from "./components/Loader";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const SearchParams = lazy(() => import("./components/SearchParams"));
const Details = lazy(() => import("./components/Details"));
const Error404 = lazy(() => import("./components/Error404"));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});
function App() {
  const adoptedPet = useState(null);
  return (
    <BrowserRouter>
      <AdoptedPetContext.Provider value={adoptedPet}>
        <QueryClientProvider client={queryClient}>
          <Suspense
            fallback={
              <div className="loader-container">
                <Loader />
              </div>
            }
          >
            <header>
              <Link to="/">
                <h1>adopt me</h1>
              </Link>
            </header>
            <Routes>
              <Route path="/details/:id" element={<Details />} />
              <Route path="/" element={<SearchParams />} />
              <Route path="*" element={<Error404 />} />
            </Routes>
          </Suspense>
        
         <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
      </AdoptedPetContext.Provider>
    </BrowserRouter>
  );
}
export default App;
