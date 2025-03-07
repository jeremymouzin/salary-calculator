document.addEventListener('DOMContentLoaded', () => {
    const MONTHLY_HOURS = 151.67;
    const WORKING_DAYS_PER_MONTH = 21; // Nombre moyen de jours travaillés par mois
    const hourlyRateInput = document.getElementById('hourly-rate');
    const hourlyRateSlider = document.getElementById('hourly-rate-slider');
    const hourlyRateDisplay = document.getElementById('hourly-rate-display');
    const socialContributionInput = document.getElementById('social-contribution');
    const tjmInput = document.getElementById('tjm');
    const tjmSlider = document.getElementById('tjm-slider');
    const tjmDisplay = document.getElementById('tjm-display');
    const invoiceAmountInput = document.getElementById('invoice-amount');
    const invoiceAmountSlider = document.getElementById('invoice-amount-slider');
    const invoiceAmountDisplay = document.getElementById('invoice-amount-display');
    const grossSalaryDisplay = document.getElementById('gross-salary');
    const deductionsDisplay = document.getElementById('deductions');
    const netSalaryDisplay = document.getElementById('net-salary');
    const netSalaryPerDayDisplay = document.getElementById('net-salary-per-day');
    const netInvoiceAmountDisplay = document.getElementById('net-invoice-amount');

    function updateCalculations() {
        const tjm = Number(tjmInput.value);
        const socialContribution = Number(socialContributionInput.value);
        const invoiceAmount = Number(invoiceAmountInput.value);

        const grossSalary = tjm * WORKING_DAYS_PER_MONTH;
        const deductions = grossSalary * (socialContribution / 100);
        const netSalary = grossSalary - deductions;
        const netSalaryPerDay = netSalary / WORKING_DAYS_PER_MONTH;
        const netInvoiceAmount = invoiceAmount * (1 - socialContribution / 100);

        hourlyRateDisplay.textContent = `${(tjm / 8).toFixed(2)} €`;
        tjmDisplay.textContent = `${tjm.toFixed(2)} €`;
        invoiceAmountDisplay.textContent = `${invoiceAmount.toFixed(2)} €`;
        grossSalaryDisplay.textContent = `${grossSalary.toFixed(2)} €`;
        deductionsDisplay.textContent = `-${deductions.toFixed(2)} €`;
        netSalaryDisplay.textContent = `${netSalary.toFixed(2)} €`;
        netSalaryPerDayDisplay.textContent = `${netSalaryPerDay.toFixed(2)} €`;
        netInvoiceAmountDisplay.textContent = `${netInvoiceAmount.toFixed(2)} €`;
    }

    hourlyRateInput.addEventListener('input', (e) => {
        const value = Math.round(Number(e.target.value));
        if (value >= 0) {
            hourlyRateSlider.value = value;
            tjmInput.value = value * 8;
            tjmSlider.value = value * 8;
            updateCalculations();
        }
    });

    hourlyRateSlider.addEventListener('input', (e) => {
        hourlyRateInput.value = e.target.value;
        tjmInput.value = e.target.value * 8;
        tjmSlider.value = e.target.value * 8;
        updateCalculations();
    });

    socialContributionInput.addEventListener('input', (e) => {
        const value = Number(e.target.value);
        if (value >= 0 && value <= 100) {
            updateCalculations();
        }
    });

    tjmInput.addEventListener('input', (e) => {
        const value = Math.round(Number(e.target.value) / 10) * 10;
        if (value >= 0) {
            tjmSlider.value = value;
            hourlyRateInput.value = Math.round(value / 8);
            hourlyRateSlider.value = Math.round(value / 8);
            updateCalculations();
        }
    });

    tjmSlider.addEventListener('input', (e) => {
        tjmInput.value = e.target.value;
        hourlyRateInput.value = Math.round(e.target.value / 8);
        hourlyRateSlider.value = Math.round(e.target.value / 8);
        updateCalculations();
    });

    invoiceAmountInput.addEventListener('input', (e) => {
        const value = Math.round(Number(e.target.value) / 100) * 100;
        if (value >= 0) {
            invoiceAmountSlider.value = value;
            updateCalculations();
        }
    });

    invoiceAmountSlider.addEventListener('input', (e) => {
        invoiceAmountInput.value = e.target.value;
        updateCalculations();
    });

    // Initial calculation
    updateCalculations();
}); 