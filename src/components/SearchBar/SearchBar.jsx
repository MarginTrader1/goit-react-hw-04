import css from "./SearchBar.module.css";

const SearchBar = ({ searchPhotos }) => {
  // функция для сабмита
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target; //доступ к форме
    const searchTerm = form.elements.search.value; //значение инпута

    if (searchTerm.trim() === "") {
      alert("Please enter search term!");
      return; // проверка на пустую строку, trim() убирает пробелы
    }

    searchPhotos(searchTerm);
    form.reset();
  };

  return (
    <header className={css.bar}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search photos"
          className={css.input}
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default SearchBar;
