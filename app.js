document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check local storage for theme
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        if(themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        });
    }

    // Live Search
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    if (searchInput && searchResults) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            searchResults.innerHTML = '';
            
            if (query.length > 0) {
                const results = comicsData.filter(comic => 
                    comic.title.toLowerCase().includes(query) || 
                    comic.author.toLowerCase().includes(query)
                ).slice(0, 5);

                if (results.length > 0) {
                    searchResults.classList.add('active');
                    results.forEach(comic => {
                        const item = document.createElement('a');
                        item.href = `comic.html?id=${comic.id}`;
                        item.className = 'search-result-item';
                        item.innerHTML = `
                            <img src="${comic.thumbnail}" alt="${comic.title}">
                            <div>
                                <span>${comic.title}</span><br>
                                <small style="color:var(--text-muted); font-size:0.75rem">${comic.author}</small>
                            </div>
                        `;
                        searchResults.appendChild(item);
                    });
                } else {
                    searchResults.classList.remove('active');
                }
            } else {
                searchResults.classList.remove('active');
            }
        });

        // Close search when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.remove('active');
            }
        });
    }

    // Render logic based on page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    if (currentPage === 'index.html' || currentPage === '') {
        initHomePage();
    } else if (currentPage === 'comic.html') {
        initComicPage();
    } else if (currentPage === 'reader.html') {
        initReaderPage();
    } else if (currentPage === 'profile.html') {
        initProfilePage();
    }
});

function createComicCard(comic) {
    return `
        <a href="comic.html?id=${comic.id}" class="comic-card fade-in">
            <img src="${comic.thumbnail}" alt="${comic.title}" class="comic-thumbnail loading" onload="this.classList.remove('loading')">
            <div class="comic-rating"><i class="fas fa-star"></i> ${comic.rating}</div>
            <div class="comic-info">
                <div class="comic-title">${comic.title}</div>
                <div class="comic-genre">${comic.genre.join(', ')}</div>
            </div>
        </a>
    `;
}

