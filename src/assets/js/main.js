window.onload = () => {
  buttonOnTop.init();
  arrangeEvents.init();
  storageCollpase.init();
};

const buttonOnTop = {
  init: function () {
    this.config();
  },
  config: function () {
    const btn = document.querySelector(".ButtonOnTop");

    btn.addEventListener("click", () => {
      $("html, body").animate(
        {
          scrollTop: 0,
        },
        500
      );
    });

    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  },
};

const arrangeEvents = {
  init: function () {
    this.config();
  },
  config: function () {
    const wrappers = document.querySelectorAll(".js-arrange");

    wrappers.forEach((wrapper) => {
      const items = wrapper.querySelectorAll(":scope > .js-arrange-item");

      items.forEach((item) => {
        const upBtn = item.querySelector(".js-arrange-up");
        const downBtn = item.querySelector(".js-arrange-down");
        const removeBtn = item.querySelector(".js-arrange-remove");

        upBtn?.addEventListener("click", () => {
          const upParent = $(item).prev();

          if (upParent.length > 0) {
            const sel = $(item).detach();
            sel.insertBefore(upParent);
          }
        });

        downBtn?.addEventListener("click", () => {
          const downParent = $(item).next();

          if (downParent.length > 0) {
            const sel = $(item).detach();
            sel.insertAfter(downParent);
          }
        });

        removeBtn?.addEventListener("click", () => {
          $(item).remove();
        });
      });
    });
  },
};

const storageCollpase = {
  init: function () {
    this.config();
  },
  config: function () {
    const key = "collapses";
    const collapses = Array.from(
      document.querySelectorAll(".Accordion .collapse")
    );

    const initialCollapseStorage = collapses.map(
      (collapse) => `#${collapse.id}`
    );

    const isEmpty = Boolean(
      !localStorage.getItem(key) ||
        (localStorage.getItem(key) &&
          JSON.parse(localStorage.getItem(key) || "[]").length === 0)
    );

    const storageBefore = !isEmpty
      ? JSON.parse(localStorage.getItem(key) || "[]")
      : initialCollapseStorage;

    if (isEmpty) {
      localStorage.setItem(key, JSON.stringify(initialCollapseStorage));
    }

    collapses.forEach((collapse) => {
      const btnCollapse = document.querySelector(
        `[data-toggle="collapse"][data-target="#${collapse.id}"]`
      );
      console.log(`#${collapse.id}`, collapse, btnCollapse)
      if (storageBefore.includes(`#${collapse.id}`)) {
        btnCollapse.classList.add("active");
        collapse.classList.add("show");
      } else {
        btnCollapse.classList.remove("active");
        collapse.classList.remove("show");
      }
    });

    const triggerCollapsesBtn = document.querySelectorAll(
      '[data-toggle="collapse"]'
    );

    triggerCollapsesBtn.forEach((btn) =>
      btn.addEventListener("click", () => {
        const storage = JSON.parse(localStorage.getItem(key) || "[]");

        const targetId = btn.dataset.target;
        const isCollapsed = !document
          .querySelector(targetId)
          .className.includes("show");

        if (isCollapsed) {
          btn.classList.add('active')
          const newStorage = [...storage, targetId];
          localStorage.setItem(key, JSON.stringify(newStorage));
        } else {
          btn.classList.remove('active')
          const newStorage = storage.filter((item) => item !== targetId);
          localStorage.setItem(key, JSON.stringify(newStorage));
        }
      })
    );
  },
};
