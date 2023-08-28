import axios from "axios";

function Filter({ persons, searchTerm, setPersons, setErrorMessage }) {
  // Filter the persons array based on the search term
  const filteredPersons = persons.filter((person) => {
    return person.name.toLowerCase().startsWith(searchTerm.toLowerCase());
  });

  const deletePerson = (id, personName) => {

    console.log("Delete person clicked:", personName);

    if (window.confirm(`Do you really want to delete ${personName}?`)) {
      console.log("Confirmed to delete:", personName);
      // Make a DELETE request to the backend API
      axios
        .delete(`http://localhost:3001/api/persons/${id}`)

        .then(() => {
          setPersons((prevPersons) =>
            prevPersons.filter((person) => person.id !== id)
          );
          // Log the deleted person to the console
          console.log(`Deleted person: ${personName}`);
        })

        .catch((error) => {
          console.error("Error deleting person:", error);
          setErrorMessage(`${personName} has already been deleted`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        });
    }
  };

  return (
    <>
      <div>
        <ul>
          {filteredPersons.map((person) => (
            <li key={person.id}>
              name: {person.name} no: {person.number}
              <button onClick={() => deletePerson(person.id, person.name)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      ...
    </>
  );
}

export default Filter;
