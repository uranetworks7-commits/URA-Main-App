// js/ban.js
export function initBanCheck() {
  const username = localStorage.getItem("username");

  // Do nothing if user is not logged in
  if (!username || username.trim() === "") return;

  // Never show toast on log.html
  const currentPage = window.location.pathname.split("/").pop().toLowerCase();
  if (currentPage === "log.html") return;

  // Import Firebase
  import("https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js").then(({ initializeApp }) => {
    import("https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js").then(({ getDatabase, ref, onValue }) => {

      const firebaseConfig = {
        apiKey: "AIzaSyA9BC2mHNGY5cMaUvVrNp6e0mvXmmEuXfA",
        authDomain: "ura-backup-new1.firebaseapp.com",
        databaseURL: "https://ura-backup-new1-default-rtdb.firebaseio.com",
        projectId: "ura-backup-new1",
        storageBucket: "ura-backup-new1.firebasestorage.app",
        messagingSenderId: "699722460315",
        appId: "1:699722460315:web:f5da0f3ca3a36134d2ea3e"
      };

      const app = initializeApp(firebaseConfig);
      const db = getDatabase(app);

      const statusRef = ref(db, `users/${username}/status`);

      onValue(statusRef, snapshot => {
        const status = snapshot.val()?.toString();

        // Only banned statuses: 3,4,5
        const bannedStatuses = ["3","4","5"];
        if (bannedStatuses.includes(status)) {

          // Create toast if it doesn't exist
          let toast = document.getElementById("banToast");
          if (!toast) {
            toast = document.createElement("div");
            toast.id = "banToast";
            toast.textContent = "⚠️ Account Ban";
            toast.style = `
              position: fixed;
              bottom: 30px;
              left: 50%;
              transform: translateX(-50%);
              background: #e74c3c;
              color: white;
              padding: 14px 28px;
              border-radius: 10px;
              font-size: 16px;
              font-weight: 500;
              opacity: 0;
              transition: opacity 0.5s ease-in-out;
              z-index: 999999;
            `;
            document.body.appendChild(toast);
          }

          // Show toast for 3 seconds
          toast.style.opacity = 1;
          setTimeout(() => { toast.style.opacity = 0; }, 3000);

          // Redirect to log.html after toast
          setTimeout(() => {
            window.location.href = "log.html";
          }, 3000);
        }
      });
    });
  });
}