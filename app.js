const menuData = [
    {
        id: "c1",
        title: "Perla Kolleksiyon",
        imageUrl: "assets/img/PERLA.png",
        subItems: [
            { id: "s1_1", title: "Yaşam Odası", imageUrl: "assets/img/PERLA_YasamOdasi.png", videoUrl: "assets/video/perla-yasam.mp4" },
            { id: "s1_2", title: "Yatak Odası", imageUrl: "assets/img/PERLA_YatakOdasi.png", videoUrl: "assets/video/perla-yatak.mp4" }
        ]
    },
    {
        id: "c2",
        title: "Savia Kolleksiyon",
        imageUrl: "assets/img/SAVIA.png",
        subItems: [
            { id: "s2_1", title: "Yaşam Odası", imageUrl: "assets/img/SAVIA_YasamOdasi.png", videoUrl: "assets/video/savia-yasam.mp4" },
            { id: "s2_2", title: "Yatak Odası", imageUrl: "assets/img/SAVIA_YatakOdasi.png", videoUrl: "assets/video/savia-yatak.mp4" }
        ]
    },
    {
        id: "c3",
        title: "Alven Kolleksiyon",
        imageUrl: "assets/img/ALVEN.png",
        subItems: [
            { id: "s3_1", title: "Yaşam Odası", imageUrl: "assets/img/ALVEN_YasamOdasi.png", videoUrl: "assets/video/alven-yasam.mp4" },
            { id: "s3_2", title: "Yatak Odası", imageUrl: "assets/img/ALVEN_YatakOdasi.png", videoUrl: "assets/video/alven-yatak.mp4" }
        ]
    },
    {
        id: "c4",
        title: "Noven Kolleksiyon",
        imageUrl: "assets/img/NOVEN.png",
        subItems: [
            { id: "s4_1", title: "Yaşam Odası", imageUrl: "assets/img/NOVEN_YasamOdasi.png", videoUrl: "assets/video/noven-yasam.mp4" },
            { id: "s4_2", title: "Yatak Odası", imageUrl: "assets/img/NOVEN_YatakOdasi.png", videoUrl: "assets/video/noven-yatak.mp4" }
        ]
    },
    {
        id: "c5",
        title: "Majesty Köşe Koltuk",
        imageUrl: "assets/img/MAJESTY.png",
        subItems: [
            { id: "s5_1", title: "Ürün İncelemesi", imageUrl: "assets/img/MAJESTY.png", videoUrl: "assets/video/majesty-video.mp4" }
        ]
    }
];

var states = {
    currentView: "landing",
    idleTimer: null,
    activeCollectionId: null,
};


const IDLE_LIMIT = 5 * 60 * 1000;

function resetIdleTimer() {
    clearTimeout(states.idleTimer);
    if (states.currentView !== 'landing') {
        states.idleTimer = setTimeout(() => {
            transitionTo(renderLandingPage);
        }, IDLE_LIMIT);
    }
}

['mousedown', 'mousemove', 'keypress', 'touchstart', 'scroll'].forEach(event => {
    window.addEventListener(event, resetIdleTimer, false);
});

window.addEventListener('beforeunload', () => {
    sessionStorage.clear();
});


function setActiveView(viewName) {
    document.body.removeAttribute("data-active-view");
    document.body.setAttribute("data-active-view", viewName);
}

function hideGoHomeButton() {
    document.querySelector("#go-home-button").style.display = "none";
}

function showGoHomeButton() {
    document.querySelector("#go-home-button").style.display = "flex";
}

function hideGoBackButton() {
    document.querySelector("#go-back-button").style.display = "none";
}

function showGoBackButton() {
    document.querySelector("#go-back-button").style.display = "flex";
}

function clearPage() {
    document.querySelector("#page-content").innerHTML = "";
}


