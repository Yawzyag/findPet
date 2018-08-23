import fetchJsonp from "fetch-jsonp";
import { isValidCity, showAlert } from "./validate";

const petForm = document.querySelector("#pet-form");

petForm.addEventListener("submit", fetchAnimals);

//fetch animals from api
function fetchAnimals(e) {
  e.preventDefault();

  //Get user input
  const animal = document.querySelector("#animal").value;
  const city = document.querySelector("#city").value;

  //validate city
  if (!isValidCity(city)) {
    showAlert("Please Enter a Valid City", "danger");
    return;
  }

  //Fetch animals
  fetchJsonp(
    `http://api.petfinder.com/pet.find?format=json&key=c235f6fb5f50626d8b358767dab50e9c&animal=${animal}&location=${city}&callback=callback`,
    {
      jsonpCallbackFunction: "callback"
    }
  )
    .then(res => res.json())
    .then(data => showAnimals(data.petfinder.pets.pet))
    .catch(err => console.log(err));
}

//show pets
function showAnimals(pets) {
  //   console.log(pets[0].name.$t);
  const results = document.querySelector("#results");
  //clear first
  results.innerHTML = "";
  //loop true pets
  pets.forEach(pet => {
    // console.log(pet);
    const div = document.createElement("div");
    div.classList.add("card", "card-body", "mb-3");
    div.innerHTML = `
        <div class="row">
            <div class="col-sm-6">
                <h4>${pet.name.$t} (${pet.age.$t})</h4>
                <p class="text-secondary">${pet.breeds.breed.$t}</p>
                <p>
                ${
                  pet.contact.address1.$t
                    ? `
                    ${pet.contact.address1.$t}`
                    : ``
                }

                ${
                  pet.contact.city.$t
                    ? `
                    ${pet.contact.city.$t}`
                    : ``
                }    

                ${
                  pet.contact.state.$t
                    ? `
                    ${pet.contact.state.$t}`
                    : ``
                } 

                ${
                  pet.contact.zip.$t
                    ? `
                    ${pet.contact.zip.$t}`
                    : ``
                }   


                <ul class="list-group">
                    ${
                      pet.contact.phone.$t
                        ? `
                    <li class="list-group-item">Phone: 
                    ${pet.contact.phone.$t}</li>`
                        : ``
                    }
                   
                    ${
                      pet.contact.email.$t
                        ? `
                    <li class="list-group-item">Email: 
                    ${pet.contact.email.$t}</li>`
                        : ``
                    }

                    ${
                      pet.shelterId.$t
                        ? `
                      <li class="list-group-item">Shelter ID: 
                      ${pet.shelterId.$t}</li>`
                        : ``
                    }
                </ul>
            </div>  
            <div class="col-sm-6 text-center">
                <img id="pet-img" class="img-fluid img-thumbnail rounded mt-2" src="${
                  pet.media.photos.photo[3].$t
                }">
            </div>
        </div>
    `;

    results.appendChild(div);
  });
}
