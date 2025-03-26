document.addEventListener("DOMContentLoaded", () => {
    // Toggle subcontent table visibility when clicking the chapter row
    document.querySelectorAll(".chapter-row").forEach((row) => {
      row.addEventListener("click", (e) => {
        // Prevent toggling when clicking on "Mark as Viewed"
        if (e.target.classList.contains("resource-status")) return;

        const chapter = row.closest(".chapter");
        const subcontentTable = chapter.querySelector(".subcontent-table");
        const arrow = row.querySelector(".arrow");

        // Toggle visibility
        if (subcontentTable.style.display === "block") {
          subcontentTable.style.display = "none";
          arrow.classList.remove("rotated");
        } else {
          subcontentTable.style.display = "block";
          arrow.classList.add("rotated");
        }
      });
    });

    // Handle "Mark as Viewed" toggle and progress update
    document.querySelectorAll(".resource-status").forEach((button) => {
      button.addEventListener("click", () => {
        const chapter = button.closest(".chapter");
        const doneCountElement = chapter.querySelector(".done-count");
        const percentCompleteElement =
          chapter.querySelector(".percent-complete");
        const totalItems =
          chapter.querySelectorAll(".resource-status").length;
        let doneItems = parseInt(
          doneCountElement.textContent.split("/")[0]
        );

        // Toggle status
        if (button.dataset.status === "unlock") {
          button.dataset.status = "viewed";
          button.textContent = "Viewed";
          button.classList.remove("status-unlock");
          button.classList.add("status-viewed");
          doneItems++;
        } else {
          button.dataset.status = "unlock";
          button.textContent = "Mark as Viewed";
          button.classList.remove("status-viewed");
          button.classList.add("status-unlock");
          doneItems--;
        }

        // Update progress
        doneCountElement.textContent = `${doneItems}/${totalItems} Done`;
        const percent = Math.round((doneItems / totalItems) * 100);
        percentCompleteElement.textContent = `${percent}% Completed`;
      });
    });
    // Filter functionality
    const filterButtons = document.querySelectorAll(".filter-btn");
    const chapters = document.querySelectorAll(".chapter");

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        // Remove active class from all buttons and add to clicked one
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        // Show/hide chapters based on filter
        chapters.forEach((chapter) => {
          if (filter === "all") {
            chapter.classList.add("visible");
          } else if (chapter.dataset.paper === filter) {
            chapter.classList.add("visible");
          } else {
            chapter.classList.remove("visible");
          }
        });

        // Scroll to the section
        if (filter !== "all") {
          const section = document.getElementById(filter);
          if (section) {
            section.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    });
    // Initially show all chapters
    chapters.forEach((chapter) => chapter.classList.add("visible"));
  });