const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
  document.getElementById('l_user').value = "";
  document.getElementById('l_pass').value = "";
  document.getElementById('w1').classList.remove("translate-left")
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
  document.getElementById('w1').classList.add("translate-left")
  document.getElementById('c_user').value = "";
  document.getElementById('c_pass').value = "";
  document.getElementById('c_passc').value = "";
  document.getElementById('c_email').value = "";
});
