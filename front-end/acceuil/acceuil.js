/*darkmode*/
let darkmode = localStorage.getItem("darkmode");
const themeSwitch = document.getElementById("theme-switch");

const enableDarkmode = () => {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkmode", "active");
};

const disableDarkmmode = () => {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkmode", null);
};

if (darkmode == "active") enableDarkmode();

themeSwitch.addEventListener("click", () => {
  darkmode = localStorage.getItem("darkmode");
  if (darkmode !== "active") {
    enableDarkmode();
  } else {
    disableDarkmmode();
  }
});

/*button hover*/
const lines = document.querySelectorAll(".line");
lines.forEach((line) => {
  line.addEventListener("click", () => {
    lines.forEach((l) => l.classList.remove("active"));
    line.classList.add("active");
  });
});

/*button client*/
// 1. Sélection du texte et de l'icône du nav
const navText = document.querySelector("nav h2");
const navIcon = document.querySelector("nav .section svg");

// 2. Sélection des boutons
const buttons = document.querySelectorAll("ul.icons li.line");

// 3. Ajouter le click sur chaque bouton
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // 4. Récupérer le texte du bouton
    const text = button.querySelector("p").textContent;

    // 5. Changer le texte du nav
    navText.textContent = text;

    // 6. Changer le SVG selon le bouton
    if (text === "Add Client") {
      navIcon.innerHTML = `<path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>`;
    } else if (text === "Client") {
      navIcon.innerHTML = `<path d="M367-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm296.5-343.5Q560-607 560-640t-23.5-56.5Q513-720 480-720t-56.5 23.5Q400-673 400-640t23.5 56.5Q447-560 480-560t56.5-23.5ZM480-640Zm0 400Z"/>`;
    } else if (text === "Chatbot") {
      navIcon.innerHTML = `<path d="M160-360q-50 0-85-35t-35-85q0-50 35-85t85-35v-80q0-33 23.5-56.5T240-760h120q0-50 35-85t85-35q50 0 85 35t35 85h120q33 0 56.5 23.5T800-680v80q50 0 85 35t35 85q0 50-35 85t-85 35v160q0 33-23.5 56.5T720-120H240q-33 0-56.5-23.5T160-200v-160Zm242.5-97.5Q420-475 420-500t-17.5-42.5Q385-560 360-560t-42.5 17.5Q300-525 300-500t17.5 42.5Q335-440 360-440t42.5-17.5Zm240 0Q660-475 660-500t-17.5-42.5Q625-560 600-560t-42.5 17.5Q540-525 540-500t17.5 42.5Q575-440 600-440t42.5-17.5ZM320-280h320v-80H320v80Zm-80 80h480v-480H240v480Zm240-240Z"/>`;
    }
  });
});

/*boutons client et add
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const clientSection =document.getElementById("ClientSection");
const addSection = document.getElementById("sec3");

btn1.classList.add("white");
clientSection.style.display = "flex";
addSection.style.display = "none";

btn1.onclick = () => {
    btn1.classList.add("white");
    btn2.classList.remove("white");

    clientSection.style.display = "flex";
    addSection.style.display = "none";
};

btn2.onclick = () => {
    btn2.classList.add("white");
    btn1.classList.remove("white");

    clientSection.style.display = "none";
    addSection.style.display = "flex";
};*/

/*passage d'une section a une autre*/
document.getElementById("sec1").style.display = "flex";
document.getElementById("sec2").style.display = "none";
document.getElementById("sec3").style.display = "none";
function showSection(id) {
  let parts = document.querySelectorAll(".visibility");
  parts.forEach((p) => {
    p.style.display = "none";
  });
  document.getElementById(id).style.display = "flex";
}

let selectedClientId = null;

async function getData() {
  const res = await fetch("http://127.0.0.1:3001/client");
  const data = await res.json();

  const table = document.getElementById("clientTable");
  table.innerHTML = "";

  data.forEach((c) => {
    const tr = document.createElement("tr");

    ["id", "name", "email", "phone"].forEach((key) => {
      const td = document.createElement("td");
      td.textContent = c[key];
      tr.appendChild(td);
    });

    const td = document.createElement("td");
    const div = document.createElement("div");
    div.className = "actions";

    // DELETE
    const btn = document.createElement("button");
    btn.className = "delete-btn";
    btn.textContent = "Delete";
    btn.addEventListener("click", async () => {
      await fetch(`http://127.0.0.1:3001/client/${c.id}`, {
        method: "DELETE",
      });
      getData();
    });

    // EDIT
    const edit = document.createElement("button");
    edit.className = "edit-btn";
    edit.textContent = "Edit";
    edit.addEventListener("click", () => {
      selectedClientId = c.id;

      document.getElementById("editName").value = c.name;
      document.getElementById("editEmail").value = c.email;
      document.getElementById("editPhone").value = c.phone;

      document.getElementById("modal").classList.add("open");
    });

    div.appendChild(btn);
    div.appendChild(edit);
    td.appendChild(div);
    tr.appendChild(td);
    table.appendChild(tr);
  });
}

getData();

// UPDATE CLIENT
async function updateClient() {
  const name = document.getElementById("editName").value;
  const email = document.getElementById("editEmail").value;
  const phone = document.getElementById("editPhone").value;

  console.log("Updating ID:", selectedClientId);

  const res = await fetch(`http://127.0.0.1:3001/client/${selectedClientId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, phone }),
  });

  const data = await res.json();
  console.log("SERVER RESPONSE:", data);

  document.getElementById("modal").classList.remove("open");
  getData();
}

// ADD CLIENT
async function addClient() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  const res = await fetch("http://127.0.0.1:3001/client", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, phone }),
  });

  if (res.ok) {
    getData();
  }
}

// CLOSE MODAL
document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("modal").classList.remove("open");
});
//Add Client
async function addClient() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  const res = await fetch("http://127.0.0.1:3001/client", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, phone }),
  });
  if (!res.ok) {
    console.log("error creating user");
    return;
  }
}

// Chatbot
const chatInput = document.querySelector(".chat input");
const sendBtn = document.querySelector(".send-btn");
const messagesBox = document.getElementById("messages-box");

sendBtn.addEventListener("click", async () => {
  const message = chatInput.value.trim();
  if (!message) return;

  // Show user message
  const userMsg = document.createElement("div");
  userMsg.className = "user-msg";
  userMsg.textContent = message;
  messagesBox.appendChild(userMsg);

  chatInput.value = "";
  messagesBox.scrollTop = messagesBox.scrollHeight;

  // Send to backend
  const res = await fetch("http://127.0.0.1:3001/chatbot/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: message }),
  });

  const data = await res.json();

  // Show bot response
  const botMsg = document.createElement("div");
  botMsg.className = "bot-msg";
  botMsg.textContent = data.response;
  messagesBox.appendChild(botMsg);
  messagesBox.scrollTop = messagesBox.scrollHeight;
});

chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendBtn.click();
});
