/* ================================
   ZANTRAYPHOTOGRAPHIE
   ================================ */


/* MENU */

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});


/* ================================
   GALERIE
   ================================ */

const gallery = document.getElementById("gallery");

document.querySelectorAll(".filter").forEach(button => {

  button.addEventListener("click", () => {

    document.querySelectorAll(".filter")
      .forEach(b => b.classList.remove("active"));

    button.classList.add("active");

    const category = button.dataset.filter;

    document.querySelectorAll(".photo-card")
      .forEach(photo => {

        if (
          category === "all" ||
          photo.dataset.category === category
        ) {
          photo.style.display = "block";
        } else {
          photo.style.display = "none";
        }

      });

  });

});


/* ================================
   LIGHTBOX
   ================================ */

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");

let currentPhoto = 0;

function getPhotos() {
  return Array.from(
    document.querySelectorAll(".photo-card")
  ).filter(photo => photo.style.display !== "none");
}

function openLightbox(index) {

  const photos = getPhotos();

  if (!photos[index]) return;

  currentPhoto = index;

  lightboxImage.src =
    photos[index].querySelector("img").src;

  lightboxImage.alt =
    photos[index].querySelector("img").alt;

  lightbox.classList.add("open");

  document.body.style.overflow = "hidden";
}

function closeLightbox() {

  lightbox.classList.remove("open");

  document.body.style.overflow = "";
}

function nextPhoto() {

  const photos = getPhotos();

  currentPhoto++;

  if (currentPhoto >= photos.length) {
    currentPhoto = 0;
  }

  openLightbox(currentPhoto);
}

function previousPhoto() {

  const photos = getPhotos();

  currentPhoto--;

  if (currentPhoto < 0) {
    currentPhoto = photos.length - 1;
  }

  openLightbox(currentPhoto);
}

function activatePhotoEvents() {

  document.querySelectorAll(".photo-card")
    .forEach(photo => {

      if (photo.dataset.listener) return;

      photo.dataset.listener = "true";

      photo.addEventListener("click", () => {

        const photos = getPhotos();

        const index = photos.indexOf(photo);

        openLightbox(index);

      });

    });

}

activatePhotoEvents();

document.getElementById("lightboxClose")
  .addEventListener("click", closeLightbox);

document.getElementById("lightboxNext")
  .addEventListener("click", nextPhoto);

document.getElementById("lightboxPrev")
  .addEventListener("click", previousPhoto);

document.addEventListener("keydown", event => {

  if (!lightbox.classList.contains("open")) return;

  if (event.key === "Escape") {
    closeLightbox();
  }

  if (event.key === "ArrowRight") {
    nextPhoto();
  }

  if (event.key === "ArrowLeft") {
    previousPhoto();
  }

});


/* ================================
   DISCUSSION
   ================================ */

const discussionForm =
  document.getElementById("discussionForm");

discussionForm.addEventListener("submit", event => {

  event.preventDefault();

  const name =
    document.getElementById("discussionName").value;

  const email =
    document.getElementById("discussionEmail").value;

  const message =
    document.getElementById("discussionMessage").value;

  const subject =
    encodeURIComponent(
      `Message ZantrayPhotographie — ${name}`
    );

  const body =
    encodeURIComponent(
      `Nom : ${name}\n` +
      `Email : ${email}\n\n` +
      `Message :\n${message}`
    );

  window.location.href =
    `mailto:marcelinjohnmakenley@gmail.com?subject=${subject}&body=${body}`;

  document.getElementById("discussionStatus")
    .textContent =
    "Votre messagerie va s'ouvrir pour envoyer le message.";

});


/* ================================
   ADMINISTRATION
   ================================ */

/*
   IMPORTANT :

   Cette version constitue l'interface de démonstration.
   Pour une vraie sécurité, il faut connecter Supabase Auth.

   Ne mets jamais un vrai mot de passe administrateur
   directement dans ce fichier JavaScript.
*/


let adminConnected = false;


/* Connexion de démonstration */

document
  .getElementById("loginButton")
  .addEventListener("click", () => {

    /*
      Pour la démonstration uniquement.

      Les vrais identifiants devront être vérifiés
      par Supabase Auth.
    */

    const email =
      document.getElementById("adminEmail").value;

    const password =
      document.getElementById("adminPassword").value;

    if (!email || !password) {

      document.getElementById("loginStatus")
        .textContent =
        "Veuillez remplir les deux champs.";

      return;
    }

    adminConnected = true;

    document.getElementById("loginBox")
      .style.display = "none";

    document.getElementById("adminPanel")
      .style.display = "block";

  });


