import { useState } from "react";
import axios from "axios";

function AddContact({ persons, setPersons }) {
  const [nameError, setNameError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    // Check if the name or number is empty
    if (newName.trim() === "" || newNumber.trim() === "") {
      console.log("Name and number fields cannot be empty");
      return;
    }
    // Check if the newName already exists in the persons array
    const nameExists = persons.some(
      (person) =>
        person.name === newName.trim() && person.number === newNumber.trim()
    );
    console.log("🚀 ~ file: App.jsx:11 ~ addPerson ~ nameExists:", nameExists);

    if (nameExists) {
      console.log(`${newName} is already added to phonebook`);
    } else {
        // Make a POST request to the backend API
        axios
          .post(`http://localhost:3001/api/persons/${newName}/${newNumber}`)
          .then((response) => {
            // Update the persons state with the new data
            setPersons([...persons, response.data]);
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
