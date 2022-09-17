// Alert placeholder elements
const alertPlaceholder = document.getElementById("alert-placeholder");

// Create bootstrap alert element
const alert = (msg, type) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = `
    <div class="alert alert-${type} alert-dismissible mt-3" role="alert">
    <div>${msg}</div>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `;
  alertPlaceholder.append(wrapper);
  document.querySelector("header").scrollIntoView({ behavior: "smooth" });
};
