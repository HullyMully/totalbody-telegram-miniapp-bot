const tg = window.Telegram?.WebApp || {
  expand() {},
  enableClosingConfirmation() {},
  setHeaderColor() {},
  setBackgroundColor() {},
  openLink(url) {
    window.open(url, "_blank", "noopener");
  },
  openTelegramLink(url) {
    window.open(url, "_blank", "noopener");
  },
  sendData() {},
};

const runtimeParams = new URLSearchParams(window.location.search);

function normalizeTelegramUrl(value) {
  if (!value) return "";
  const trimmed = value.trim();
  if (/^(https?:|tg:)/i.test(trimmed)) return trimmed;
  return `https://t.me/${trimmed.replace(/^@/, "")}`;
}

const PUBLIC_LINKS = {
  signup: normalizeTelegramUrl(runtimeParams.get("signup") || runtimeParams.get("bot")) || "https://t.me/demohmtgbot",
  telegramMain: "https://t.me/total_body",
  telegramVernadskogo: "https://t.me/total_body_ver",
  whatsappVernadskogo: "https://t.me/demohmtgbot",
};

const directions = [
  {
    title: "Растяжка",
    mood: "Гибкость",
    image: "assets/demo-gallery-1.svg",
    text: "Мягкая работа с телом, снятие зажимов и легкость после тренировки.",
    benefits: ["Подходит новичкам", "Снимает напряжение", "Помогает улучшить осанку"],
  },
  {
    title: "Пилатес",
    mood: "Сильный центр",
    image: "assets/demo-gallery-2.svg",
    text: "Контроль, глубокие мышцы и спокойная нагрузка без перегруза суставов.",
    benefits: ["Укрепляет корпус", "Поддерживает спину", "Дает ощущение собранности"],
  },
  {
    title: "Аэройога",
    mood: "Легкость",
    image: "assets/demo-gallery-3.svg",
    text: "Гамак помогает разгрузить спину, раскрыть тело и добавить немного полета.",
    benefits: ["Разгрузка позвоночника", "Эффектная практика", "Мягкая растяжка"],
  },
  {
    title: "Здоровая спина",
    mood: "Баланс",
    image: "assets/demo-gallery-4.svg",
    text: "Тренировка для тех, кто много сидит, устает в спине и хочет двигаться свободнее.",
    benefits: ["Мобилизация суставов", "Аккуратное укрепление", "Профилактика дискомфорта"],
  },
  {
    title: "Фитнес-аэробика",
    mood: "Энергия",
    image: "assets/demo-card.svg",
    text: "Динамичный формат для настроения, выносливости и приятной усталости после занятия.",
    benefits: ["Кардио-нагрузка", "Координация", "Заряд на день"],
  },
];

const coaches = [
  {
    name: "Анастасия Рустамова",
    role: "Stretching",
    text: "Ведет мягкие и внимательные занятия, помогает почувствовать тело и не бояться первого шага.",
  },
  {
    name: "Наталья Королева",
    role: "Pilates",
    text: "Сочетает научный подход, спокойный темп и заботу о технике каждого движения.",
  },
  {
    name: "Ирина Мозалева",
    role: "Yoga",
    text: "Создает практику для баланса: дыхание, гибкость, сила и устойчивость внутри.",
  },
];

const reviews = [
  {
    name: "Анна",
    rating: "5.0 / 5.0",
    text: "Очень понравилась атмосфера: спокойно, красиво и понятно. После первого занятия захотелось вернуться.",
  },
  {
    name: "Екатерина",
    rating: "4.9 / 5.0",
    text: "Администратор быстро помогла выбрать направление, а тренер аккуратно объясняла каждое упражнение.",
  },
  {
    name: "Виктория",
    rating: "5.0 / 5.0",
    text: "Удобно, что все можно посмотреть в Telegram и сразу записаться. Для меня это решило вопрос первого визита.",
  },
];

const faqItems = [
  {
    question: "Можно прийти без подготовки?",
    answer: "Да. На пробном занятии тренер подберет нагрузку под уровень и самочувствие.",
  },
  {
    question: "Что взять с собой?",
    answer: "Удобную форму, воду и хорошее настроение. Коврики и оборудование есть в студии.",
  },
  {
    question: "Как выбрать направление?",
    answer: "Оставь заявку, администратор уточнит цель и подскажет формат: растяжка, пилатес, йога или функциональные тренировки.",
  },
  {
    question: "Можно ли подарить занятие?",
    answer: "Да, в студии доступны подарочные сертификаты и бонусы для новых клиентов.",
  },
];

function openUrl(url) {
  if (!url) return;
  const isTelegram = /^https:\/\/t\.me\//i.test(url) || /^tg:/i.test(url);
  if (isTelegram && typeof tg.openTelegramLink === "function") {
    tg.openTelegramLink(url);
    return;
  }
  tg.openLink(url);
}

function vibrate(style = "light") {
  try {
    tg.HapticFeedback?.impactOccurred(style);
  } catch {
    // Telegram haptics are optional outside the mobile client.
  }
}

function handleSignup(event) {
  const source = event?.currentTarget?.closest("section")?.id || "mini_app";
  vibrate("medium");
  try {
    tg.sendData(JSON.stringify({ action: "signup", source, at: new Date().toISOString() }));
  } catch {
    // sendData is unavailable in a plain browser preview.
  }
  openUrl(PUBLIC_LINKS.signup);
}

