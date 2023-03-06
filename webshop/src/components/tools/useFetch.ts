import { ref } from "vue"

export function useFetch(url: URL) {
  const data = ref("")
  const error = ref("")

  // let body = '{"identifiant":"admin","password":"adminkawa"}';

  // fetch(url, {method: 'POST', body: JSON.parse(body)})
  //   .then((response) => response.json())
  //   .then((json) => (data.value = json))
  //   .catch((err) => (error.value = err))

  //   return { data, error }


  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "identifiant": "admin",
    "password": "adminkawa"
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw
  };

  fetch("http://51.38.237.216:3000/login", requestOptions)
    .then(response => response.json())
    .then(result => data.value = result)
    .catch(error => error.value = error);

  return { data, error }
}