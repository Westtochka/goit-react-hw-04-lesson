import { useEffect, useState } from "react";
import axios from "axios";
import Articles from "./components/Articles/Articles";
import { fetchArticles } from "./service/api";
import Loader from "./components/Loader/Loader";
import SearchBar from "./components/SearchBar/SearchBar";
import toast from "react-hot-toast";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [nbPages, setNbPages] = useState(0);
  useEffect(() => {
    if (nbPages === page) {
      toast.success("You already download all posts");
    }
  }, [nbPages, page]);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const { hits, nbPages } = await fetchArticles(query, page);
        setNbPages(nbPages);
        setArticles((prev) => [...prev, ...hits]);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [query, page]);
  const handleChangeQuery = (query) => {
    setQuery(query);
    setArticles([]);
    setPage(0);
    toast("New change!");
  };
  return (
    <div>
      {page}
      <SearchBar onChangeQuery={handleChangeQuery} />
      {nbPages > page && (
        <button onClick={() => setPage((prev) => prev + 1)}>Load more</button>
      )}
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
