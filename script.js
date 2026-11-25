/* =========================================================
   Chibundu Onyesoh — shared script (all pages)
   Vanilla JS only.
   ========================================================= */

/* ---- Site configuration (edit these two values to connect the contact form) ----
   formEndpoint : a form-handling URL (e.g. a Formspree endpoint). Leave "" if unused.
   contactEmail : fallback address; the visitor's mail app opens with the message filled in. */
var SITE_CONFIG = {
  formEndpoint: "",
  contactEmail: ""
};

(function () {
  "use strict";

  /* ---------- helpers ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  var toastEl = null, toastTimer = null;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast";
      toastEl.setAttribute("role", "status");
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 2600);
  }

  /* ---------- 1. active navigation state ---------- */
  function initActiveNav() {
    var file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    if (file === "") file = "index.html";
    $all(".hdr nav a").forEach(function (a) {
      var href = (a.getAttribute("href") || "").toLowerCase();
      var on = href === file;
      a.classList.toggle("active", on);
      if (on) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }

  /* ---------- 2. mobile menu ---------- */
  function initMobileMenu() {
    var btn = $(".menu-toggle");
    var nav = $(".hdr nav");
    if (!btn || !nav) return;
    function setOpen(open) {
      nav.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
    btn.addEventListener("click", function () { setOpen(!nav.classList.contains("open")); });
    $all("a", nav).forEach(function (a) { a.addEventListener("click", function () { setOpen(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
    window.addEventListener("resize", function () { if (window.innerWidth > 980) setOpen(false); });
  }

  /* ---------- 3. research: filtering, read more, citation copy ---------- */
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.cssText = "position:fixed;left:-9999px;top:0;";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy") ? resolve() : reject(); }
      catch (err) { reject(err); }
      document.body.removeChild(ta);
    });
  }

  function initResearch() {
    var list = $("#pub-list");
    if (!list) return;
    var pubs = $all(".pub", list);
    var chips = $all("[data-filter]");
    var empty = $("#pub-empty");
    var count = $("#pub-count");

    function apply(filter) {
      var shown = 0;
      pubs.forEach(function (p) {
        var match = filter === "all" ||
          p.getAttribute("data-year") === filter ||
          (p.getAttribute("data-themes") || "").split(" ").indexOf(filter) !== -1;
        p.hidden = !match;
        if (match) shown++;
      });
      chips.forEach(function (c) {
        var on = c.getAttribute("data-filter") === filter;
        c.classList.toggle("active", on);
        c.setAttribute("aria-pressed", on ? "true" : "false");
      });
      if (empty) empty.style.display = shown ? "none" : "block";
      if (count) count.textContent = shown + (shown === 1 ? " publication" : " publications");
    }

    chips.forEach(function (c) {
      c.addEventListener("click", function () {
        apply(c.getAttribute("data-filter"));
        if (c.closest(".rs-side")) { list.scrollIntoView({ behavior: "smooth", block: "start" }); }
      });
    });

    pubs.forEach(function (p) {
      var more = $(".js-more", p);
      var copy = $(".js-copy", p);
      if (more) {
        more.addEventListener("click", function () {
          var open = p.classList.toggle("open");
          more.setAttribute("aria-expanded", open ? "true" : "false");
          more.firstChild.textContent = open ? "Show Less " : "Read More ";
        });
      }
      if (copy) {
        copy.addEventListener("click", function () {
          copyText(p.getAttribute("data-citation") || "").then(function () {
            toast("Citation copied to clipboard");
          }, function () {
            toast("Couldn't copy — please select the text manually");
          });
        });
      }
    });

    function fromHash() {
      var hash = (location.hash || "").replace("#", "");
      var valid = chips.some(function (c) { return c.getAttribute("data-filter") === hash; });
      apply(valid ? hash : "all");
    }
    window.addEventListener("hashchange", fromHash);
    fromHash();
  }

  /* ---------- 4. podcast: themes, platform links ---------- */
  function initPodcast() {
    var cards = $all(".tc");
    if (!cards.length) return;
    var detail = $("#theme-detail");
    var detailTitle = $("#theme-detail-title");
    var detailBody = $("#theme-detail-body");
    var detailList = $("#theme-detail-list");

    function select(card) {
      cards.forEach(function (c) { c.classList.toggle("active", c === card); });
      if (!detail) return;
      detailTitle.textContent = card.getAttribute("data-title");
      detailBody.textContent = card.getAttribute("data-body");
      detailList.innerHTML = "";
      (card.getAttribute("data-topics") || "").split("|").forEach(function (t) {
        if (!t) return;
        var li = document.createElement("li");
        li.className = "tag";
        li.textContent = t;
        detailList.appendChild(li);
      });
      detail.classList.add("show");
    }

    cards.forEach(function (card) {
      card.setAttribute("tabindex", "0");
      card.addEventListener("click", function (e) {
        if (e.target.closest("a")) return;   // platform links behave normally
        select(card);
      });
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(card); }
      });
    });

    $all("[data-scroll]").forEach(function (b) {
      b.addEventListener("click", function (e) {
        var t = document.getElementById(b.getAttribute("data-scroll"));
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: "smooth", block: "start" }); }
      });
    });

    $all("[data-platform]").forEach(function (a) {
      a.addEventListener("click", function () {
        toast("Opening on " + a.getAttribute("data-platform") + "…");
      });
    });
  }

  /* ---------- 5. contact form ---------- */
  function initContact() {
    var form = $("#inquiry-form");
    if (!form) return;
    var success = $("#form-success");
    var submitBtn = $("button[type=submit]", form);

    var rules = {
      name: function (v) { return v.trim().length >= 2 ? "" : "Please enter your name."; },
      org: function () { return ""; },
      email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Please enter a valid email address."; },
      country: function () { return ""; },
      category: function (v) { return v ? "" : "Please choose a category."; },
      message: function (v) { return v.trim().length >= 10 ? "" : "Please tell us a little more (at least 10 characters)."; }
    };

    function setError(field, msg) {
      var wrap = field.closest(".fld");
      var err = $(".er", wrap);
      wrap.classList.toggle("error", !!msg);
      field.setAttribute("aria-invalid", msg ? "true" : "false");
      if (err) err.textContent = msg;
    }
    function validateField(field) {
      var rule = rules[field.name];
      var msg = rule ? rule(field.value) : "";
      setError(field, msg);
      return !msg;
    }

    $all("input, select, textarea", form).forEach(function (f) {
      f.addEventListener("blur", function () { validateField(f); });
      f.addEventListener("input", function () {
        if (f.closest(".fld").classList.contains("error")) validateField(f);
      });
    });

    function showSuccess(text) {
      success.textContent = text;
      success.className = "ct-ok show";
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var fields = $all("input, select, textarea", form);
      var firstBad = null;
      fields.forEach(function (f) { if (!validateField(f) && !firstBad) firstBad = f; });
      if (firstBad) { firstBad.focus(); success.className = "ct-ok"; return; }

      var data = {};
      fields.forEach(function (f) { data[f.name] = f.value.trim(); });

      if (SITE_CONFIG.formEndpoint) {
        submitBtn.disabled = true;
        fetch(SITE_CONFIG.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(data)
        }).then(function (r) {
          if (!r.ok) throw new Error("bad status");
          form.reset();
          showSuccess("Thank you, " + data.name.split(" ")[0] + ". Your inquiry has been sent — you'll hear back soon.");
        }).catch(function () {
          showSuccess("Sorry — something went wrong sending your message. Please try again shortly.");
          success.classList.add("fail");
        }).then(function () { submitBtn.disabled = false; });
      } else if (SITE_CONFIG.contactEmail) {
        var body = "Name: " + data.name + "\nOrganization: " + data.org + "\nEmail: " + data.email +
          "\nCountry / Timezone: " + data.country + "\nCategory: " + data.category + "\n\n" + data.message;
        location.href = "mailto:" + SITE_CONFIG.contactEmail +
          "?subject=" + encodeURIComponent("Website inquiry: " + data.category) +
          "&body=" + encodeURIComponent(body);
        showSuccess("Your email app should now open with your message ready to send.");
      } else {
        showSuccess("Your details look good, but the form isn't connected to an inbox yet. " +
          "(Site owner: set formEndpoint or contactEmail at the top of script.js.)");
      }
      success.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  /* ---------- 6. dynamic footer year ---------- */
  function initFooterYear() {
    $all("[data-current-year]").forEach(function (year) {
      year.textContent = new Date().getFullYear();
    });
  }

  /* ---------- boot ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    initActiveNav();
    initMobileMenu();
    initResearch();
    initPodcast();
    initContact();
    initFooterYear();
  });
})();
