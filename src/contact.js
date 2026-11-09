// Contact form for the Northwind Studio landing page.

// An address is valid when it has one "@", something before it, and a domain with a dot after it.
export function isValidEmail(value) {
  if (typeof value !== "string") return false;
  const email = value.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Called by the form's submit event. Refuses an invalid email before anything is sent.
export function handleSubmit(form, send) {
  const email = form.email;
  if (!isValidEmail(email)) {
    return { sent: false, error: "Please enter a valid email address." };
  }
  send({ email: email.trim(), message: form.message ?? "" });
  return { sent: true, error: null };
}
