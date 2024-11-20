// Show/hide checkbox functionality
const checkBox = document.querySelector("#toggleCheckbox");
const returnInputBox = document.querySelector(".toggle-input");

checkBox.addEventListener("change", (e) => {
  let isChecked = e.target.checked;
  if (isChecked) {
    returnInputBox.classList.add("show");
  } else {
    returnInputBox.classList.remove("show");
  }
});

// Getting data from the user
const userForm = document.querySelector("#userData");
const submitBtn = document.querySelector("#sbtn");

userForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Disable the submit button and show loading state
  submitBtn.disabled = true;
  submitBtn.innerText = "Loading...";

  // Use querySelector to access inputs by their name attributes
  const elements = e.target; // or e.currentTarget
  const userData = {
    _type: "userType",
    name: elements.querySelector('[name="name"]').value,
    phone: elements.querySelector('[name="phone"]').value,
    from: elements.querySelector('[name="from"]').value,
    to: elements.querySelector('[name="to"]').value,
    email: elements.querySelector('[name="email"]').value,
    age: Number(elements.querySelector('[name="age"]').value),
    berthPref: elements.querySelector('[name="berthPref"]').value,
    meal: elements.querySelector('[name="meal"]').value === "true",
    class: elements.querySelector('[name="class"]').value,
    travelDate: elements.querySelector('[name="travelDate"]').value,
    return: checkBox.checked,
    returnDate: checkBox.checked
      ? elements.querySelector('[name="returnDate"]').value
      : "2021-02-29",
  };

  try {
    const res = await fetch(
      `https://${projectId}.api.sanity.io/v2023-10-24/data/mutate/${dataSet}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          mutations: [{ create: userData }],
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      console.log(data);
      alert("Submission successful!");
      // Reset the form after successful submission
      userForm.reset();
      returnInputBox.classList.remove("show"); // Hide return date input if it was visible
    } else {
      alert(JSON.stringify(data));
    }
  } catch (err) {
    console.log(err);
    alert("An error occurred. Please try again.");
  } finally {
    // Re-enable the submit button and reset the text
    submitBtn.disabled = false;
    submitBtn.innerText = "Submit";
  }
});
