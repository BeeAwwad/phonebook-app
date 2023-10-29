import axios from "axios";

const deletePerson = (id, personName, setPersons, setErrorMessage, setMessageClass) => {
  if (window.confirm(`Do you really want to delete ${personName}?`)) {
    axios
      .delete(`/api/persons/${id}`)
      .then(() => {
        setPersons((prevPersons) =>
          prevPersons.filter((person) => person.id !== id)
        );
        console.log(`Deleted person: ${personName}`);
      })
      .catch((error) => {
        console.error("Error deleting person:", error);
        setErrorMessage(`${personName} has already been deleted`);
        setMessageClass("error");
        setTimeout(() => {
          setErrorMessage(null);
          setMessageClass(null);
        }, 5000);
      });
  }
};

export { deletePerson };
