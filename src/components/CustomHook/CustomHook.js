import React, { useRef, useState } from "react";
import useRandomJoke from "./useRandomJoke";

function CustomHook() {
  // https://api.icndb.com/jokes/random
  // https://api.icndb.com/jokes/random?firstName=Valyn&lastName=Silva

  // Custom Joke
  //   const joke = useRandomJoke[("Valyn", "Silva")];

  // const joke = useRandomJoke();
  // const joke = useRandomJoke("Valyn", "Silva"); // without useRefs and generateJoke button

  // useState
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const joke = useRandomJoke(firstName, lastName); // with useRef and generateJoke button

  // useRef
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);

  const generateJoke = (e) => {
    e.preventDefault(); // prevent page from refreshing after submitting form
    setFirstName(firstNameRef.current.value);
    setLastName(lastNameRef.current.value);
  };

  return (
    <div>
      <center>
        <h1>Joke Generator</h1>
        <h2>{joke}</h2>
        <form>
          <input
            placeholder="First Name"
            // value={firstName}
            // onChange={(e) => setFirstName(e.target.value)}
            ref={firstNameRef}
          />
          <input
            placeholder="Last Name"
            // value={lastName}
            // onChange={(e) => setLastName(e.target.value)}
            ref={lastNameRef}
          />

          <button onClick={generateJoke}>Generate Joke</button>
        </form>
      </center>
    </div>
  );
}

export default CustomHook;