function initHomePage() {
    // Banner logic
    const track = document.getElementById('banner-track');
    const dotsContainer = document.getElementById('banner-dots');
    if (!track) return;

    // Use top 3 comics for banner
    const bannerComics = comicsData.slice(0, 3);
    
    bannerComics.forEach((comic, index) => {
        // Slide
        const slide = document.createElement('div');
        slide.className = 'banner-slide';
        slide.innerHTML = `
            <img src="${comic.cover}" alt="${comic.title}">
            <div class="banner-content">
                <h2>${comic.title}</h2>
                <p>${comic.description}</p>
                <a href="comic.html?id=${comic.id}" class="btn-primary">
                    <i class="fas fa-book-open"></i> Read Now
                </a>
            </div>
        `;
        track.appendChild(slide);

        // Dot
        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.dataset.index = index;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    let currentSlide = 0;
    function goToSlide(index) {
        currentSlide = index;
        track.style.transform = `translateX(-${index * 100}%)`;
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    setInterval(() => {
        let nextSlide = (currentSlide + 1) % bannerComics.length;
        goToSlide(nextSlide);
    }, 5000);

    // Populate sections
    const trendingList = document.getElementById('trending-list');
    const popularList = document.getElementById('popular-list');
    const newList = document.getElementById('new-list');

    // Simulate loading
    setTimeout(() => {
        trendingList.innerHTML = '';
        popularList.innerHTML = '';
        newList.innerHTML = '';

        [...comicsData].sort((a,b) => b.rating - a.rating).forEach(comic => {
            trendingList.innerHTML += createComicCard(comic);
        });

        [...comicsData].reverse().forEach(comic => {
            popularList.innerHTML += createComicCard(comic);
        });

        comicsData.forEach(comic => {
            newList.innerHTML += createComicCard(comic);
        });
    }, 800); // 800ms loading simulation
}

function initComicPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const comicId = urlParams.get('id');
    
    if (!comicId) {
        document.body.innerHTML = '<h1>Comic not found</h1>';
        return;
    }

    const comic = comicsData.find(c => c.id === comicId);
    if (!comic) return;

    document.title = `${comic.title} | WEBTOON Clone`;

    setTimeout(() => {
        document.getElementById('comic-cover').src = comic.cover;
        document.getElementById('comic-thumb').src = comic.thumbnail;
        document.getElementById('comic-title').textContent = comic.title;
        document.getElementById('comic-author').textContent = comic.author;
        document.getElementById('comic-desc').textContent = comic.description;
        
        const tagsContainer = document.getElementById('comic-tags');
        tagsContainer.innerHTML = '';
        comic.genre.forEach(g => {
            tagsContainer.innerHTML += `<span class="tag">${g}</span>`;
        });

        const epList = document.getElementById('episode-list');
        epList.innerHTML = '';
        comic.episodes.forEach(ep => {
            epList.innerHTML += `
                <a href="reader.html?comicId=${comic.id}&epId=${ep.id}" class="episode-item fade-in">
                    <div>
                        <div class="ep-title">${ep.title}</div>
                        <div class="ep-date">${ep.date}</div>
                    </div>
                    <div class="ep-likes">
                        <i class="far fa-heart"></i> ${ep.likes}
                    </div>
                </a>
            `;
        });
    }, 500);
}

function initReaderPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const comicId = urlParams.get('comicId');
    const epId = urlParams.get('epId');

    const comic = comicsData.find(c => c.id === comicId);
    if (!comic) return;

    const ep = comic.episodes.find(e => e.id === epId);
    
    document.title = `${comic.title} - ${ep ? ep.title : 'Reader'}`;
    document.getElementById('reader-title').textContent = ep ? ep.title : comic.title;
    document.getElementById('back-btn').href = `comic.html?id=${comicId}`;

    const container = document.getElementById('reader-container');
    
    // Simulate loading images
    setTimeout(() => {
        container.innerHTML = '';
        if (comic.readerImages) {
            comic.readerImages.forEach(imgSrc => {
                container.innerHTML += `<img src="${imgSrc}" class="reader-image fade-in" alt="Comic Page">`;
            });
        } else {
            container.innerHTML = `<h2 style="color:white; margin: 2rem;">Demo end. No pages available.</h2>`;
        }
    }, 1000);

    // Smart header hide on scroll down, show on scroll up
    let lastScroll = 0;
    const header = document.getElementById('reader-header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        lastScroll = currentScroll;
    });
}

function initProfilePage() {
    setTimeout(() => {
        document.getElementById('prof-pic').src = userData.profilePic;
        document.getElementById('prof-name').textContent = userData.username;

        const grid = document.getElementById('profile-grid');
        grid.innerHTML = '';
        
        // Show library by default
        userData.library.forEach(id => {
            const comic = comicsData.find(c => c.id === id);
            if(comic) {
                grid.innerHTML += createComicCard(comic);
            }
        });

        // Tabs logic
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                tabs.forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                
                grid.innerHTML = '';
                if(e.target.dataset.target === 'library') {
                    userData.library.forEach(id => {
                        const comic = comicsData.find(c => c.id === id);
                        if(comic) grid.innerHTML += createComicCard(comic);
                    });
                } else if (e.target.dataset.target === 'history') {
                    userData.history.forEach(hist => {
                        const comic = comicsData.find(c => c.id === hist.id);
                        if(comic) {
                            grid.innerHTML += `
                                <a href="comic.html?id=${comic.id}" class="comic-card fade-in">
                                    <img src="${comic.thumbnail}" class="comic-thumbnail">
                                    <div class="comic-info">
                                        <div class="comic-title">${comic.title}</div>
                                        <div class="comic-genre">Progress: ${hist.progress}</div>
                                    </div>
                                </a>
                            `;
                        }
                    });
                }
            });
        });
    }, 600);
}
