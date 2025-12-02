import { useEffect, useState } from "react";
import RecipeCard from "./recipecard";
import Header from "../Components/header.jsx";
import Loading from "../Components/loading.jsx"

const Home = () => {
  const [allvalues, setvalues] = useState({
    Meals: [],
    error: "",
    query: "",
    loading: false, 
  });

  const Food = async (search = "") => {
    const api = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
    try {
      setvalues({ ...allvalues, loading: true }); 
      let response = await fetch(api);
      let data = await response.json();

      if (response.ok === true) {
        setvalues({
          ...allvalues,
          Meals: data.meals || [],
          loading: false,
          error: "",
        });
      } else {
        setvalues({
          ...allvalues,
          error: "Failed to fetch meals",
          loading: false,
        });
      }
    } catch (error) {
      console.log(error);
      setvalues({ ...allvalues, error: error.message, loading: false });
    }
  };

  useEffect(() => {
    Food();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    Food(allvalues.query);
  };

  return (
    <>
      <Header
        query={allvalues.query}
        setquery={(q) => setvalues({ ...allvalues, query: q })}
        handleSearch={handleSearch}
      />

      <div className="p-2 my-4">
        {allvalues.error && <p className="text-danger">{allvalues.error}</p>}

        {allvalues.loading ? (
          <Loading />
        ) : (
          <div className="bg-dark d-flex flex-wrap justify-content-center">
            {allvalues.Meals.length > 0 ? (
              allvalues.Meals.map((e) => (
                <RecipeCard key={e.idMeal} recipe={e} />
              ))
            ) : (
              <img
                src="src/assets/not found.webp"
                width={"220px"}
                style={{ padding: "10px" }}
                alt="Not Found"
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
