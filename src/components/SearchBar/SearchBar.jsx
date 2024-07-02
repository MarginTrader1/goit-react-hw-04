import css from "./SearchBar.module.css";

const SearchBar = ({ searchPhotos }) => {
  return (
    <header className={css.bar}>
      <form>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button
          type="submit"
          onClick={(evt) => {
            evt.preventDefault();
            const input = document.getElementsByTagName("input"); //доступ к инпуту
            searchPhotos(input[0].value); //значение инпута
          }}
        >
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
