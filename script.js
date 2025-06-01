const btnStart = document.getElementById("start");
const btnPause = document.getElementById("pause");
const btnReset = document.getElementById("reset");
const btnLap = document.getElementById("lap");
const lapsList = document.getElementById("laps");
const display = document.getElementById("display");
const centDisplay = document.getElementById("cent-display");
const secDisplay = document.getElementById("sec-display");
const minDisplay = document.getElementById("min-display");
const menuLaps = document.getElementById("menu-laps");

let hundreds = 0;
let seconds = 0;
let minutes = 0;
let centCount = null;
let numberLaps = 0;
let previousTotalInCents = 0;

const playTimer = () => {
  centCount = setInterval(() => {
    hundreds++;
    if (hundreds >= 100) {
      seconds++;
      hundreds = 0;
    }
    if (seconds >= 60) {
      minutes++;
      seconds = 0;
    }
    centDisplay.textContent = `.${format(hundreds)}`
    secDisplay.textContent = `${format(seconds)}`
    minDisplay.textContent = `${format(minutes)}`
  },
    10);
  display.style.color = "#29CD62";
  centDisplay.style.color = "#29CD62";
  btnStart.style.display = "none"
  btnReset.style.display = "none"
  btnPause.style.display = "inline"
  btnLap.style.display = "inline"
  return
}

const pauseTimer = () => {
  clearInterval(centCount);

  btnStart.textContent = "Continuar"
  btnStart.style.display = "inline"
  btnReset.style.display = "inline"
  btnPause.style.display = "none"
  btnLap.style.display = "none"
  display.style.color = "#CD2929";
  centDisplay.style.color = "#CD2929";
  return centCount
}

const format = (num) => {
  if (num < 10) {
    num = "0" + num;
  }
  return num
}

const resetTimer = () => {
  clearInterval(centCount);
  centCount = null;

  hundreds = 0;
  seconds = 0;
  minutes = 0;
  numberLaps = 0;
  previousTotalInCents = 0;
  centDisplay.textContent = `.${format(hundreds)}`
  secDisplay.textContent = `${format(seconds)}`
  minDisplay.textContent = `${format(minutes)}`

  btnStart.textContent = "Iniciar"
  btnStart.style.display = "inline"
  btnReset.style.display = "inline"
  btnPause.style.display = "none"
  btnLap.style.display = "none"
  display.style.color = "#ffffff";
  centDisplay.style.color = "#ffffff";
  lapsList.innerHTML = "";
  menuLaps.style.display = "none";
}

const lapTimer = () => {
  // Converte tempo total atual em centésimos
  const totalCentsNow = (minutes * 60 * 100) + (seconds * 100) + hundreds;

  // Calcula diferença desde a última volta
  const lapCents = totalCentsNow - previousTotalInCents;
  previousTotalInCents = totalCentsNow; // atualiza referência

  // Converte a volta para min:seg:centes
  const lapMinutes = Math.floor(lapCents / 6000);
  const lapSeconds = Math.floor((lapCents % 6000) / 100);
  const lapHundreds = lapCents % 100;

  // Cria o item visual
  menuLaps.style.display = "inline";
  const li = document.createElement("li");
  li.textContent = `Volta ${String(++numberLaps).padEnd(3)} | ${format(lapMinutes)}:${format(lapSeconds)}.${format(lapHundreds)} | ${format(minutes)}:${format(seconds)}.${format(hundreds)}`;
  li.style.color = "#CDB729";
  li.style.padding = "5px";

  // Adiciona no topo
  lapsList.prepend(li);
};