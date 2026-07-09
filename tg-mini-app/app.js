// Инициализация Telegram WebApp
const tg = window.Telegram?.WebApp || {
    expand() {},
    enableClosingConfirmation() {},
    openLink(url) {
        window.open(url, '_blank', 'noopener');
    },
    sendData() {},
};

const runtimeParams = new URLSearchParams(window.location.search);

function normalizeTelegramUrl(value) {
    if (!value) return '';
    const trimmed = value.trim();
    if (/^(https?:|tg:)/i.test(trimmed)) return trimmed;
    return `https://t.me/${trimmed.replace(/^@/, '')}`;
}

const PUBLIC_LINKS = {
    signup: normalizeTelegramUrl(runtimeParams.get('signup') || runtimeParams.get('bot')) || 'https://t.me/your_totalbody_bot',
    mobileApp: 'https://example.com/mobile-app',
    whatsappVernadskogo: 'https://example.com/contact/vernadskogo',
    whatsappKommunarka: 'https://example.com/contact/kommunarka',
    whatsappVershinina: 'https://example.com/contact/vershinina',
    telegramMain: 'https://t.me/total_body',
    telegramVernadskogo: 'https://t.me/total_body_ver',
    telegramVershinina: 'https://t.me/totalbody_vershinina',
    vkVernadskogo: 'https://vk.ru/total_body_msk_vernadskogo',
};

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
            avatar: "https://res.cloudinary.com/dd58ooqcc/image/upload/v1749830140/portrait-young-woman-with-natural-make-up_23-2149084942-round_5_lausb7.png",
        },
        {
            name: "Екатерина",
            text: "Профессиональные тренеры, индивидуальный подход. Результат заметен уже через месяц.",
            rating: 4.8,
            avatar: "https://res.cloudinary.com/dd58ooqcc/image/upload/v1749830163/smailik-zensina-na-otkrytom-vozduhe-v-gorode-round_1_h8a4pn.png",
        },
        {
            name: "Виктория",
            text: "Очень уютная студия, современное оборудование, дружелюбная атмосфера.",
            rating: 5,
            avatar: "https://res.cloudinary.com/dd58ooqcc/image/upload/v1749830714/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA_%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0_2025-06-13_%D0%B2_10.03.14_PM-round_1_s0741y.png",
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
              ${[1,2,3,4,5].map(i => `<div class="star${i <= Math.round(centerReview.rating) ? '' : ' empty'}"><img class="star-2" src="https://res.cloudinary.com/dj05yedo3/image/upload/v1749661527/vu4h4ap3fotdxhmjp8v7.svg" /></div>`).join('')}
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
        'https://res.cloudinary.com/dj05yedo3/image/upload/v1749661524/il2dh1blgpufyjgtkfb7.png',
        'https://res.cloudinary.com/dd58ooqcc/image/upload/v1750350166/dzELTswTHt8_2_ksxo7k.jpg',
        'https://res.cloudinary.com/dd58ooqcc/image/upload/v1750350461/%D0%B2%D0%B5%D0%B1_146_1_fsnfig.jpg',
        'https://res.cloudinary.com/dd58ooqcc/image/upload/v1750350461/%D0%B2%D0%B5%D0%B1_588_kngzzp.jpg',
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
            photo: 'https://res.cloudinary.com/dj05yedo3/image/upload/v1749661522/pe31i69z0iuvkzylmhdj.jpg',
            name: 'Анастасия Рустамова',
            desc: 'Анастасия — тренер с 6-летним опытом, кандидат в мастера спорта по синхронному фигурному катанию, многократная чемпионка России и Европы. С раннего детства в спорте — от фигурного катания и художественной гимнастики до сноуборда и вейксёрфа. Проводит персональные и групповые тренировки в мини-группах до 8 человек. Работает с подростками и взрослыми, создавая атмосферу поддержки, движения и заботы о теле. Вдохновляет личным примером: совмещает тренерство с нутрициологией, регулярно учится и планирует освоить массаж. Верит, что спорт помогает не только телу, но и уму — восстанавливает, заряжает и возвращает к себе. Любит путешествия, русскую музыку и всё, что связано с активной жизнью. На её тренировках — результат с душой.'
        },
        {
            photo: 'https://res.cloudinary.com/dj05yedo3/image/upload/v1749661522/qwvgbi9j2nkot8mljjta.jpg',
            name: 'Наталья Королёва',
            desc: 'Наталья пришла в фитнес в 2012 году как участница, а сегодня — сертифицированный тренер и кандидат биологических наук. Она совмещает научный подход с личным опытом, создавая осознанные и эффективные тренировки. Проводит занятия в мини-группах и больших залах, делая акцент не только на физический результат, но и на эмоциональное восстановление. Её путь — от полного подростка до профессионального тренера — вдохновляет тех, кто хочет меняться и чувствовать поддержку. Наталья продолжает развиваться, обучаясь новым методикам. Её занятия наполнены вниманием, заботой и энергией. Любит танцы, сайкл и прогулки — всё, что заряжает и помогает быть в ресурсе. Если тебе нужен тренер с душой и научным подходом — тебе к Наталье.'
        },
        {
            photo: 'https://res.cloudinary.com/dj05yedo3/image/upload/v1749661522/wpbwu4qdnlwwqvrohihw.jpg',
            name: 'Ирина Мозалева',
            desc: 'Ирина — сертифицированный инструктор хатха-йоги (YTTC-200, Федерация йоги России) с образованием МГУ (филология). Её занятия сочетают практику, философию и осознанность, балансируя физическую нагрузку и внутреннее спокойствие. С детства Ирина занималась балетом и фитнесом, но йога стала её путём к ментальной устойчивости. Более года она ведёт групповые и индивидуальные тренировки, включая гвоздестояние для глубокого расслабления и концентрации. Вне йоги Ирина читает, изучает французский и увлекается плаванием. Она создаёт вдохновляющее пространство, где каждый чувствует себя услышанным. Занятия с Ириной помогут обрести гармонию тела и разума, внутреннюю силу и устойчивость.'
        },
        
        {
            photo: 'https://res.cloudinary.com/dj05yedo3/image/upload/v1749661522/erdd8vlaigsm8bkzzesz.jpg',
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
        const slide = document.querySelector('.coach-slide');
        const photo = slide.querySelector('.coach-photo');
        const name = slide.querySelector('.coach-name');
        const desc = slide.querySelector('.coach-desc');
        const counter = slide.querySelector('.coach-counter');

        photo.src = coaches[idx].photo;
        photo.alt = coaches[idx].name;
        name.textContent = coaches[idx].name;
        desc.textContent = coaches[idx].desc;
        counter.textContent = `${idx + 1} / ${coaches.length}`;
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

    // Обработчики событий
    coachesClose.addEventListener('click', closeCoachesModal);
    modalBackdrop.addEventListener('click', closeCoachesModal);

    document.querySelector('.coaches-prev').addEventListener('click', () => {
        currentCoach = (currentCoach - 1 + coaches.length) % coaches.length;
        renderCoach(currentCoach);
    });

    document.querySelector('.coaches-next').addEventListener('click', () => {
        currentCoach = (currentCoach + 1) % coaches.length;
        renderCoach(currentCoach);
    });

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
            title: 'Пробное занятие',
            price: '500 ₽',
            description: 'На любое направление',
            features: []
        },
        {
            title: 'Абонемент «Лайт»',
            price: '9 600 ₽',
            description: '8 занятий',
            features: [
                'По 1 200 ₽ за занятие',
                'Действует 30 дней',
                'Заморозка 6 дней',
                '1 гостевой визит'
            ]
        },
        {
            title: 'Абонемент «Медиум»',
            price: '13 440 ₽',
            description: '12 занятий',
            features: [
                'По 1 120 ₽ за занятие',
                'Действует 45 дней',
                'Заморозка 6 дней',
                '2 гостевых визита'
            ]
        },
        {
            title: 'Абонемент «Хард»',
            price: '17 400 ₽',
            description: '16 занятий',
            features: [
                'По 1 088 ₽ за занятие',
                'Действует 60 дней',
                'Заморозка 9 дней',
                '2 гостевых визита'
            ]
        },
        {
            title: 'Абонемент «Хард ПРО»',
            price: '24 960 ₽',
            description: '24 занятия',
            features: [
                'По 1 040 ₽ за занятие',
                'Действует 90 дней',
                'Заморозка 15 дней',
                '3 гостевых визита'
            ]
        }
    ];

    const modalPrices = document.querySelector('.modal-prices');
    const modalPricesBackdrop = document.querySelector('.modal-prices__backdrop');
    const modalPricesClose = document.querySelector('.modal-prices__close');
    const pricesSlider = document.querySelector('.prices-slider');
    const pricesPrev = document.querySelector('.prices-prev');
    const pricesNext = document.querySelector('.prices-next');
    let currentPriceBlock = 0;

    function renderPrice(idx) {
        pricesSlider.innerHTML = ''; // Очищаем слайдер перед добавлением нового блока
        const price = prices[idx];
        const block = document.createElement('div');
        block.className = 'price-block';
        block.innerHTML = `
            <div class="price-title">${price.title}</div>
            <div class="price-description">${price.description}</div>
            <div class="price-cost-wrap">
                <div class="price-cost-value">${price.price}</div>
            </div>
            ${price.features.length > 0 ? `
                <div class="price-features">
                    ${price.features.map(feature => `
                        <div class="price-feature">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            ${feature}
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            <button class="signup-button" data-training-type="${price.title}">Записаться</button>
        `;
        pricesSlider.appendChild(block);
    }

    function openPricesModal(idx = 0) {
        currentPriceBlock = idx;
        renderPrice(currentPriceBlock);
        modalPrices.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    // Делегирование событий для signup-button
    pricesSlider.addEventListener('click', function(e) {
        if (e.target.classList.contains('signup-button')) {
            tg.openLink(PUBLIC_LINKS.signup);
        }
    });

    function closePricesModal() {
        modalPrices.style.display = 'none';
        document.body.style.overflow = '';
    }

    pricesPrev.addEventListener('click', () => {
        currentPriceBlock = (currentPriceBlock - 1 + prices.length) % prices.length;
        renderPrice(currentPriceBlock);
    });
    pricesNext.addEventListener('click', () => {
        currentPriceBlock = (currentPriceBlock + 1) % prices.length;
        renderPrice(currentPriceBlock);
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
                tg.openLink(PUBLIC_LINKS.mobileApp);
            });
        }
    });

    // Открытие по клику на кнопку "Скачать приложение"
    document.querySelectorAll('.rectangle-4, .text-wrapper-31').forEach(el => {
        if (el.textContent.trim().toLowerCase().includes('скачать приложение')) {
            el.addEventListener('click', () => {
                tg.openLink(PUBLIC_LINKS.mobileApp);
            });
        }
    });

    // Открытие по клику на кнопку "Мы в Telegram"
    document.querySelectorAll('.overlap-8').forEach(el => {
        el.addEventListener('click', () => {
            tg.openLink(PUBLIC_LINKS.telegramVernadskogo);
        });
    });

    // Открытие по клику на кнопку "Мы в Вконтакте"
    document.querySelectorAll('.overlap-9').forEach(el => {
        el.addEventListener('click', () => {
            tg.openLink(PUBLIC_LINKS.vkVernadskogo);
        });
    });

    // --- Модальное окно О нас ---
    const modalAbout = document.querySelector('.modal-about');
    const modalAboutBackdrop = document.querySelector('.modal-about__backdrop');
    const modalAboutClose = document.querySelector('.modal-about__close');

    function openAboutModal() {
        modalAbout.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeAboutModal() {
        modalAbout.style.display = 'none';
        document.body.style.overflow = '';
    }

    if (modalAboutClose) modalAboutClose.addEventListener('click', closeAboutModal);
    if (modalAboutBackdrop) modalAboutBackdrop.addEventListener('click', closeAboutModal);

    // Открытие по клику на кнопку "о нас"
    document.querySelectorAll('.text-wrapper-40').forEach(el => {
        if (el.textContent.trim().toLowerCase() === 'о нас') {
            el.addEventListener('click', openAboutModal);
        }
    });

    // --- Модальное окно подробной информации о тренировках ---
    const trainingInfoTexts = {
        stretching: `
          <h2>Растяжка</h2>
          <p><b>Растяжка</b> — это тренировка для гибкости, снятия напряжения и улучшения осанки. Она помогает вам чувствовать тело лёгким, снимает скованность и боли.</p>
          <h3>После 4–6 занятий вы заметите:</h3>
          <ul>
            <li>движения стали легче,</li>
            <li>спина не болит после работы,</li>
            <li>походка — уверенная и свободная.</li>
          </ul>
          <p>Это тренировка для всех, кто хочет заботиться о себе мягко и эффективно.</p>
          <h3>Мифы, которые мешают вам начать</h3>
          <b>1. "Растяжка — это только для гибких."</b>
          <p>Нет. Растяжка создана для тех, кто не может дотянуться до носков. Прогресс заметен уже через 2–3 занятия: тело становится податливее, движения — свободнее.</p>
          <b>2. "Растяжка — это боль."</b>
          <p>Боль — это ошибка, а не норма. Растяжка с заботой — мягкая и комфортная. Мы слушаем тело и не торопимся, чтобы вы наслаждались процессом.</p>
          <b>3. "Растяжка не даёт результатов."</b>
          <p>Это миф. После 6 занятий вы почувствуете лёгкость в спине, улучшение осанки и свободу в движениях. Клиенты отмечают: на 35% реже болит поясница, на 40% меньше напряжения в шее.</p>
          <h3>Боли, которые решает растяжка</h3>
          <ul>
            <li><b>Боль в спине и шее.</b> Растяжка снимает зажимы, расслабляет мышцы и возвращает спине лёгкость.</li>
            <li><b>Скованность в теле.</b> После 3 занятий движения станут свободнее.</li>
            <li><b>Усталость, упадок сил.</b> Растяжка улучшает кровообращение и насыщает мышцы кислородом.</li>
          </ul>
          <h3>Для кого подходит?</h3>
          <ul>
            <li>Вы много сидите.</li>
            <li>Вы недавно стали мамой.</li>
            <li>Вы занимаетесь спортом.</li>
            <li>Вы хотите улучшить осанку.</li>
            <li>Вы хотите почувствовать себя лучше.</li>
          </ul>
          <h3>Преимущества растяжки</h3>
          <ul>
            <li>Результат через 4–6 занятий.</li>
            <li>Снижение стресса.</li>
            <li>Укрепление осанки.</li>
            <li>Энергия и бодрость.</li>
          </ul>
          <p>Дайте телу то, что оно просит. Растяжка — это не про сложность. Это про заботу.</p>
        `,
        aerial: `
          <h2>Аэройога</h2>
          <p><b>Аэройога</b> — это занятие, где вы выполняете упражнения в подвесном гамаке. Гамак поддерживает тело, снимает нагрузку с позвоночника и суставов, помогая выполнять движения, которые раньше казались невозможными. Это не просто тренировка — это гармония тела и души, где гибкость, сила и расслабление работают вместе.</p>
          <h3>Мифы, которые мешают вам попробовать</h3>
          <b>1. "Это только для гибких и спортивных."</b>
          <p>Нет. Аэройога подходит для всех, независимо от уровня подготовки. Гамак поддерживает вас, делая растяжку и упражнения доступными даже для тех, кто никогда не занимался фитнесом.</p>
          <b>2. "Я слишком тяжёлая для гамака."</b>
          <p>Гамаки выдерживают вес до 150 кг и созданы для безопасной нагрузки. Вы можете быть уверены в их надёжности.</p>
          <b>3. "Это просто красивые позы для фото."</b>
          <p>Эстетика — приятный бонус. Но аэройога укрепляет мышцы кора, улучшает осанку, снимает боли в спине и помогает расслабиться. Это полноценная тренировка, а не шоу.</p>
          <h3>Боли, которые решает аэройога</h3>
          <ul>
            <li><b>Боли в спине и суставах.</b> Гамак разгружает позвоночник, мягко вытягивает его, снимает напряжение и зажимы. Если у вас сидячая работа, аэройога может стать спасением.</li>
            <li><b>Постоянная усталость и стресс.</b> Мягкие перевёрнутые позы помогают расслабить нервную систему, а движения в гамаке стимулируют кровообращение, возвращая вам энергию.</li>
            <li><b>Скованность и отсутствие гибкости.</b> Гамак поможет мягко растянуть мышцы, увеличивая подвижность без боли.</li>
          </ul>
          <h3>Для кого подходит?</h3>
          <ul>
            <li>Вы проводите много времени за компьютером.</li>
            <li>Вы хотите вернуть себе гибкость.</li>
            <li>Вы устали от стресса и напряжения.</li>
            <li>Вы хотите сделать своё тело сильным и подтянутым.</li>
            <li>Вы ищете что-то новое.</li>
          </ul>
          <h3>Преимущества аэройоги</h3>
          <ul>
            <li>Разгружает позвоночник.</li>
            <li>Укрепляет мышцы.</li>
            <li>Развивает гибкость.</li>
            <li>Снимает стресс.</li>
            <li>Делает занятия доступными.</li>
          </ul>
          <p>Дайте себе шанс почувствовать лёгкость. Аэройога — это про заботу. Про то, как вернуть телу гибкость, мышцам силу, а себе — радость.</p>
        `,
        pilates: `
          <h2>Пилатес</h2>
          <p><b>Пилатес</b> — это система упражнений, которая укрепляет глубокие мышцы, улучшает осанку и помогает восстановить баланс тела. Он фокусируется на плавных, контролируемых движениях, которые задействуют мышцы кора, спины и таза. После 6–8 занятий вы заметите, как тело становится сильнее, движения — лёгкими, а осанка — ровной.</p>
          <h3>Мифы, которые мешают вам попробовать</h3>
          <b>1. "Пилатес — это не для меня, у меня плохая растяжка."</b>
          <p>Пилатес не требует гибкости. Это тренировка для укрепления мышц и работы над подвижностью. Даже если вы начинаете с нуля, упражнения адаптируются под ваш уровень.</p>
          <b>2. "Это слишком легко, результата не будет."</b>
          <p>Это заблуждение. Пилатес прорабатывает глубокие мышцы, которые часто остаются без внимания. Клиенты отмечают улучшение осанки и снижение боли уже через 3–4 занятия.</p>
          <b>3. "Пилатес подходит только для молодых и стройных."</b>
          <p>Нет возрастных или физических ограничений. Пилатес подходит всем, кто хочет укрепить тело и сохранить здоровье суставов.</p>
          <h3>Боли, которые решает пилатес</h3>
          <ul>
            <li><b>Боли в спине и шее.</b> Пилатес разгружает позвоночник, укрепляет мышцы спины и помогает избавиться от дискомфорта.</li>
            <li><b>Усталость и чувство тяжести в теле.</b> Упражнения на глубокие мышцы помогают улучшить кровообращение, снять напряжение и вернуть лёгкость в движениях.</li>
            <li><b>Слабость мышц после беременности или травм.</b> Пилатес мягко восстанавливает мышцы кора, таза и спины, помогая вернуть силу без риска перегрузок.</li>
          </ul>
          <h3>Для кого подходит пилатес?</h3>
          <ul>
            <li>Для женщин с сидячей работой.</li>
            <li>Для мам, восстанавливающихся после родов.</li>
            <li>Для тех, кто хочет снизить боль в спине.</li>
            <li>Для женщин, которые хотят чувствовать себя легче.</li>
            <li>Для тех, кто ищет безопасную тренировку.</li>
          </ul>
          <h3>Преимущества пилатеса</h3>
          <ul>
            <li>Улучшение осанки.</li>
            <li>Укрепление глубоких мышц.</li>
            <li>Снижение боли.</li>
            <li>Развитие гибкости.</li>
            <li>Повышение энергии.</li>
          </ul>
          <p>Дайте своему телу новую жизнь. Пилатес — это больше, чем тренировка. Это время для себя, для укрепления тела и возвращения лёгкости в каждый шаг.</p>
        `,
        strip: `
          <h2>Strip Plastic</h2>
          <p><b>Strip Plastic</b> — это танцевальная тренировка, которая помогает раскрыть женственность, улучшить пластичность тела и повысить уверенность в себе. Вы учитесь красивым, плавным движениям, которые подчёркивают вашу уникальность.</p>
          <h3>Мифы, которые мешают вам начать</h3>
          <b>1. "Это что-то вульгарное."</b>
          <p>Нет. Strip Plastic — это про эстетику и женственность. На занятиях нет ничего откровенного. Это искусство движения, которое помогает вам чувствовать себя красивой и уверенной.</p>
          <b>2. "Я не умею танцевать."</b>
          <p>Для занятий не нужна танцевальная подготовка. Strip Plastic подходит для всех — мы начинаем с базовых движений, которые легко освоить.</p>
          <b>3. "Я не в форме для таких тренировок."</b>
          <p>Наоборот, Strip Plastic помогает улучшить форму! За одно занятие можно сжечь до 400 калорий, при этом тренировка остаётся мягкой и безопасной для суставов.</p>
          <h3>Боли, которые решает Strip Plastic</h3>
          <ul>
            <li><b>Низкая самооценка.</b> Занятия помогают полюбить своё тело и поверить в свою привлекательность. Вы учитесь двигаться красиво, а с этим приходит уверенность в себе.</li>
            <li><b>Скованность в теле.</b> Strip Plastic помогает снять напряжение, раскрепоститься и чувствовать себя свободнее.</li>
            <li><b>Рутинные тренировки.</b> Strip Plastic дарит новый взгляд на тренировки. Это не только про пользу для тела, но и про удовольствие.</li>
          </ul>
          <h3>Для кого подходит?</h3>
          <ul>
            <li>Для тех, кто хочет повысить уверенность в себе.</li>
            <li>Для тех, кто ищет новое увлечение.</li>
            <li>Для женщин, которые хотят вернуть гибкость.</li>
            <li>Для мам, ищущих время для себя.</li>
            <li>Для тех, кто хочет проработать тело.</li>
          </ul>
          <h3>Преимущества Strip Plastic</h3>
          <ul>
            <li>Укрепление мышц.</li>
            <li>Сжигание калорий.</li>
            <li>Улучшение гибкости.</li>
            <li>Психологическая перезагрузка.</li>
            <li>Развитие пластики.</li>
          </ul>
          <p>Это ваше время для себя. Strip Plastic — это не просто тренировка. Это момент, когда вы открываете свою женственность, учитесь любить себя и своё тело.</p>
        `,
        back: `
          <h2>Здоровая спина</h2>
          <p>"Здоровая спина" — это комплекс упражнений, направленный на укрепление мышц, поддерживающих позвоночник, улучшение осанки и снятие напряжения в спине. Тренировки сочетают мягкие силовые нагрузки, растяжку и упражнения на мобильность суставов.</p>
          <h3>Мифы, которые мешают вам начать</h3>
          <b>1. "Если болит спина, мне нужно больше отдыхать."</b>
          <p>Наоборот! Движение — это жизнь. Умеренная физическая активность укрепляет мышцы и улучшает кровообращение, помогая снять боль и предотвратить осложнения.</p>
          <b>2. "Мне нужны тяжелые тренировки, чтобы укрепить спину."</b>
          <p>Нет. "Здоровая спина" — это про мягкие, но эффективные упражнения. Главное — техника выполнения, а не вес.</p>
          <b>3. "Если у меня проблемы с позвоночником, тренировки противопоказаны."</b>
          <p>Большинство упражнений в программе адаптированы даже для людей с протрузиями, сколиозом и остеохондрозом. Главное — правильный подход и консультация специалиста перед началом занятий.</p>
          <h3>Проблемы, которые решает программа</h3>
          <ul>
            <li><b>Боли в пояснице, шее и между лопатками.</b> Упражнения снимают напряжение, укрепляют мышцы и восстанавливают баланс тела.</li>
            <li><b>Нарушение осанки.</b> Занятия помогают вернуть спине естественное положение и сделать осанку красивой.</li>
            <li><b>Ограниченная подвижность и скованность.</b> "Здоровая спина" развивает гибкость и подвижность позвоночника, улучшая амплитуду движений и избавляя от дискомфорта.</li>
          </ul>
          <h3>Для кого подходит программа?</h3>
          <ul>
            <li>Для офисных сотрудников.</li>
            <li>Для людей с сидячим образом жизни.</li>
            <li>Для тех, кто испытывает боли в спине.</li>
            <li>Для спортсменов и активных людей.</li>
            <li>Для тех, кто заботится о здоровье.</li>
          </ul>
          <h3>Преимущества тренировок</h3>
          <ul>
            <li>Укрепление глубоких мышц.</li>
            <li>Снятие болей и напряжения.</li>
            <li>Улучшение гибкости.</li>
            <li>Повышение выносливости.</li>
            <li>Профилактика проблем с позвоночником.</li>
          </ul>
        `,
        hatha: `
          <h2>Хатха-йога</h2>
          <p><b>Хатха-йога</b> — это практика для тела и ума. Через мягкие асаны (позы), дыхание и внимание к себе вы учитесь слушать своё тело, отпускать напряжение и восстанавливаться. Уже после 3–5 занятий вы почувствуете: тело стало гибче и сильнее, ум — спокойнее, сон — крепче и глубже.</p>
          <h3>Мифы, которые мешают вам начать</h3>
          <b>1. "Йога — это сложно и непонятно."</b>
          <p>Нет. Хатха-йога — это простые и доступные практики. Мы двигаемся медленно, осознанно и подбираем темп под каждого. Даже новичкам комфортно с первого занятия.</p>
          <b>2. "Надо быть гибким, чтобы заниматься."</b>
          <p>Наоборот — вы приходите, чтобы гибкость появилась. С каждым занятием тело раскрепощается, напряжение уходит, а движения становятся естественными.</p>
          <b>3. "Йога — это не про физику, только медитации."</b>
          <p>Хатха-йога работает и с телом, и с умом. Асаны укрепляют мышцы, выравнивают осанку, а дыхание и концентрация снижают уровень стресса и тревоги.</p>
          <h3>Какие состояния помогает улучшить хатха-йога</h3>
          <ul>
            <li><b>Постоянное напряжение и стресс.</b> Йога — это отдых для нервной системы. Через дыхание и мягкие движения вы снимаете зажимы и чувствуете спокойствие внутри.</li>
            <li><b>Бессонница и усталость.</b> Практика помогает наладить режим, улучшить качество сна, наполняет энергией и бодростью.</li>
            <li><b>Боли в спине и слабость в теле.</b> Асаны укрепляют мышцы спины, живота, ног, устраняют скованность и возвращают подвижность.</li>
          </ul>
          <h3>Кому подойдёт хатха-йога?</h3>
          <ul>
            <li>Тем, кто устал от суеты.</li>
            <li>Тем, кто хочет улучшить здоровье.</li>
            <li>Тем, кто много работает за компьютером.</li>
            <li>Тем, кто ищет баланс.</li>
          </ul>
          <h3>Преимущества хатха-йоги</h3>
          <ul>
            <li>Результат уже после 3–5 занятий.</li>
            <li>Улучшение гибкости, силы и координации.</li>
            <li>Снижение тревожности и усталости.</li>
            <li>Качественный сон и эмоциональная устойчивость.</li>
            <li>Осанка, дыхание и настроение — становятся лучше.</li>
          </ul>
        `,
        aerobics: `
          <h2>Фитнес-аэробика</h2>
          <p><b>Фитнес-аэробика</b> — это тренировка, где сочетаются динамичные движения под музыку, кардио-нагрузка и работа над координацией. Это идеальный способ сжечь калории, укрепить сердце и зарядиться позитивом.</p>
          <h3>Уже после 3–4 занятий вы заметите:</h3>
          <ul>
            <li>больше энергии в течение дня,</li>
            <li>меньше одышки при подъёме по лестнице,</li>
            <li>улучшение координации и выносливости.</li>
          </ul>
          <h3>Мифы, которые мешают вам начать</h3>
          <b>"Это только для тех, кто в отличной форме."</b>
          <p>Наоборот. Фитнес-аэробика — старт для тех, кто только начинает. Уровень нагрузки регулируется, вы двигаетесь в своём темпе.</p>
          <b>"Я не умею танцевать".</b>
          <p>Это не танцы. Это простые, повторяющиеся движения под ритмичную музыку. Координация развивается постепенно — и уже через пару занятий вы почувствуете уверенность.</p>
          <b>"Фитнес-аэробика неэффективна."</b>
          <p>Это миф. 45 минут активной аэробики сжигают до 500 ккал, улучшают работу сердца и лёгких, ускоряют обмен веществ. Это научно доказанный способ укрепить здоровье.</p>
          <h3>Что даёт фитнес-аэробика?</h3>
          <ul>
            <li>Здоровое сердце и лёгкие.</li>
            <li>Улучшение настроения.</li>
            <li>Формирование красивого тела.</li>
          </ul>
          <h3>Для кого подходит?</h3>
          <ul>
            <li>Вы не любите скучные тренажёры.</li>
            <li>Вы хотите похудеть.</li>
            <li>У вас сидячая работа.</li>
            <li>Вы давно не занимались спортом.</li>
          </ul>
          <h3>Почему стоит начать?</h3>
          <ul>
            <li>После 2–3 недель регулярных занятий вы почувствуете прилив сил, бодрость и улучшение сна.</li>
            <li>Фитнес-аэробика улучшает обмен веществ на 20–25%, помогая справляться с хронической усталостью и лишним весом.</li>
            <li>Это тренировка, которая дарит радость движения и уверенность в теле.</li>
          </ul>
        `
    };

    const modalTrainingInfo = document.querySelector('.modal-training-info');
    const modalTrainingInfoBackdrop = document.querySelector('.modal-training-info__backdrop');
    const modalTrainingInfoClose = document.querySelector('.modal-training-info__close');
    const modalTrainingInfoBody = document.querySelector('.modal-training-info__body');

    // Открытие модалки по клику на любую кнопку 'Подробнее'
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('more-info-btn')) {
            const type = e.target.getAttribute('data-type');
            if (trainingInfoTexts[type]) {
                modalTrainingInfoBody.innerHTML = trainingInfoTexts[type];
                modalTrainingInfo.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        }
    });

    function closeTrainingInfoModal() {
        modalTrainingInfo.style.display = 'none';
        document.body.style.overflow = '';
        modalTrainingInfoBody.innerHTML = '';
    }
    if (modalTrainingInfoClose) modalTrainingInfoClose.addEventListener('click', closeTrainingInfoModal);
    if (modalTrainingInfoBackdrop) modalTrainingInfoBackdrop.addEventListener('click', closeTrainingInfoModal);
});

