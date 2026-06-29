const voltage = document.querySelector("[data-ohm-voltage]");
const resistance = document.querySelector("[data-ohm-resistance]");
const voltageValue = document.querySelector("[data-ohm-voltage-value]");
const resistanceValue = document.querySelector("[data-ohm-resistance-value]");
const currentValue = document.querySelector("[data-ohm-current-value]");

function renderOhmPlayground() {
  if (!voltage || !resistance || !voltageValue || !resistanceValue || !currentValue) return;

  const volts = Number(voltage.value);
  const ohms = Number(resistance.value);
  const milliamps = (volts / ohms) * 1000;

  voltageValue.textContent = `${volts.toFixed(1)} V`;
  resistanceValue.textContent = `${ohms.toFixed(0)} Ω`;
  currentValue.textContent = `${milliamps.toFixed(1)} mA`;
}

[voltage, resistance].forEach((input) => {
  if (input) input.addEventListener("input", renderOhmPlayground);
});

renderOhmPlayground();