function renderDirections() {
  const tabs = document.querySelector(".direction-tabs");
  const title = document.getElementById("directionTitle");
  const mood = document.getElementById("directionMood");
  const text = document.getElementById("directionText");
  const image = document.getElementById("directionImage");
  const benefits = document.getElementById("directionBenefits");
  const panel = document.querySelector(".direction-panel");

  function selectDirection(index) {
    const direction = directions[index];
    tabs.querySelectorAll(".direction-tab").forEach((tab, tabIndex) => {
      tab.classList.toggle("active", tabIndex === index);
      tab.setAttribute("aria-selected", String(tabIndex === index));
    });
    title.textContent = direction.title;
    mood.textContent = direction.mood;
    text.textContent = direction.text;
    image.src = direction.image;
    benefits.innerHTML = direction.benefits.map((benefit) => `<li>${benefit}</li>`).join("");
    panel.classList.remove("is-changing");
    requestAnimationFrame(() => panel.classList.add("is-changing"));
    vibrate("light");
  }

  tabs.innerHTML = directions
    .map(
      (direction, index) =>
        `<button class="direction-tab${index === 0 ? " active" : ""}" type="button" role="tab" aria-selected="${index === 0}" data-direction="${index}">${direction.title}</button>`,
    )
    .join("");

  tabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-direction]");
    if (!button) return;
    selectDirection(Number(button.dataset.direction));
  });

  selectDirection(0);
}

function renderCoaches() {
  const name = document.getElementById("coachName");
  const role = document.getElementById("coachRole");
  const text = document.getElementById("coachText");
  const image = document.getElementById("coachImage");
  const card = document.querySelector(".coach-card");
  let current = 0;

  function selectCoach(index) {
    current = (index + coaches.length) % coaches.length;
    const coach = coaches[current];
    name.textContent = coach.name;
    role.textContent = coach.role;
    text.textContent = coach.text;
    image.src = "assets/demo-coach.svg";
    card.classList.remove("is-changing");
    requestAnimationFrame(() => card.classList.add("is-changing"));
    vibrate("light");
  }

  document.querySelector("[data-coach-prev]").addEventListener("click", () => selectCoach(current - 1));
  document.querySelector("[data-coach-next]").addEventListener("click", () => selectCoach(current + 1));
  selectCoach(0);
}

function renderReviews() {
  const text = document.getElementById("reviewText");
  const name = document.getElementById("reviewName");
  const rating = document.getElementById("reviewRating");
  const dots = Array.from(document.querySelectorAll("[data-review]"));
  const card = document.querySelector(".review-card");
  let current = 0;
  let timer = null;

  function selectReview(index) {
    current = (index + reviews.length) % reviews.length;
    const review = reviews[current];
    text.textContent = review.text;
    name.textContent = review.name;
    rating.textContent = review.rating;
    dots.forEach((dot, dotIndex) => dot.classList.toggle("active", dotIndex === current));
    card.classList.remove("is-changing");
    requestAnimationFrame(() => card.classList.add("is-changing"));
  }

  function restartTimer() {
    window.clearInterval(timer);
    timer = window.setInterval(() => selectReview(current + 1), 5400);
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      selectReview(Number(dot.dataset.review));
      restartTimer();
      vibrate("light");
    });
  });

  selectReview(0);
  restartTimer();
}

function renderFaq() {
  const list = document.querySelector(".faq-list");
  list.innerHTML = faqItems
    .map(
      (item, index) => `
        <article class="faq-item${index === 0 ? " open" : ""}">
          <button class="faq-question" type="button" aria-expanded="${index === 0}">
            <span>${item.question}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 9 5 5 5-5 1.4 1.4L12 16.8 5.6 10.4 7 9Z" /></svg>
          </button>
          <div class="faq-answer"><p>${item.answer}</p></div>
        </article>
      `,
    )
    .join("");

  function syncAnswerHeight(item) {
    const answer = item.querySelector(".faq-answer");
    answer.style.maxHeight = item.classList.contains("open") ? `${answer.scrollHeight}px` : "0px";
  }

  list.querySelectorAll(".faq-item").forEach((item) => {
    const button = item.querySelector(".faq-question");
    syncAnswerHeight(item);
    button.addEventListener("click", () => {
      item.classList.toggle("open");
      button.setAttribute("aria-expanded", String(item.classList.contains("open")));
      syncAnswerHeight(item);
      vibrate("light");
    });
  });
}

function initRevealAnimations() {
  const revealItems = document.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.14 },
  );

  revealItems.forEach((item) => observer.observe(item));
}

function initStickyCta() {
  const sticky = document.querySelector("[data-sticky]");
  const hero = document.querySelector(".hero");
  const update = () => {
    sticky.classList.toggle("visible", window.scrollY > hero.offsetHeight * 0.42);
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
}

function bindActions() {
  document.querySelectorAll("[data-action='signup']").forEach((button) => {
    button.addEventListener("click", handleSignup);
  });

  document.querySelectorAll("[data-link]").forEach((button) => {
    button.addEventListener("click", () => {
      vibrate("light");
      openUrl(PUBLIC_LINKS[button.dataset.link]);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  tg.expand();
  tg.enableClosingConfirmation();
  tg.setHeaderColor("#970d43");
  tg.setBackgroundColor("#fffaf4");

  renderDirections();
  renderCoaches();
  renderReviews();
  renderFaq();
  bindActions();
  initRevealAnimations();
  initStickyCta();
});
