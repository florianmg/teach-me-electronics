document.querySelectorAll("[data-quiz]").forEach((quiz) => {
  const feedback = quiz.querySelector("[data-feedback]");
  const buttons = quiz.querySelectorAll("button[data-answer]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((candidate) => {
        candidate.classList.remove("correct", "incorrect");
        candidate.disabled = false;
      });

      const isCorrect = button.dataset.answer === quiz.dataset.correct;
      button.classList.add(isCorrect ? "correct" : "incorrect");
      feedback.textContent = isCorrect ? quiz.dataset.good : quiz.dataset.bad;
    });
  });
});
