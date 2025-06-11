// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    // Настройка темы
    tg.expand();
    tg.enableClosingConfirmation();
    
    // Получаем все элементы кнопок "Записаться" (контейнеры текста)
    const signupButtons = document.querySelectorAll('.div-wrapper, .overlap-group-2');
    
    // Добавляем обработчики для каждой кнопки
    signupButtons.forEach(button => {
        button.addEventListener('click', handleSignup);
    });

    // Обработчик для всех кнопок социальных сетей (без "Мы в Telegram" и "Мы в Вконтакте")
    const socialButtons = document.querySelectorAll('.logos-telegram, .logos-telegram-2, .logos-telegram-3, .logos-telegram-5, .logos-whatsapp-icon, .logos-whatsapp-icon-2, .logos-whatsapp-icon-3, .logos-whatsapp-icon-4');
    socialButtons.forEach(button => {
        button.addEventListener('click', handleSocialClick);
    });

    const container = document.querySelector('.group-17');
    const cards = container.querySelectorAll('.frame-9, .overlap-14, .overlap-17, .overlap-18');
    
    const vazhnoeContainer = document.querySelector('.vazhnoe-items-container');
    const vazhnoeItems = vazhnoeContainer.querySelectorAll('.group-25, .group-26, .group-29, .group-30');
    
    const poleznoeContainer = document.querySelector('.poleznoe-items-container');
    const poleznoeItems = poleznoeContainer.querySelectorAll('.group-27, .group-28, .group-32, .group-33');
    
    const trainingContainer = document.querySelector('.training-items-container');
    const trainingItems = trainingContainer.querySelectorAll('.overlap-group-wrapper, .frame-12, .frame-13, .frame-14, .frame-15, .frame-16');
    
    function updateActiveCard(containerElement, items) {
        const containerRect = containerElement.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;
        
        items.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            const itemCenter = itemRect.left + itemRect.width / 2;
            const distance = Math.abs(itemCenter - containerCenter);
            
            if (distance < itemRect.width / 2) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    // Обновляем при скролле для блока тренировок
    container.addEventListener('scroll', function() { updateActiveCard(container, cards); });
    
    // Обновляем при загрузке страницы для блока тренировок
    updateActiveCard(container, cards);
    
    // Обновляем при изменении размера окна для блока тренировок
    window.addEventListener('resize', function() { updateActiveCard(container, cards); });

    // Обновляем при скролле для блока Важное
    vazhnoeContainer.addEventListener('scroll', function() { updateActiveCard(vazhnoeContainer, vazhnoeItems); });
    
    // Обновляем при загрузке страницы для блока Важное
    updateActiveCard(vazhnoeContainer, vazhnoeItems);
    
    // Обновляем при изменении размера окна для блока Важное
    window.addEventListener('resize', function() { updateActiveCard(vazhnoeContainer, vazhnoeItems); });

    // Обновляем при скролле для блока Полезное
    poleznoeContainer.addEventListener('scroll', function() { updateActiveCard(poleznoeContainer, poleznoeItems); });
    
    // Обновляем при загрузке страницы для блока Полезное
    updateActiveCard(poleznoeContainer, poleznoeItems);
    
    // Обновляем при изменении размера окна для блока Полезное
    window.addEventListener('resize', function() { updateActiveCard(poleznoeContainer, poleznoeItems); });

    // Обработчики для блока "Тренировки"
    trainingContainer.addEventListener('scroll', () => updateActiveCard(trainingContainer, trainingItems));
    window.addEventListener('load', () => updateActiveCard(trainingContainer, trainingItems));
    window.addEventListener('resize', () => updateActiveCard(trainingContainer, trainingItems));

    // --- Новый слайдер отзывов с apple-style анимацией ---
    const reviews = [
        {
            name: "Анна",
            text: "Очень понравилось! Тренеры внимательные, атмосфера супер. Уже после первой тренировки почувствовала результат.",
            rating: 5,
            avatar: "img/ellipse-3.png",
        },
        {
            name: "Андрей",
            text: "Профессиональные тренеры, индивидуальный подход. Результат заметен уже через месяц.",
            rating: 4.8,
            avatar: "img/ellipse-2.png",
        },
        {
            name: "Владимир",
            text: "Очень уютная студия, современное оборудование, дружелюбная атмосфера.",
            rating: 5,
            avatar: "img/ellipse-4.png",
        },
    ];

    const reviewsContainer = document.querySelector('.reviews-container');
    const slider = reviewsContainer.querySelector('.reviews-slider');
    const prevButton = reviewsContainer.querySelector('.review-prev');
    const nextButton = reviewsContainer.querySelector('.review-next');
    let currentSlide = 0;

    function renderCarousel(centerIdx, animation = null, direction = 1) {
        // Очищаем слайдер
        slider.innerHTML = '';
        // Создаём новый слайд
        const leftIdx = (centerIdx - 1 + reviews.length) % reviews.length;
        const rightIdx = (centerIdx + 1) % reviews.length;
        const centerReview = reviews[centerIdx];
        const slide = document.createElement('div');
        slide.className = 'review-slide active';
        slide.innerHTML = `
          <div class="review-avatars">
            <div class="avatar-side-wrap">
              <img class="avatar-side" src="${reviews[leftIdx].avatar}" alt="${reviews[leftIdx].name}">
            </div>
            <div class="avatar-center-wrap">
              <img class="avatar-center" src="${centerReview.avatar}" alt="${centerReview.name}">
            </div>
            <div class="avatar-side-wrap">
              <img class="avatar-side" src="${reviews[rightIdx].avatar}" alt="${reviews[rightIdx].name}">
            </div>
          </div>
          <div class="avatar-name-center">${centerReview.name}</div>
          <p class="text-wrapper-13">${centerReview.text}</p>
            <div class="frame-6">
              <p class="element">
              <span class="span">${centerReview.rating.toFixed(1)}</span><span class="text-wrapper-14">/5.0 Рейтинг</span>
              </p>
              <div class="frame-7">
              ${[1,2,3,4,5].map(i => `<div class="star${i <= Math.round(centerReview.rating) ? '' : ' empty'}"><img class="star-2" src="img/star-1.svg" /></div>`).join('')}
            </div>
          </div>
        `;
        if (animation) {
            slide.classList.add(animation);
            // После анимации убираем класс
            slide.addEventListener('animationend', () => {
                slide.classList.remove(animation);
            }, { once: true });
        }
        slider.appendChild(slide);
    }

    // Начальный рендер
    renderCarousel(currentSlide);

    let isAnimating = false;

    function moveCarousel(direction) {
        if (isAnimating) return;
        isAnimating = true;
        const oldSlide = slider.querySelector('.review-slide');
        let outClass = direction === 1 ? 'slide-out-left' : 'slide-out-right';
        let inClass = direction === 1 ? 'slide-in-right' : 'slide-in-left';
        // Анимация ухода старого слайда
        oldSlide.classList.add(outClass);
        // После ухода старого слайда рендерим новый с анимацией входа
        oldSlide.addEventListener('animationend', () => {
            if (direction === 1) {
                currentSlide = (currentSlide + 1) % reviews.length;
            } else {
                currentSlide = (currentSlide - 1 + reviews.length) % reviews.length;
            }
            renderCarousel(currentSlide, inClass, direction);
            // После входа нового слайда убираем анимацию и разрешаем новые клики
            const newSlide = slider.querySelector('.review-slide');
            newSlide.addEventListener('animationend', () => {
                newSlide.classList.remove(inClass);
                isAnimating = false;
            }, { once: true });
        }, { once: true });
    }

    prevButton.addEventListener('click', () => moveCarousel(-1));
    nextButton.addEventListener('click', () => moveCarousel(1));

    // --- Галерея слайдер ---
    const galleryImages = [
        'img/gallery-1.png',
        'img/gallery-2.png',
        'img/gallery-3.png',
        'img/gallery-4.png',
    ];

    const galleryContainer = document.querySelector('.gallery-container');
    const gallerySlider = galleryContainer.querySelector('.gallery-slider');
    const galleryPrev = galleryContainer.querySelector('.gallery-prev');
    const galleryNext = galleryContainer.querySelector('.gallery-next');
    let currentGallery = 0;

    function renderGallery(idx, animation = null, direction = 1) {
        gallerySlider.innerHTML = '';
        const slide = document.createElement('div');
        slide.className = 'gallery-slide active';
        slide.innerHTML = `<img src="${galleryImages[idx]}" alt="gallery">`;
        if (animation) {
            slide.classList.add(animation);
            slide.addEventListener('animationend', () => {
                slide.classList.remove(animation);
            }, { once: true });
        }
        gallerySlider.appendChild(slide);
    }
    renderGallery(currentGallery);

    let isGalleryAnimating = false;
    function moveGallery(direction) {
        if (isGalleryAnimating) return;
        isGalleryAnimating = true;
        const oldSlide = gallerySlider.querySelector('.gallery-slide');
        let outClass = direction === 1 ? 'slide-out-left' : 'slide-out-right';
        let inClass = direction === 1 ? 'slide-in-right' : 'slide-in-left';
        oldSlide.classList.add(outClass);
        oldSlide.addEventListener('animationend', () => {
            if (direction === 1) {
                currentGallery = (currentGallery + 1) % galleryImages.length;
            } else {
                currentGallery = (currentGallery - 1 + galleryImages.length) % galleryImages.length;
            }
            renderGallery(currentGallery, inClass, direction);
            const newSlide = gallerySlider.querySelector('.gallery-slide');
            newSlide.addEventListener('animationend', () => {
                newSlide.classList.remove(inClass);
                isGalleryAnimating = false;
            }, { once: true });
        }, { once: true });
    }
    galleryPrev.addEventListener('click', () => moveGallery(-1));
    galleryNext.addEventListener('click', () => moveGallery(1));

    // --- Модальное окно тренеров ---
    const coaches = [
        {
            photo: 'img/coach-1.JPG',
            name: 'Анастасия Рустамова',
            desc: 'Анастасия — тренер с 6-летним опытом, кандидат в мастера спорта по синхронному фигурному катанию, многократная чемпионка России и Европы. С раннего детства в спорте — от фигурного катания и художественной гимнастики до сноуборда и вейксёрфа. Проводит персональные и групповые тренировки в мини-группах до 8 человек. Работает с подростками и взрослыми, создавая атмосферу поддержки, движения и заботы о теле. Вдохновляет личным примером: совмещает тренерство с нутрициологией, регулярно учится и планирует освоить массаж. Верит, что спорт помогает не только телу, но и уму — восстанавливает, заряжает и возвращает к себе. Любит путешествия, русскую музыку и всё, что связано с активной жизнью. На её тренировках — результат с душой.'
        },
        {
            photo: 'img/coach-3.JPG',
            name: 'Наталья Королёва',
            desc: 'Наталья пришла в фитнес в 2012 году как участница, а сегодня — сертифицированный тренер и кандидат биологических наук. Она совмещает научный подход с личным опытом, создавая осознанные и эффективные тренировки. Проводит занятия в мини-группах и больших залах, делая акцент не только на физический результат, но и на эмоциональное восстановление. Её путь — от полного подростка до профессионального тренера — вдохновляет тех, кто хочет меняться и чувствовать поддержку. Наталья продолжает развиваться, обучаясь новым методикам. Её занятия наполнены вниманием, заботой и энергией. Любит танцы, сайкл и прогулки — всё, что заряжает и помогает быть в ресурсе. Если тебе нужен тренер с душой и научным подходом — тебе к Наталье.'
        },
        {
            photo: 'img/coach-2.JPG',
            name: 'Ирина Мозалева',
            desc: 'Ирина — сертифицированный инструктор хатха-йоги (YTTC-200, Федерация йоги России) с образованием МГУ (филология). Её занятия сочетают практику, философию и осознанность, балансируя физическую нагрузку и внутреннее спокойствие. С детства Ирина занималась балетом и фитнесом, но йога стала её путём к ментальной устойчивости. Более года она ведёт групповые и индивидуальные тренировки, включая гвоздестояние для глубокого расслабления и концентрации. Вне йоги Ирина читает, изучает французский и увлекается плаванием. Она создаёт вдохновляющее пространство, где каждый чувствует себя услышанным. Занятия с Ириной помогут обрести гармонию тела и разума, внутреннюю силу и устойчивость.'
        },
        {
            photo: 'img/coach-4.JPG',
            name: 'Наталья Зуева',
            desc: 'Наталья — сертифицированный тренер с образованием СПБГУСЭ («Сервис») и дипломами по пилатесу и фитнесу. Её подход сочетает знания, внимание к деталям и заботу о клиентах. Ведёт групповые занятия по пилатесу, стретчингу и «Здоровой спине», совмещая эффективность и мягкость. С 7 лет в спорте: побеждала в волейболе, участвовала в соревнованиях по лёгкой атлетике, баскетболу и метанию гранаты. С 2024 года в Москве активно развивается как тренер, создавая занятия для укрепления тела и внутреннего равновесия. Вдохновляется музыкой, танцами и дизайном, привнося творчество в тренировки. Занятия с Натальей улучшат осанку, гибкость и силу, наполнят энергией. '
        }
    ];

    const modalCoaches = document.querySelector('.modal-coaches');
    const modalBackdrop = document.querySelector('.modal-coaches__backdrop');
    const modalContent = document.querySelector('.modal-coaches__content');
    const coachesSlider = document.querySelector('.coaches-slider');
    const coachesClose = document.querySelector('.modal-coaches__close');
    let currentCoach = 0;

    function renderCoach(idx) {
        coachesSlider.innerHTML = '';
        const slide = document.createElement('div');
        slide.className = 'coach-slide';
        slide.innerHTML = `
            <img class="coach-photo" src="${coaches[idx].photo}" alt="${coaches[idx].name}">
            <div class="coach-desc">${coaches[idx].desc}</div>
            <div class="coaches-nav">
              <button class="coaches-prev">&#8592;</button>
              <button class="coaches-next">&#8594;</button>
            </div>
        `;
        coachesSlider.appendChild(slide);
        // Навешиваем обработчики на новые кнопки
        slide.querySelector('.coaches-prev').onclick = () => {
            currentCoach = (currentCoach - 1 + coaches.length) % coaches.length;
            renderCoach(currentCoach);
        };
        slide.querySelector('.coaches-next').onclick = () => {
            currentCoach = (currentCoach + 1) % coaches.length;
            renderCoach(currentCoach);
        };
    }

    function openCoachesModal(idx = 0) {
        currentCoach = idx;
        renderCoach(currentCoach);
        modalCoaches.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeCoachesModal() {
        modalCoaches.style.display = 'none';
        document.body.style.overflow = '';
    }

    coachesClose.addEventListener('click', closeCoachesModal);
    modalBackdrop.addEventListener('click', closeCoachesModal);

    // Открытие по клику на "Тренеры"
    document.querySelectorAll('.group-25, .text-wrapper-42').forEach(el => {
        el.addEventListener('click', e => {
            if (el.textContent.trim().toLowerCase().includes('тренер')) {
                openCoachesModal(0);
            }
        });
    });

    // --- Модальное окно расписания ---
    const modalSchedule = document.querySelector('.modal-schedule');
    const modalScheduleBackdrop = document.querySelector('.modal-schedule__backdrop');
    const modalScheduleClose = document.querySelector('.modal-schedule__close');
    const scheduleIframe = document.querySelector('.schedule-iframe');

    function openScheduleModal() {
        modalSchedule.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    function closeScheduleModal() {
        modalSchedule.style.display = 'none';
        document.body.style.overflow = '';
    }
    modalScheduleClose.addEventListener('click', closeScheduleModal);
    modalScheduleBackdrop.addEventListener('click', closeScheduleModal);

    // Логика для кликабельности крестика поверх iframe
    if (modalScheduleClose && scheduleIframe) {
        modalScheduleClose.addEventListener('mouseenter', () => {
            scheduleIframe.classList.add('no-pointer');
        });
        modalScheduleClose.addEventListener('mouseleave', () => {
            scheduleIframe.classList.remove('no-pointer');
        });
        // Для мобильных: при нажатии сразу отключать pointer-events на iframe на 1 сек
        modalScheduleClose.addEventListener('touchstart', () => {
            scheduleIframe.classList.add('no-pointer');
            setTimeout(() => scheduleIframe.classList.remove('no-pointer'), 1000);
        }, { passive: true }); // Добавляем passive: true для лучшей производительности на мобильных
    }

    // Открытие по клику на всю карточку 'Расписание'
    const scheduleCard = document.querySelector('.group-26');
    if (scheduleCard) {
        scheduleCard.addEventListener('click', openScheduleModal);
    }

    // --- Модальное окно Наши цены ---
    const prices = [
        {
            title: "Лайт",
            features: [
                "8 занятий",
                "30 дней",
                "6 дней заморозки",
                "1 гостевой визит"
            ],
            cost: "9600 руб."
        },
        {
            title: "Стандарт",
            features: [
                "12 занятий",
                "45 дней",
                "10 дней заморозки",
                "2 гостевых визита",
                "Доступ к онлайн-библиотеке"
            ],
            cost: "14400 руб."
        },
        {
            title: "Премиум",
            features: [
                "16 занятий",
                "60 дней",
                "15 дней заморозки",
                "3 гостевых визита",
                "Индивидуальная тренировка",
                "Консультация нутрициолога"
            ],
            cost: "19200 руб."
        },
        {
            title: "Безлимит",
            features: [
                "Неограниченное количество занятий",
                "90 дней",
                "20 дней заморозки",
                "Безлимитные гостевые визиты",
                "Индивидуальный план тренировок",
                "Полный доступ к онлайн-ресурсам",
                "Приоритетная запись"
            ],
            cost: "28800 руб."
        },
        {
            title: "Новый тариф",
            features: [
                "1 занятий",
                "1 дней",
                "1 дней заморозки",
                "1 гостевых визитов"
            ],
            cost: "1000 руб."
        }
    ];

    const modalPrices = document.querySelector('.modal-prices');
    const modalPricesBackdrop = document.querySelector('.modal-prices__backdrop');
    const modalPricesClose = document.querySelector('.modal-prices__close');
    const pricesSlider = document.querySelector('.prices-slider');
    const pricesPrev = document.querySelector('.prices-prev');
    const pricesNext = document.querySelector('.prices-next');
    let currentPriceBlock = 0;

    function renderPriceBlock(idx) {
        pricesSlider.innerHTML = ''; // Очищаем слайдер перед добавлением нового блока
        const price = prices[idx];
        if (!price) {
            // Этого не должно происходить после исправления логики индексации,
            // но оставляем на случай непредвиденных ошибок.
            console.error("Ошибка: Объект цены undefined или null для индекса:", idx);
            return; 
        }
        const block = document.createElement('div');
        block.className = 'price-block';
        block.innerHTML = `
            <div class="price-title">${price.title}</div>
            <ul class="price-features-list">
                ${price.features.map(feature => `<li class="price-feature-item">${feature}</li>`).join('')}
            </ul>
            <div class="price-cost-wrap">
                <div class="price-cost-label">Стоимость</div>
                <div class="price-cost-value">${price.cost}</div>
            </div>
            <button class="signup-trial-button" data-training-type="Пробное занятие">Записаться на пробное занятие</button>
        `;
        pricesSlider.appendChild(block);
    }

    function openPricesModal(idx = 0) {
        currentPriceBlock = idx;
        renderPriceBlock(currentPriceBlock);
        modalPrices.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        // Добавляем обработчик для новой кнопки после рендера
        document.querySelectorAll('.signup-trial-button').forEach(button => {
            button.addEventListener('click', () => {
                window.location.href = 'https://infototalbodyonline.impulsecrm.ru/widget/360';
            });
        });
    }
    function closePricesModal() {
        modalPrices.style.display = 'none';
        document.body.style.overflow = '';
    }

    pricesPrev.addEventListener('click', () => {
        currentPriceBlock = (currentPriceBlock - 1 + prices.length) % prices.length;
        renderPriceBlock(currentPriceBlock);
    });
    pricesNext.addEventListener('click', () => {
        currentPriceBlock = (currentPriceBlock + 1) % prices.length;
        renderPriceBlock(currentPriceBlock);
    });
    modalPricesClose.addEventListener('click', closePricesModal);
    modalPricesBackdrop.addEventListener('click', closePricesModal);

    // Открытие по клику на кнопку "Наши цены"
    document.querySelectorAll('.group-29, .text-wrapper-42').forEach(el => {
        if (el.textContent.trim().toLowerCase().includes('наши цены')) {
            el.addEventListener('click', () => openPricesModal(0));
        }
    });

    // --- Модальное окно Видео ---
    const modalVideo = document.querySelector('.modal-video');
    const modalVideoBackdrop = document.querySelector('.modal-video__backdrop');
    const modalVideoClose = document.querySelector('.modal-video__close');
    const videoPlayer = document.querySelector('.video-player');

    function openVideoModal() {
        modalVideo.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        videoPlayer.play(); // Начать воспроизведение видео
    }

    function closeVideoModal() {
        modalVideo.style.display = 'none';
        document.body.style.overflow = '';
        videoPlayer.pause(); // Остановить воспроизведение видео
        videoPlayer.currentTime = 0; // Сбросить видео на начало
    }

    modalVideoClose.addEventListener('click', closeVideoModal);
    modalVideoBackdrop.addEventListener('click', closeVideoModal);

    // Открытие по клику на кнопку "Видео"
    document.querySelectorAll('.group-30, .group-30 .text-wrapper-42').forEach(el => {
        if (el.textContent.trim().toLowerCase().includes('видео')) {
            el.addEventListener('click', openVideoModal);
        }
    });

    // --- Модальное окно FAQ ---
    const modalFaq = document.querySelector('.modal-faq');
    const modalFaqBackdrop = document.querySelector('.modal-faq__backdrop');
    const modalFaqClose = document.querySelector('.modal-faq__close');
    const faqQuestions = document.querySelectorAll('.faq-question');

    function openFaqModal() {
        modalFaq.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeFaqModal() {
        modalFaq.style.display = 'none';
        document.body.style.overflow = '';
        // Скрываем все ответы при закрытии модала
        faqQuestions.forEach(question => {
            question.parentElement.classList.remove('active');
        });
    }

    modalFaqClose.addEventListener('click', closeFaqModal);
    modalFaqBackdrop.addEventListener('click', closeFaqModal);

    // Открытие по клику на кнопку "FAQ"
    document.querySelectorAll('.group-27, .group-27 .text-wrapper-42').forEach(el => {
        if (el.textContent.trim().toLowerCase().includes('faq')) {
            el.addEventListener('click', openFaqModal);
        }
    });

    // Логика аккордеона для FAQ
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement; // faq-item
            faqItem.classList.toggle('active');
        });
    });

    // Обработка ссылок внутри FAQ-ответов через tg.openLink
    const modalFaqContent = document.querySelector('.modal-faq__content');
    modalFaqContent.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && e.target.closest('.faq-answer')) {
            e.preventDefault();
            tg.openLink(e.target.href);
        }
    });

    // --- Модальное окно Как нас найти ---
    const modalHowToFind = document.querySelector('.modal-how-to-find');
    const modalHowToFindBackdrop = document.querySelector('.modal-how-to-find__backdrop');
    const modalHowToFindClose = document.querySelector('.modal-how-to-find__close');
    const howToFindVideo = document.querySelector('.how-to-find-video');
    const howToFindImage = document.querySelector('.how-to-find-image');

    // Новые переменные для слайдера "Как нас найти"
    const howToFindSlider = document.querySelector('.how-to-find-slider');
    const howToFindSlides = document.querySelectorAll('.how-to-find-slide');
    const howToFindPrevButton = document.querySelector('.how-to-find-prev');
    const howToFindNextButton = document.querySelector('.how-to-find-next');
    let currentHowToFindSlide = 0;

    function renderHowToFindSlide(idx) {
        howToFindSlides.forEach((slide, i) => {
            if (i === idx) {
                slide.classList.add('active');
                if (slide.querySelector('video')) {
                    // Если это слайд с видео, убедимся, что оно на паузе (пользователь сам решит воспроизводить)
                    slide.querySelector('video').pause();
                    slide.querySelector('video').currentTime = 0;
                }
            } else {
                slide.classList.remove('active');
                if (slide.querySelector('video')) {
                    // Останавливаем видео, если слайд неактивен
                    slide.querySelector('video').pause();
                    slide.querySelector('video').currentTime = 0;
                }
            }
        });
    }

    function moveHowToFindSlide(direction) {
        currentHowToFindSlide = (currentHowToFindSlide + direction + howToFindSlides.length) % howToFindSlides.length;
        renderHowToFindSlide(currentHowToFindSlide);
    }

    function openHowToFindModal() {
        modalHowToFind.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        renderHowToFindSlide(currentHowToFindSlide); // Отображаем первый слайд при открытии
        // if (howToFindVideo) howToFindVideo.play(); // Начать воспроизведение видео
    }

    function closeHowToFindModal() {
        modalHowToFind.style.display = 'none';
        document.body.style.overflow = '';
        if (howToFindVideo) {
            howToFindVideo.pause(); // Остановить воспроизведение видео
            howToFindVideo.currentTime = 0; // Сбросить видео на начало
        }
    }

    modalHowToFindClose.addEventListener('click', closeHowToFindModal);
    modalHowToFindBackdrop.addEventListener('click', closeHowToFindModal);

    // Добавляем обработчики для стрелок слайдера
    howToFindPrevButton.addEventListener('click', () => moveHowToFindSlide(-1));
    howToFindNextButton.addEventListener('click', () => moveHowToFindSlide(1));

    // Открытие по клику на кнопку "Как нас найти?"
    document.querySelectorAll('.group-28, .group-28 .text-wrapper-42').forEach(el => {
        if (el.textContent.trim().toLowerCase().includes('как нас найти')) {
            el.addEventListener('click', openHowToFindModal);
        }
    });

    // Открытие по клику на кнопку "Мобильное приложение"
    document.querySelectorAll('.group-32, .group-32 .text-wrapper-46').forEach(el => {
        if (el.textContent.trim().toLowerCase().includes('мобильное приложение')) {
            el.addEventListener('click', () => {
                tg.openLink('https://tech.impulsecrm.ru/static/mobile?name=totalbody');
            });
        }
    });

    // Открытие по клику на кнопку "Скачать приложение"
    document.querySelectorAll('.rectangle-4, .text-wrapper-31').forEach(el => {
        if (el.textContent.trim().toLowerCase().includes('скачать приложение')) {
            el.addEventListener('click', () => {
                tg.openLink('https://tech.impulsecrm.ru/static/mobile?name=totalbody');
            });
        }
    });

    // Открытие по клику на кнопку "Мы в Telegram"
    document.querySelectorAll('.overlap-8').forEach(el => {
        el.addEventListener('click', () => {
            tg.openLink('https://t.me/totalbody_love');
        });
    });

    // Открытие по клику на кнопку "Мы в Вконтакте"
    document.querySelectorAll('.overlap-9').forEach(el => {
        el.addEventListener('click', () => {
            tg.openLink('https://vk.com/totalbody');
        });
    });
});

