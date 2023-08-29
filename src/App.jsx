import { useState, useEffect } from "react";
import AddContact from "./components/addContact";
import SearchContact from "./components/searchContact";
import Notification from "./components/notification";
import Filter from "./components/filter";
import axios from "axios";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [messageClass, setMessageClass] = useState(null);

  useEffect(() => {
    // Make a GET request to your backend API endpoint
    axios
      .get("/api/persons")
      .then((response) => {
        setPersons(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false even if there's an error
      });
  }, []);

  // Log the updated persons state whenever it changes
  useEffect(() => {
    console.log("Updated persons:", persons);
  }, [persons]);

  if (loading) {
    // If loading is true, show the loading message
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchContact searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Notification message={errorMessage} messageClass={messageClass} />
      <AddContact
        persons={persons}
        setPersons={setPersons}
        message={setErrorMessage}
        setMessageClass={setMessageClass}
      />
      <h2>Numbers</h2>
      <Filter
        setErrorMessage={setErrorMessage}
        persons={persons}
        searchTerm={searchTerm}
        setPersons={setPersons}
        setMessageClass={setMessageClass}
      />
    </div>
  );
};

export default App;
