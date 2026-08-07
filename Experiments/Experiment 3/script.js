document.getElementById('gradeForm').addEventListener('submit', function(event) {
    // Prevent the default browser form submission refresh behavior
    event.preventDefault();

    // Setup input handles and clear out previous validation states
    const fields = ['math', 'science', 'history'];
    let hasErrors = false;
    let scores = {};

    fields.forEach(field => {
        const inputElement = document.getElementById(field);
        const errorElement = document.getElementById(`${field}Error`);
        const rawValue = inputElement.value.trim();
       
        // Reset old visual indicators
        errorElement.textContent = "";
       
        // --- FORM VALIDATION CONTROL STRUCTURES ---
        if (rawValue === "") {
            errorElement.textContent = "Field cannot be empty.";
            hasErrors = true;
        } else if (isNaN(rawValue)) {
            errorElement.textContent = "Please enter a valid numeric value.";
            hasErrors = true;
        } else {
            const parsedScore = parseFloat(rawValue);
            if (parsedScore < 0 || parsedScore > 100) {
                errorElement.textContent = "Marks must fall within 0 and 100.";
                hasErrors = true;
            } else {
                scores[field] = parsedScore; // Successfully validated numeric score
            }
        }
    });

    const resultsCard = document.getElementById('resultsCard');
   
    // Halt logic stream if any field breaks our validation rules
    if (hasErrors) {
        resultsCard.classList.add('hidden');
        return;
    }

    // --- ARITHMETIC PROCESSING ---
    const totalMarks = scores.math + scores.science + scores.history;
    const averagePercentage = totalMarks / 3;

    // --- GRADING SYSTEM CONTROL STRUCTURES (Conditional If-Else Ladder) ---
    let assignedGrade = "";
    if (averagePercentage >= 90) {
        assignedGrade = "A+";
    } else if (averagePercentage >= 80) {
        assignedGrade = "A";
    } else if (averagePercentage >= 70) {
        assignedGrade = "B";
    } else if (averagePercentage >= 60) {
        assignedGrade = "C";
    } else if (averagePercentage >= 50) {
        assignedGrade = "D";
    } else {
        assignedGrade = "F (Fail)";
    }

    // --- DYNAMIC UI UPDATES ---
    document.getElementById('resTotal').textContent = totalMarks.toFixed(1);
    document.getElementById('resPercent').textContent = `${averagePercentage.toFixed(2)}%`;
   
    const gradeBadge = document.getElementById('resGrade');
    gradeBadge.textContent = assignedGrade;
   
    // Toggle color badge based on pass/fail logic
    if (assignedGrade.startsWith("F")) {
        gradeBadge.style.background = "#e74c3c"; // Crimson red for failure
    } else {
        gradeBadge.style.background = "#2ecc71"; // Emerald green for passing grades
    }

    resultsCard.classList.remove('hidden');
});