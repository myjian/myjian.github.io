// Avoid I,l,1 and O,0 for better readability
const charsets = {
  alphanum: "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789",
  symbols:
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*()_+~`|}{[]:;?><,./-=",
};

document.getElementById("generateBtn").addEventListener("click", () => {
  const count = document.getElementById("count").value;
  const length = document.getElementById("length").value;
  const type = document.querySelector('input[name="charset"]:checked').value;
  const characters = charsets[type];

  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = ""; // Clear previous

  const passwords = [];
  for (let i = 0; i < count; i++) {
    const password = generateSecurePassword(length, characters);
    passwords.push(password);
  }
  resultsContainer.value = passwords.join("\n");
});

function generateSecurePassword(len, charset) {
  let password = "";
  const array = new Uint32Array(len);
  // This is the cryptographically secure entropy source
  window.crypto.getRandomValues(array);

  for (let i = 0; i < len; i++) {
    password += charset[array[i] % charset.length];
  }
  return password;
}
