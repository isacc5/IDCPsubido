import { validateEmail, validatePhone, validateRequired } from './validators.js';
import { formatNumericOnly } from './formatters.js';
import { CheckboxManager } from './checkboxManager.js';

export class FormManager {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.setupFormValidation();
        this.setupFormatters();
        this.setupCheckboxManagers();
        this.setupOtherDisabilityToggle();
    }

    setupFormValidation() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    setupFormatters() {
        const numericInputs = this.form.querySelectorAll('#documentNumber, input[type="tel"]');
        numericInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                e.target.value = formatNumericOnly(e.target.value);
            });
        });
    }

    setupCheckboxManagers() {
        const disabilityCheckboxes = document.querySelectorAll('input[name="disability"]');
        const noneDisabilityCheckbox = document.getElementById('noDisability');
        new CheckboxManager(disabilityCheckboxes, noneDisabilityCheckbox);

        const populationCheckboxes = document.querySelectorAll('input[name="population"]');
        const nonePopulationCheckbox = document.getElementById('none');
        new CheckboxManager(populationCheckboxes, nonePopulationCheckbox);
    }

    setupOtherDisabilityToggle() {
        const otherDisabilityCheckbox = document.getElementById('other');
        const otherDisabilityGroup = document.getElementById('otherDisabilityGroup');
        
        otherDisabilityCheckbox.addEventListener('change', () => {
            otherDisabilityGroup.style.display = otherDisabilityCheckbox.checked ? 'block' : 'none';
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        
        this.clearErrors();
        
        if (this.validateForm()) {
            alert('Formulario enviado correctamente');
            this.form.reset();
        }
    }

    clearErrors() {
        this.form.querySelectorAll('.error-message').forEach(msg => msg.remove());
        this.form.querySelectorAll('.error').forEach(field => field.classList.remove('error'));
    }

    validateForm() {
        let isValid = true;
        const requiredFields = this.form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!validateRequired(field.value)) {
                this.showError(field, 'Este campo es requerido');
                isValid = false;
            }
        });

        const email = document.getElementById('email');
        if (email.value && !validateEmail(email.value)) {
            this.showError(email, 'Por favor ingrese un correo electrónico válido');
            isValid = false;
        }

        ['phone', 'mobile'].forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field.value && !validatePhone(field.value)) {
                this.showError(field, 'Por favor ingrese un número telefónico válido');
                isValid = false;
            }
        });

        return isValid;
    }

    showError(field, message) {
        field.classList.add('error');
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        field.parentNode.appendChild(errorMessage);
    }
}