/* LOGOUT */

document
  .getElementById("logoutButton")
  .addEventListener("click", () => {

    adminConnected = false;

    document.getElementById("adminPanel")
      .style.display = "none";

    document.getElementById("loginBox")
      .style.display = "flex";

  });


/* ADMIN TABS */

document.querySelectorAll(".admin-tab")
  .forEach(button => {

    button.addEventListener("click", () => {

      document.querySelectorAll(".admin-tab")
        .forEach(btn =>
          btn.classList.remove("active")
        );

      document.querySelectorAll(".admin-tab-content")
        .forEach(tab =>
          tab.classList.remove("active")
        );

      button.classList.add("active");

      document
        .getElementById(button.dataset.tab)
        .classList.add("active");

    });

  });


/* ================================
   PROFIL
   ================================ */

document
  .getElementById("profileUpload")
  .addEventListener("change", event => {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function() {

      document.getElementById("profileImage")
        .src = reader.result;

      localStorage.setItem(
        "zantrayProfileImage",
        reader.result
      );

    };

    reader.readAsDataURL(file);

  });


document
  .getElementById("saveProfile")
  .addEventListener("click", () => {

    const name =
      document.getElementById("editName").value;

    const bio =
      document.getElementById("editBio").value;

    localStorage.setItem(
      "zantrayName",
      name
    );

    localStorage.setItem(
      "zantrayBio",
      bio
    );

    alert(
      "Profil enregistré sur cet appareil."
    );

  });


/* RESTAURATION PROFIL */

const savedProfileImage =
  localStorage.getItem("zantrayProfileImage");

if (savedProfileImage) {

  document.getElementById("profileImage")
    .src = savedProfileImage;

}


/* ================================
   AJOUT PHOTO
   ================================ */

document
  .getElementById("addPhoto")
  .addEventListener("click", () => {

    const file =
      document.getElementById("photoUpload")
        .files[0];

    const category =
      document.getElementById("photoCategory")
        .value;

    const title =
      document.getElementById("photoTitle")
        .value || "Nouvelle photo";

    if (!file) {

      alert("Choisissez une photo.");

      return;
    }

    const reader = new FileReader();

    reader.onload = function() {

      const photo = document.createElement("article");

      photo.className = "photo-card";

      photo.dataset.category = category;

      photo.innerHTML = `

        <img
          src="${reader.result}"
          alt="${title}"
        >

        <div class="photo-info">

          <small>
            ${category.toUpperCase()}
          </small>

          <h3>
            ${title}
          </h3>

        </div>

      `;

      gallery.appendChild(photo);

      activatePhotoEvents();

      addAdminPhoto(
        reader.result,
        title
      );

      document
        .getElementById("photoUpload")
        .value = "";

      document
        .getElementById("photoTitle")
        .value = "";

    };

    reader.readAsDataURL(file);

  });


/* ADMIN GALLERY */

function addAdminPhoto(src, title) {

  const container =
    document.getElementById("adminGallery");

  const item =
    document.createElement("div");

  item.className = "admin-photo";

  item.innerHTML = `

    <img
      src="${src}"
      alt="${title}"
    >

    <button
      class="delete-photo"
    >
      ×
    </button>

  `;

  item
    .querySelector(".delete-photo")
    .addEventListener("click", () => {

      item.remove();

    });

  container.appendChild(item);

}


/* ================================
   RESEAUX SOCIAUX
   ================================ */

document
  .getElementById("saveSocials")
  .addEventListener("click", () => {

    const socials = {

      facebook:
        document.getElementById("facebookUrl").value,

      instagram:
        document.getElementById("instagramUrl").value,

      tiktok:
        document.getElementById("tiktokUrl").value,

      x:
        document.getElementById("xUrl").value

    };

    localStorage.setItem(
      "zantraySocials",
      JSON.stringify(socials)
    );

    updateSocialLinks();

    alert(
      "Réseaux sociaux enregistrés."
    );

  });


function updateSocialLinks() {

  const data =
    localStorage.getItem("zantraySocials");

  if (!data) return;

  const socials = JSON.parse(data);

  const links =
    document.querySelectorAll(".social-link");

  const urls = [
    socials.facebook,
    socials.instagram,
    socials.tiktok,
    socials.x
  ];

  links.forEach((link, index) => {

    if (urls[index]) {

      link.href = urls[index];

      link.target = "_blank";

      link.querySelector("strong")
        .textContent = urls[index];

    }

  });

}

updateSocialLinks();
