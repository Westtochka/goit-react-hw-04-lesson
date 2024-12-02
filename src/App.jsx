import { useEffect, useState } from "react";
import axios from "axios";
import Articles from "./components/Articles/Articles";
import { fetchArticles } from "./service/api";
import Loader from "./components/Loader/Loader";
import SearchBar from "./components/SearchBar/SearchBar";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const { hits } = await fetchArticles(query);
        setArticles(hits);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [query]);
  const handleChangeQuery = (query) => {
    setQuery(query);
  };
  return (
    <div>
      <SearchBar onChangeQuery={handleChangeQuery} />
      {isLoading && <Loader />}
      <Articles articles={articles} />
      {isError && <h2>Щось сталось!!! Онови сторінку</h2>}
    </div>
  );
};

export default App;
axios;
// .get("https://hn.algolia.com/api/v1/search?query=react")
// .then((res) => setArticles(res.data.hits));
