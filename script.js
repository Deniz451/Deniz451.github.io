document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
    console.log("submit");
    const password = document.getElementById("password").value;
    const passwordInput = document.getElementById("password");

    if (password === "admin") {
        window.location.href = "../desktop/index.html";
    } else {
        document.getElementById("password").placeholder = "Wrong password";
    }

    passwordInput.value = "";
});

const viewIcon = document.getElementById("view");
const hideIcon = document.getElementById("hide");
const passwordInput = document.getElementById("password");

function togglePasswordVisibility() {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        viewIcon.style.display = "none";
        hideIcon.style.display = "block";
    } else {
        passwordInput.type = "password";
        hideIcon.style.display = "none";
        viewIcon.style.display = "block";
    }
}

viewIcon.addEventListener("click", togglePasswordVisibility);

hideIcon.addEventListener("click", togglePasswordVisibility);

