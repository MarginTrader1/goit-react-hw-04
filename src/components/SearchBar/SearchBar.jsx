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
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default SearchBar;

// const input = document.getElementsByTagName("input"); //доступ к инпуту
// searchPhotos(input[0].value); //значение инпута
