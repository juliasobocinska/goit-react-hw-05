import { useSearchParams } from 'react-router-dom';

export default function SearchForm({ getMovie }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const { name } = form.elements;
    const query = name.value.trim();

    if (!query) {
      alert('Please enter a search term.');
      return;
    }

    setSearchParams({ query });
    getMovie(query);
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Search..." />
      <button type="submit">Search</button>
    </form>
  );
}
