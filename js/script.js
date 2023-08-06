const  addressForm = document.querySelector("#address-form");
const cepInput = document.querySelector("#cep");
const addressInput = document.querySelector("#address");
const cityInput = document.querySelector("#city");
const neighborhoodInput = document.querySelector("#neighborhood");
const regionInput = document.querySelector("#region");
const formInputs = document.querySelector("[data-input]");

const closeButton = document.querySelector("#close-message");

//Validate CEP input
cepInput.addEventListener("keypress", (e) => {
    const onlyNumbers = /[0-9]/;
    const key = String.fromCharCode(e.keyCode);

    // allow only numbers
    if (!onlyNumbers.test(key)) {
        e.preventDefault();
        return;
    }
});

// Get address event
cepInput.addEventListener("keyup", (e) => {

    const inputValue = e.target.value

    // Check if we have the correct length
    if(inputValue.length === 8) {
        getAddress(inputValue);
    }
});

// Get customer address from API 
const getAddress = async (cep) => {
    toggleLoader();

    cepInput.blur();

    const apiUrl = `https://viacep.com.br/ws/${cep}/json/`

    const response = await fetch(apiUrl);

    const data = await response.json();

    // Show error and reset form
if(data.erro === "true") {
    addressForm.reset()
    toggleLoader();
    // Show message
    toggleMessage("CEP inválido, tente novamente.");
    return;
  }
};

// Show or hide loader
const toggleLoader = () => {
    const loaderElement = document.querySelector("#loader");

    fadeElement.classList.toggle("hide");
    loaderElement.classList.toggle("hide");
};

// Show or wide message
const toggleMessage = (msg) => {

    const messageElement = document.querySelector("#message");

    const messageElementText  = document.querySelector("#message p");

    messageElementText.innerText = msg

    fadeElement.classList.toggle("hide");
    messageElement.classList.toggle("hide");
}

// Show or hide message
const toggleMessage = (msg) => {
  const fadeElement = document.querySelector("#fade");
  const messageElement = document.querySelector("#message");

  const messageTextElement = document.querySelector("#message p");

  messageTextElement.innerText = msg;

  fadeElement.classList.toggle("hide");
  messageElement.classList.toggle("hide");
};

// Close message modal
closeButton.addEventListener("click", () => toggleMessage());

// Save address
addressForm.addEventListener("submit", (e) => {
  e.preventDefault();

  toggleLoader();

  setTimeout(() => {
    toggleLoader();

    toggleMessage("Endereço salvo com sucesso!");

    addressForm.reset();

    toggleDisabled();
  }, 1000);
});