// Обработчик нажатия на кнопку "Записаться"
function handleSignup(event) {
    const button = event.target;
    let trainingType = 'Общая запись'; // Значение по умолчанию

    // Если кнопка имеет атрибут data-training-type, используем его значение
    if (button.dataset.trainingType) {
        trainingType = button.dataset.trainingType;
    } else {
        // Проверяем, является ли кнопка из секции "Пробное занятие" (старый способ)
    const trialSessionButton = button.closest('.overlap-wrapper .overlap-3');
    const trialSessionButton2 = button.closest('.div-wrapper');
    
    if (trialSessionButton || trialSessionButton2) {
        trainingType = 'Общая запись';
    } else {
            // Иначе, пытаемся найти заголовок тренировки
        let parent = button.parentElement;
        while (parent) {
            const titleElement = parent.querySelector('.text-wrapper-7, .text-wrapper-34, .text-wrapper-39, .text-wrapper-47');
            if (titleElement && titleElement.textContent.trim() !== '') {
                trainingType = titleElement.textContent.trim();
                break;
            }
            parent = parent.parentElement;
            }
        }
    }

    // Отправляем данные в Telegram
    tg.sendData(JSON.stringify({
        action: 'signup',
        trainingType: trainingType
    }));
}

// Обработчик нажатия на социальные сети
function handleSocialClick(event) {
    const button = event.target;
    let url = '';
    
    // Проверяем все возможные классы для Telegram
    if (button.classList.contains('logos-telegram') || 
        button.classList.contains('logos-telegram-2') || 
        button.classList.contains('logos-telegram-3') || 
        button.classList.contains('logos-telegram-5')) {
        url = 'https://t.me/totalbody_love';
    } 
    // Проверяем все возможные классы для WhatsApp
    else if (button.classList.contains('logos-whatsapp-icon') || 
             button.classList.contains('logos-whatsapp-icon-2') || 
             button.classList.contains('logos-whatsapp-icon-3') || 
             button.classList.contains('logos-whatsapp-icon-4')) {
        url = 'https://wa.me/79522559000';
    } 
    // Проверяем ВКонтакте (иконка или текст)
    else if (button.classList.contains('vector-11') || 
             button.closest('.overlap-9')) {
        url = 'https://vk.com/totalbody';
    }
    
    if (url) {
        tg.openLink(url);
    }
}

// Обработчик для геолокации
document.querySelectorAll('a[href^="geo:"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const [lat, lon] = e.target.href.replace('geo:', '').split(',');
        tg.openLink(`https://www.google.com/maps/search/?api=1&query=${lat},${lon}`);
    });
}); 