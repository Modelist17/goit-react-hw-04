import css from "./SearchBar.module.css";
import { toast } from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";

const SearchBar = ({ onSubmit }) => {
  const initialValues = { searchTerm: "" };

  const handleSubmit = (values, { resetForm }) => {
    if (!values.searchTerm) {
      toast.error("Please enter a search term");
      return;
    }
    onSubmit(values.searchTerm);
    resetForm(); // Reset form fields after submission
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
