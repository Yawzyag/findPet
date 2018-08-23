//validate city
export function isValidCity(city) {
  return /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/.test(
    city
  );
}

//display alert message
export function showAlert(message, className) {
  //create div
  const div = document.createElement("div");
  //add class
  div.className = `alert alert-${className}`;
  //add text
  div.appendChild(document.createTextNode(message));
  //get container
  const container = document.querySelector(".container");
  //get form
  const form = document.querySelector("#pet-form");
  //insert alert
  container.insertBefore(div, form);

  setTimeout(() => document.querySelector(".alert").remove(), 3000);
}
