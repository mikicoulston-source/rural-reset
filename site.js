(function () {
  const form = document.querySelector("[data-register-form]");
  const status = document.querySelector("[data-form-status]");

  if (!form || !status) return;

  function setStatus(message, state) {
    status.textContent = message;
    status.dataset.state = state || "";
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      load: String(formData.get("load") || "").trim(),
      consent: formData.get("consent") === "on",
      website: String(formData.get("website") || "").trim()
    };

    if (!payload.name || !payload.email || !payload.consent) {
      setStatus("Please add your name, email, and consent before saving your spot.", "error");
      return;
    }

    const submitButton = form.querySelector("button[type='submit']");
    submitButton.disabled = true;
    submitButton.textContent = "Saving...";
    setStatus("Saving your spot...", "");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "Registration failed");
      }

      form.reset();
      setStatus("You're in. I will send through the session details and worksheet soon.", "success");
    } catch (error) {
      setStatus("Something did not save. Please try again, or message Miki directly.", "error");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Save My Spot";
    }
  });
})();