// Обработчик нажатия на кнопку "Записаться"
function handleSignup(event) {
    const button = event.target;
    let trainingType = 'Общая запись'; // Значение по умолчанию

    // Если кнопка имеет атрибут data-training-type, используем его значение
    if (button.dataset.trainingType) {
        trainingType = button.dataset.trainingType;
    } else {
        // Проверяем, является ли кнопка из секции "Пробное занятие"
        const trialSessionButton = button.closest('.overlap-wrapper .overlap-3');
        const trialSessionButton2 = button.closest('.div-wrapper');
        
        if (trialSessionButton || trialSessionButton2) {
            trainingType = 'Пробное занятие';
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

    // Формируем сообщение для Telegram
    const message = encodeURIComponent(`Здравствуйте! Я хочу записаться на: ${trainingType}`);

    // Открываем публичный demo-link бота для записи
    tg.openLink(PUBLIC_LINKS.signup);

    // Отправляем данные в Telegram для аналитики
    tg.sendData(JSON.stringify({
        action: 'signup',
        trainingType: trainingType,
        timestamp: new Date().toISOString()
    }));
}

// Обработчик нажатия на социальные сети
function handleSocialClick(event) {
    const button = event.target;
    let url = '';
    
    // Проверяем все возможные классы для Telegram
    if (button.classList.contains('logos-telegram-2') || 
        button.classList.contains('logos-telegram-5')) {
        url = PUBLIC_LINKS.signup;
    } 
    else if (button.classList.contains('logos-telegram') || 
            button.classList.contains('logos-telegram')) {
        url = PUBLIC_LINKS.telegramMain;
    } 
    else if (button.classList.contains('logos-telegram-3') || 
            button.classList.contains('logos-telegram-3')) {
        url = PUBLIC_LINKS.telegramVershinina;
        } 
    // Проверяем все возможные классы для WhatsApp
    else if (button.classList.contains('logos-whatsapp-icon-2') || 
             button.classList.contains('logos-whatsapp-icon-4')) {
        url = PUBLIC_LINKS.whatsappKommunarka;
    } 
    else if (button.classList.contains('logos-whatsapp-icon')) {
        url = PUBLIC_LINKS.whatsappVernadskogo;
    } 
    else if (button.classList.contains('logos-whatsapp-icon-3')) {
        url = PUBLIC_LINKS.whatsappVershinina;
    } 
    
    // Проверяем ВКонтакте (иконка или текст)
    else if (button.classList.contains('vector-11') || 
             button.closest('.overlap-9')) {
        url = PUBLIC_LINKS.vkVernadskogo;
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
