import { useState, useEffect } from "react";

// function useRandomJoke() {
function useRandomJoke(firstName, lastName) {
  const [joke, setJoke] = useState("");

  useEffect(() => {
    const fetchJoke = async () =>
      await fetch(
        // "https://api.icndb.com/jokes/random?firstName=Valyn&lastName=Silva"
        `https://api.icndb.com/jokes/random?firstName=${firstName}&lastName=${lastName}`
      )
        .then((res) => res.json()) // pass response as json object
        .then((data) => {
          // get data
          //   console.log(data.value.joke);
          // save in setJoke state
          setJoke(data.value.joke);
        });
    fetchJoke();
  }, [firstName, lastName]);
  return joke;
}

export default useRandomJoke;
