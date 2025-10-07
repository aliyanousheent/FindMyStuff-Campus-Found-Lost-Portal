function showSection(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

const form = document.getElementById("itemForm");
form.addEventListener("submit", e => {
  e.preventDefault();

  const type = document.getElementById("itemType").value;
  const name = document.getElementById("itemName").value;
  const desc = document.getElementById("itemDesc").value;
  const loc = document.getElementById("itemLoc").value;
  const contact = document.getElementById("itemContact").value;

  const item = document.createElement("div");
  item.classList.add("item");
  item.innerHTML = `
    <h3>${name}</h3>
    <p><strong>Description:</strong> ${desc}</p>
    <p><strong>Location:</strong> ${loc}</p>
    <p><strong>Contact:</strong> ${contact}</p>
  `;

  document.getElementById(type + "Items").appendChild(item);
  form.reset();
  showSection(type);
});

