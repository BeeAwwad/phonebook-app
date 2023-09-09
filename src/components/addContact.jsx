import { useState } from "react";
import axios from "axios";

function AddContact({ persons, setPersons, message, setMessageClass }) {
  const [nameError, setNameError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find(
      (person) => person.name === newName.trim()
    );
    console.log(
      "🚀 ~ file: addContact.jsx:14 ~ addPerson ~ existingPerson:",
      existingPerson
    );

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook. Do you want to update the number?`
        )
      ) {
        // Make a PUT request to update the number
        axios
          .put(`/api/persons/${existingPerson.id}`, {
            ...existingPerson,
            number: newNumber.trim(),
          })
          .then((response) => {
            // Update the persons state with the updated data
            setPersons((prevPersons) =>
              prevPersons.map((person) =>
                person.id === existingPerson.id ? response.data : person
              )
            );
          })
          .catch((error) => {
            console.error("Error updating person:", error);
          });
      }
    } else {
      // Make a POST request to add a new person
      axios
        .post("/api/persons", { name: newName, number: newNumber})
        .then((response) => {
          // Update the persons state with the new data
          setPersons([...persons, response.data]);
          message(`${newName} has been added successfully`);
          setMessageClass("completed");

          setTimeout(() => {
            message(null);
            setMessageClass(null);
          }, 5000);
        })
        .catch((error) => {
          console.error("Error adding person:", error);
        });
    }
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);

    // Check if the input contains numbers and display error message if true
    if (/\d/.test(event.target.value)) {
      setNameError("Name cannot contain numbers");
    } else {
      setNameError(""); // Clear the error message if the input is valid
    }
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);

    // Check if the input contains non-numeric characters and display error message if true
    if (/\D/.test(event.target.value)) {
      setNumberError("Number must contain only digits");
    } else {
      setNumberError(""); // Clear the error message if the input is valid
    }
  };
  return (
    <div>
      <h2>Add a new contact</h2>
      <form>
        <div>
          name:{" "}
          <input type="text" value={newName} onChange={handleNameChange} />
          {nameError && <div style={{ color: "red" }}>{nameError}</div>}
        </div>

        <div>
          number:{" "}
          <input
            type="number"
            value={newNumber}
            onChange={handleNumberChange}
          />
          {numberError && <div style={{ color: "red" }}>{numberError}</div>}
        </div>

        <div>
          <button type="submit" onClick={addPerson}>
            add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddContact;
