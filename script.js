const listings = [
  {
    id: 1,
    title: "Discrete Mathematics Textbook",
    price: 420,
    category: "Textbooks",
    condition: "Like new",
    seller: "Sabbir@vu.edu.bd",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80",
    description: "Clean copy for CSE theory courses."
  },
  {
    id: 2,
    title: "Casio CW Scientific Calculator",
    price: 850,
    category: "Electronics",
    condition: "Good",
    seller: "Tasnim@vu.edu.bd",
    image: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&w=700&q=80",
    description: "Works perfectly for engineering math."
  },
  {
    id: 3,
    title: "Lab Coat and Safety Glasses",
    price: 550,
    category: "Lab Equipment",
    condition: "Good",
    seller: "Redwan@vu.edu.bd",
    image: "https://images.unsplash.com/photo-1593854519602-687eae339d57?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Useful for lab classes and project work."
  },
  {
    id: 4,
    title: "Notebook Bundle",
    price: 180,
    category: "Stationery",
    condition: "Like new",
    seller: "Mou@vu.edu.bd",
    image: "https://images.unsplash.com/photo-1517971129774-8a2b38fa128e?auto=format&fit=crop&w=700&q=80",
    description: "Unused notebooks for class notes."
  },
  {
    id: 5,
    title: "USB Keyboard",
    price: 650,
    category: "Electronics",
    condition: "Fair",
    seller: "Ansary@vu.edu.bd",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=700&q=80",
    description: "Comfortable keyboard."
  },
  {
    id: 6,
    title: "Project Presentation File",
    price: 120,
    category: "Others",
    condition: "Good",
    seller: "Nur@vu.edu.bd",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=700&q=80",
    description: "Folder and documents."
  }
];

const listingGrid = document.querySelector("#listingGrid");
const searchInput = document.querySelector("#searchInput");
const categoryFilter = document.querySelector("#categoryFilter");
const totalListings = document.querySelector("#totalListings");

function isUniversityEmail(email) {
  const value = email.toLowerCase();
  return value.endsWith(".edu") || value.endsWith(".edu.bd") || value.endsWith("@vu.edu.bd");
}

function renderListings() {
  const keyword = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;

  const filtered = listings.filter((item) => {
    const text = `${item.title} ${item.description} ${item.category}`.toLowerCase();
    return text.includes(keyword) && (category === "all" || item.category === category);
  });

  listingGrid.innerHTML = filtered.map((item) => `
    <article class="card">
      <img src="${item.image}" alt="${item.title}">
      <div class="card-body">
        <div class="card-top">
          <h3>${item.title}</h3>
          <span class="price">BDT ${item.price}</span>
        </div>

        <div class="tags">
          <span class="tag">${item.category}</span>
          <span class="tag">${item.condition}</span>
        </div>

        <p class="muted">${item.description}</p>
        <p class="muted">Seller: ${item.seller}</p>
        <button class="btn wide-btn contact-btn" data-id="${item.id}">Contact Seller</button>
      </div>
    </article>
  `).join("");

  totalListings.textContent = listings.length;
}

searchInput.addEventListener("input", renderListings);
categoryFilter.addEventListener("change", renderListings);

listingGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".contact-btn");
  if (!button) return;

  const item = listings.find((listing) => listing.id === Number(button.dataset.id));

  document.querySelector("#contactItem").textContent = `${item.title} · Seller: ${item.seller}`;
  document.querySelector("#messageStatus").textContent = "";
  document.querySelector("#contactModal").showModal();
});

document.querySelector("#listingForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.querySelector("#sellerEmail").value.trim();
  const status = document.querySelector("#formStatus");

  if (!isUniversityEmail(email)) {
    status.textContent = "Please use a university email address.";
    return;
  }

  listings.unshift({
    id: Date.now(),
    title: document.querySelector("#itemTitle").value.trim(),
    price: Number(document.querySelector("#itemPrice").value),
    category: document.querySelector("#itemCategory").value,
    condition: document.querySelector("#itemCondition").value,
    seller: email,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=700&q=80",
    description: document.querySelector("#itemDescription").value.trim()
  });

  event.target.reset();
  status.textContent = "Listing published successfully.";
  renderListings();
});

document.querySelector("#loginOpen").addEventListener("click", () => {
  document.querySelector("#loginStatus").textContent = "";
  document.querySelector("#loginModal").showModal();
});

document.querySelector("#loginBtn").addEventListener("click", () => {
  const email = document.querySelector("#loginEmail").value.trim();

  document.querySelector("#loginStatus").textContent = isUniversityEmail(email)
    ? "Login verified. Welcome to Student Marketplace."
    : "Use a valid university email address.";
});

document.querySelector("#sendMessage").addEventListener("click", () => {
  const message = document.querySelector("#messageBody").value.trim();

  document.querySelector("#messageStatus").textContent = message
    ? "Message sent safely through the marketplace."
    : "Please write a message first.";
});

document.querySelector("#adminOpen").addEventListener("click", () => {
  totalListings.textContent = listings.length;
  document.querySelector("#adminModal").showModal();
});

renderListings();