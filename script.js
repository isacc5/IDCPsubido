document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');
    const otherDisabilityCheckbox = document.getElementById('other');
    const otherDisabilityGroup = document.getElementById('otherDisabilityGroup');
    const noneDisabilityCheckbox = document.getElementById('noDisability');
    const nonePopulationCheckbox = document.getElementById('none');

    // Función para manejar la visibilidad del campo de otra discapacidad
    function toggleOtherDisability() {
        otherDisabilityGroup.style.display = otherDisabilityCheckbox.checked ? 'block' : 'none';
    }

    // Evento para el checkbox de otra discapacidad
    otherDisabilityCheckbox.addEventListener('change', toggleOtherDisability);

    // Manejar exclusividad del checkbox "Ninguna" en discapacidades
    document.querySelectorAll('input[name="disability"]').forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            if (this === noneDisabilityCheckbox && this.checked) {
                document.querySelectorAll('input[name="disability"]').forEach(cb => {
                    if (cb !== noneDisabilityCheckbox) cb.checked = false;
                });
            } else if (this !== noneDisabilityCheckbox && this.checked) {
                noneDisabilityCheckbox.checked = false;
            }
            toggleOtherDisability();
        });
    });

    // Manejar exclusividad del checkbox "Ninguna" en poblaciones
    document.querySelectorAll('input[name="population"]').forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            if (this === nonePopulationCheckbox && this.checked) {
                document.querySelectorAll('input[name="population"]').forEach(cb => {
                    if (cb !== nonePopulationCheckbox) cb.checked = false;
                });
            } else if (this !== nonePopulationCheckbox && this.checked) {
                nonePopulationCheckbox.checked = false;
            }
        });
    });

    // Validación en tiempo real: restringir letras/números según el campo
    const restrictInput = (field, regex) => {
        field.addEventListener('input', function () {
            this.value = this.value.replace(regex, '');
        });
    };

    // Aplicar restricciones a nombres, apellidos, país y ciudad (solo letras y espacios permitidos)
    const textFields = ['firstName', 'secondName', 'firstLastName', 'secondLastName', 'country', 'city'];
    textFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        restrictInput(field, /[^a-zA-Z\sáéíóúÁÉÍÓÚñÑ]/g); // Permitir solo letras y espacios
    });

    // Aplicar restricciones a documento, teléfono y móvil (solo números permitidos)
    const numericFields = ['documentNumber', 'phone', 'mobile'];
    numericFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        restrictInput(field, /[^0-9]/g); // Permitir solo números
    });

    // Validación del formulario al enviar
    form.addEventListener('submit', function (e) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        // Limpiar mensajes de error previos
        document.querySelectorAll('.error-message').forEach(msg => msg.remove());
        document.querySelectorAll('.error').forEach(field => field.classList.remove('error'));

        // Validar campos requeridos
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = 'Este campo es requerido';
                field.parentNode.appendChild(errorMessage);
            }
        });

        // Validar correo electrónico
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value && !emailRegex.test(email.value)) {
            isValid = false;
            email.classList.add('error');
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'Por favor ingrese un correo electrónico válido';
            email.parentNode.appendChild(errorMessage);
        }

        // Validar que los números telefónicos tengan longitud válida
        const phoneRegex = /^\d{7,10}$/;
        numericFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field.value && !phoneRegex.test(field.value)) {
                isValid = false;
                field.classList.add('error');
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = 'Ingrese un número válido de 7 a 10 dígitos';
                field.parentNode.appendChild(errorMessage);
            }
        });

        // Si no es válido, detener el envío
        if (!isValid) {
            alert('Por favor corrija los errores antes de enviar el formulario');
            e.preventDefault(); // Evitar envío
        } else {
            alert('Formulario enviado correctamente');
            form.reset(); // Resetear el formulario
        }
    });
});

