
const baseURL = 'http://localhost:4000/customers';
export async function getAll(setCustomers) {
  const params = {
    method: 'GET',
    mode: 'cors' 
  };
  const fetchData = async (url) => {
    try {
      const response = await fetch(url, params);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      alert(error);
    }
  }
  fetchData(baseURL);
}

export async function deleteById(formObjectId, formObject) {
  const params = {
    method: 'DELETE',
    mode: 'cors',
    body: JSON.stringify(formObject)
  };
  const fetchData = async (url) => {
    try {
      const response = await fetch(url, params);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }

    } catch (error) {
      alert(error);
    }
  }
  fetchData(baseURL + '/' + formObjectId);
}

export async function post(formObject, nextId) {
  
  var data = { 
    id: nextId,
    name: formObject.name,
    email: formObject.email,
    password: formObject.password
  };

  fetch(baseURL, {
    method: "POST",
    // data can be `string` or {object}!
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((res) => res.json())
  .catch((error) => console.error("Error:", error))
  .then((response) => console.log("Success:", response));
}

export async function put(formObjectId, formObject) {
  fetch(baseURL + '/' + formObjectId , {
    method: "PUT",
    // data can be `string` or {object}!
    body: JSON.stringify(formObject),
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((res) => res.json())
  .catch((error) => console.error("Error:", error))
  .then((response) => console.log("Success:", response));
}

export function validateEmail(email) {
  var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var result = regex.test(email);
  if(result === true){
    return true;//Proceed further
  }
}