import { useState, useEffect } from "react";
import AddContact from "./components/addContact";
import SearchContact from "./components/searchContact";
import Filter from "./components/filter";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Make a GET request to your backend API endpoint
    axios
      .get("http://localhost:3001/api/persons")
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
      <AddContact persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Filter
        persons={persons}
        searchTerm={searchTerm}
        setPersons={setPersons}
      />
    </div>
  );
};

export default App;