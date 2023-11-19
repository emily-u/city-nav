const cities = [
  {
    section: "cupertino",
    label: "Cupertino",
    timezone: "America/Los_Angeles",
  },
  {
    section: "new-york-city",
    label: "New York City",
    timezone: "America/New_York",
  },
  {
    section: "london",
    label: "London",
    timezone: "Europe/London",
  },
  {
    section: "amsterdam",
    label: "Amsterdam",
    timezone: "Europe/Amsterdam",
  },
  {
    section: "tokyo",
    label: "Tokyo",
    timezone: "Asia/Tokyo",
  },
  {
    section: "hong-kong",
    label: "Hong Kong",
    timezone: "Asia/Hong_Kong",
  },
  {
    section: "sydney",
    label: "Sydney",
    timezone: "Australia/Sydney",
  },
];

const container = document.querySelector(".box");
const len = cities.length;
for (let i = 0; i < len; i++) {
  const { section, label } = cities[i];
  const btn = document.createElement("button");
  btn.textContent = label;
  btn.value = section;
  btn.setAttribute("index", i);
  btn.classList.add("item");
  container.appendChild(btn);
}

// animation start from this offSetLeft position
let startLeft = 0;
// animation end from this offSetLeft position
let destinationLeft = 0;

const slide = document.querySelector(".slide");
const timeInfo = document.querySelector("#local-time");

// selected tab
let curElement;

// interval to update timer
let interval;

function triggerAnimation() {
  destinationLeft = curElement.offsetLeft;
  const allItems = document.querySelectorAll(".item");
  allItems.forEach((item) => {
    item.classList.remove("active");
  });
  curElement.classList.add("active");

  slide.style.width = `${curElement.offsetWidth}px`;

  slide.animate(
    [
      // keyframes
      { transform: "translateX(" + startLeft + "px)" },
      { transform: "translateX(" + destinationLeft + "px)" },
    ],
    {
      duration: 300,
      easing: "linear",
      fill: "both",
    }
  );

  startLeft = destinationLeft;
}



function updateTimeInfo() {
  interval = setInterval(() => {
    const index = curElement.getAttribute("index");
    const { timezone, label } = cities[index];
    const date = new Date().toLocaleString("en", { timeZone: timezone, weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"});
    const time = new Date().toLocaleTimeString("en", { timeZone: timezone});
    timeInfo.innerHTML = `<h1>${label}</h1><h1>${time}</h1><h2>${date}</h2>`;
  });
}

container.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    if (interval) {
      clearInterval(interval);
    }
    curElement = e.target;
    triggerAnimation();
    updateTimeInfo();
  }
});

window.addEventListener("resize", (e) => {
  if (curElement) {
    triggerAnimation();
  }
});

window.addEventListener("beforeunload", (e) => {
  if (interval) {
    clearInterval(interval);
  }
});
