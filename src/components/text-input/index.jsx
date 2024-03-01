export const TextInput = ({ searchValue, handleChange }) => (
  <input
    type="search"
    name="search"
    id="search"
    value={searchValue}
    onChange={handleChange}
  />
);
