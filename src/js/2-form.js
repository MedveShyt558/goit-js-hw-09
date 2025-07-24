const form = document.querySelector(".user-form");
const STORAGE_KEY = "feedback-form-state";

let formData = {
  email: "",
  message: ""
};

populateForm();

form.addEventListener("input", onInput);
form.addEventListener("submit", onSubmit);

function onInput(evt) {
  formData[evt.target.name] = evt.target.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onSubmit(evt) {
  evt.preventDefault();

  if (!formData.email || !formData.message) {
    alert("Fill please all fields");
    return;
  }

  console.log(formData);
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: "", message: "" };
  form.reset();
}

function populateForm() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);
      formData = parsedData;

      const emailField = form.querySelector('[name="email"]');
      const messageField = form.querySelector('[name="message"]');

      if (emailField) emailField.value = parsedData.email || "";
      if (messageField) messageField.value = parsedData.message || "";
    } catch (error) {
      console.error("Error parsing saved form data:", error);
    }
  }
}
