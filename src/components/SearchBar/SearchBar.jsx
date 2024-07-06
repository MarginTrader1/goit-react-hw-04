import css from "./SearchBar.module.css";

import toast from "react-hot-toast";

const notify = () =>
   // toaster и его настройки
   toast.error("Please enter search term!", {
      duration: 3000,
      position: "top-right",
   });

const SearchBar = ({ searchPhotos }) => {
   // функция для сабмита
   const handleSubmit = (evt) => {
      evt.preventDefault();
      const form = evt.target; //доступ к форме
      const searchTerm = form.elements.search.value; //значение инпута

      if (searchTerm.trim() === "") {
         notify();
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
            <button type="submit" className={css.button}>
               Search
            </button>
         </form>
      </header>
   );
};

export default SearchBar;
