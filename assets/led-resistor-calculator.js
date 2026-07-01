const ledColor = document.querySelector("[data-led-color]");
const ledVoltage = document.querySelector("[data-led-source-voltage]");
const ledCurrent = document.querySelector("[data-led-target-current]");
const ledVoltageValue = document.querySelector("[data-led-source-voltage-value]");
const ledCurrentValue = document.querySelector("[data-led-target-current-value]");
const ledForwardVoltageValue = document.querySelector("[data-led-forward-voltage-value]");
const ledRequiredResistanceValue = document.querySelector("[data-led-required-resistance-value]");
const ledSuggestedResistanceValue = document.querySelector("[data-led-suggested-resistance-value]");
const ledResult = document.querySelector("[data-led-result]");
const ledResistorButtons = document.querySelectorAll("[data-led-resistor]");

const ledForwardVoltages = {
  red: 1.8,
  green: 2.1,
  blue: 3.2,
  white: 3.2,
};

const commonResistors = [100, 150, 220, 330, 470, 680, 1000, 1500, 2200, 3300, 4700];

let selectedResistance = 330;

function formatOhms(ohms) {
  if (ohms >= 1000) return `${(ohms / 1000).toFixed(ohms % 1000 === 0 ? 0 : 1)} kΩ`;
  return `${ohms} Ω`;
}

function nextCommonResistor(requiredOhms) {
  return commonResistors.find((value) => value >= requiredOhms) || commonResistors[commonResistors.length - 1];
}

function renderLedCalculator() {
  if (
    !ledColor ||
    !ledVoltage ||
    !ledCurrent ||
    !ledVoltageValue ||
    !ledCurrentValue ||
    !ledForwardVoltageValue ||
    !ledRequiredResistanceValue ||
    !ledSuggestedResistanceValue ||
    !ledResult
  ) {
    return;
  }

  const sourceVoltage = Number(ledVoltage.value);
  const targetMilliamps = Number(ledCurrent.value);
  const forwardVoltage = ledForwardVoltages[ledColor.value];
  const voltageAcrossResistor = sourceVoltage - forwardVoltage;

  ledVoltageValue.textContent = `${sourceVoltage.toFixed(1)} V`;
  ledCurrentValue.textContent = `${targetMilliamps.toFixed(0)} mA`;
  ledForwardVoltageValue.textContent = `${forwardVoltage.toFixed(1)} V`;

  if (voltageAcrossResistor <= 0) {
    ledRequiredResistanceValue.textContent = "impossible";
    ledSuggestedResistanceValue.textContent = "augmente la source";
    ledResult.textContent = "La source est trop basse pour cette LED: il ne reste presque rien pour la résistance.";
    return;
  }

  const requiredOhms = voltageAcrossResistor / (targetMilliamps / 1000);
  const suggestedOhms = nextCommonResistor(requiredOhms);
  const actualMilliamps = (voltageAcrossResistor / selectedResistance) * 1000;

  ledRequiredResistanceValue.textContent = `${Math.ceil(requiredOhms)} Ω`;
  ledSuggestedResistanceValue.textContent = formatOhms(suggestedOhms);

  if (actualMilliamps > 20) {
    ledResult.textContent = `${formatOhms(selectedResistance)} laisse passer environ ${actualMilliamps.toFixed(1)} mA: trop pour une petite LED de kit. Choisis plus grand.`;
  } else if (actualMilliamps > targetMilliamps * 1.3) {
    ledResult.textContent = `${formatOhms(selectedResistance)} fonctionne peut-être, mais laisse passer ${actualMilliamps.toFixed(1)} mA: plus que ton objectif.`;
  } else if (actualMilliamps >= targetMilliamps * 0.6) {
    ledResult.textContent = `${formatOhms(selectedResistance)} est un bon choix ici: environ ${actualMilliamps.toFixed(1)} mA dans la LED.`;
  } else {
    ledResult.textContent = `${formatOhms(selectedResistance)} est sûr, mais la LED sera probablement faible: environ ${actualMilliamps.toFixed(1)} mA.`;
  }
}

ledResistorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedResistance = Number(button.dataset.ledResistor);
    ledResistorButtons.forEach((candidate) => candidate.classList.remove("selected"));
    button.classList.add("selected");
    renderLedCalculator();
  });
});

[ledColor, ledVoltage, ledCurrent].forEach((input) => {
  if (input) input.addEventListener("input", renderLedCalculator);
});

renderLedCalculator();
