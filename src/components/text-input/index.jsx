import "./styles.css";

export const TextInput = ({ searchValue, handleChange }) => (
  <input
    className="text-input"
    type="search"
    name="search"
    id="search"
    value={searchValue}
    onChange={handleChange}
  />
);
