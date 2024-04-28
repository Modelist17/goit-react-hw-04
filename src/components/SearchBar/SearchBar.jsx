import css from "./SearchBar.module.css";
import { toast } from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";

const initialValues = { searchTerm: "" };

const SearchBar = ({ onsearchQuery }) => {
  const handleSubmit = (values) => {
    if (!values.searchTerm) {
      toast.error("Please enter a search term");
      return;
    }
    onsearchQuery(values.searchTerm);
  };

  return (
    <header className={css.header}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <Field
            className={css.field}
            type="text"
            name="searchTerm"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <ErrorMessage
            className={css.error}
            name="searchTerm"
            component="span"
          />

          <button className={css.submitBtn} type="submit" aria-label="Search">
            🔍
          </button>
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
