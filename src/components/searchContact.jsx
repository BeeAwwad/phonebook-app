function SearchContact({ searchTerm, setSearchTerm }) {
  return (
    <div>
      <div>
        find contact here{" "}
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
    </div>
  );
}

export default SearchContact;
