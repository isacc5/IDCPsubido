document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Capturar valores del formulario
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Simulación de envío: Mostrar en consola
    console.log("Formulario enviado con éxito:");
    console.log(`Nombre: ${name}`);
    console.log(`Correo: ${email}`);
    console.log(`Mensaje: ${message}`);

    // Mensaje de confirmación
    const response = document.getElementById("formResponse");
    response.style.display = "block";
    response.textContent = "¡Gracias por tu mensaje! Lo hemos recibido.";

    // Resetear formulario
    this.reset();
});
