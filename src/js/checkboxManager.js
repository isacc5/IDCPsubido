export class CheckboxManager {
    constructor(checkboxes, noneOption) {
        this.checkboxes = checkboxes;
        this.noneOption = noneOption;
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => this.handleChange(checkbox));
        });
    }

    handleChange(changedCheckbox) {
        if (changedCheckbox === this.noneOption && changedCheckbox.checked) {
            this.uncheckAllExcept(this.noneOption);
        } else if (changedCheckbox !== this.noneOption && changedCheckbox.checked) {
            this.noneOption.checked = false;
        }
    }

    uncheckAllExcept(exception) {
        this.checkboxes.forEach(cb => {
            if (cb !== exception) cb.checked = false;
        });
    }
}