function transitionTo(renderFunction, param = null) {
    document.body.classList.add('fade-out');
    setTimeout(() => {
        param ? renderFunction(param) : renderFunction();
        document.body.classList.remove('fade-out');
        resetIdleTimer();
    }, 300);
}


function renderLandingPage() {
    states.currentView = "landing";
    states.activeCollectionId = null;
    clearPage();
    setActiveView("landing");
    hideGoHomeButton();
    hideGoBackButton();

    const pageContent = document.querySelector("#page-content");

    const landing = document.createElement('div');
    landing.id = 'start-cta';
    landing.className = 'cta';
    landing.innerHTML = `
        <div class="cta-row">
            <span>Yeni Koleksiyonları Keşfetmek İçin Tıklayın</span>
            <svg class="cta-cursor" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 4L8 32L16 24L20 36L24 34L20 22L30 22Z" fill="#1a1a1a" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"></path>
            </svg>
        </div>
        <div class="cta-click">
            <div class="click-wrap">
                <div class="click-ring"></div>
                <div class="click-ring"></div>
                <div class="click-ring"></div>
                <div class="click-dot"></div>
            </div>
        </div>
    `;
    landing.addEventListener('click', () => transitionTo(renderMainMenuPage));

    pageContent.appendChild(landing);
}


function renderMainMenuPage() {
    states.currentView = "main";
    states.activeCollectionId = null;
    clearPage();
    setActiveView("main");
    showGoHomeButton();
    hideGoBackButton();

    const pageContent = document.querySelector("#page-content");

    const container = document.createElement('div');
    container.className = 'main-gallery-container';

    menuData.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <div class="gallery-item-image-wrapper">
                <img src="${item.imageUrl}" alt="${item.title}">
            </div>
            <div class="gallery-item-text">${item.title}</div>
        `;
        galleryItem.addEventListener('click', () => {
            transitionTo(renderSubMenuPage, item);
        });
        container.appendChild(galleryItem);
    });

    pageContent.appendChild(container);
}

function renderSubMenuPage(collectionItem) {
    states.currentView = "secondary";
    states.activeCollectionId = collectionItem.id;
    clearPage();
    setActiveView("secondary");
    showGoHomeButton();
    showGoBackButton();

    const pageContent = document.querySelector("#page-content");

    const container = document.createElement('div');
    container.className = 'secondary-gallery-container';

    collectionItem.subItems.forEach((subItem) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <div class="gallery-item-image-wrapper">
                <img src="${subItem.imageUrl}" alt="${subItem.title}">
            </div>
            <div class="gallery-item-text">${subItem.title}</div>
        `;
        galleryItem.addEventListener('click', () => {
            renderVideo(subItem.videoUrl);
        });
        container.appendChild(galleryItem);
    });

    pageContent.appendChild(container);
}

function renderVideo(videoUrl) {
    const previousView = states.currentView;
    states.currentView = 'video';

    const overlay = document.createElement('div');
    overlay.className = 'video-overlay';
    overlay.id = 'video-popup';

    overlay.innerHTML = `
        <div class="video-wrapper">
            <div class="close-video">Kapat</div>
            <video class="main-video" controls autoplay>
                <source src="${videoUrl}" type="video/mp4">
                Tarayıcınız video oynatmayı desteklemiyor.
            </video>
        </div>
    `;

    document.body.appendChild(overlay);

    const closePopup = () => {
        overlay.remove();
        states.currentView = previousView;
        resetIdleTimer();
    };

    overlay.querySelector('.close-video').addEventListener('click', closePopup);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closePopup();
    });
}


document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#go-home-button").addEventListener('click', () => {
        transitionTo(renderLandingPage);
    });

    document.querySelector("#go-back-button").addEventListener('click', () => {
        if (states.currentView === 'secondary') {
            transitionTo(renderMainMenuPage);
        } else if (states.currentView === 'main') {
            transitionTo(renderLandingPage);
        }
    });

    renderLandingPage();
});