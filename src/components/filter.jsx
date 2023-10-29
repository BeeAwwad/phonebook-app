import { deletePerson } from "./deletePerson";

function Filter({
  persons,
  searchTerm,
  setPersons,
  setErrorMessage,
  setMessageClass,
}) {
  // Filter the persons array based on the search term
  const filteredPersons = persons.filter((person) => {
    return person.name.toLowerCase().startsWith(searchTerm.toLowerCase());
  });
// Delete person function for button
  const deletePersonHandler = (id, personName) => {
    deletePerson(id, personName, setPersons, setErrorMessage, setMessageClass);
  };

  return (
    <>
      <div>
        <ul>
          {filteredPersons.map((person) => (
            <li key={person.id}>
              name: {person.name} no: {person.number}
              <button
                onClick={() => deletePersonHandler(person.id, person.name)}
              >
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
