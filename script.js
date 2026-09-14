function sendToWhatsApp(event) {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  const whatsappMessage = `Hello Mubarak,

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}`;

  const phoneNumber = "2349036346292";

  event.currentTarget.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
}
