const Nav = {
    elems: {
        toggle: document.querySelector('#toggle-nav'),
        site: document.querySelector('#site')
    },

    isOpen: false,

    toggle: function() {
        document.documentElement.classList.toggle('nav-open');
        this.isOpen = !this.isOpen;
    },

    open: function() {
        document.documentElement.classList.add('nav-open');
        this.isOpen = true;
    },

    close: function() {
        document.documentElement.classList.remove('nav-open');
        this.isOpen = false;
    },

    init: function() {
        this.elems.toggle.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggle();
        });

        window.addEventListener('resize', (e) => {
            this.close();
        });

        this.elems.site.addEventListener('click', (e) => {
            if (this.isOpen) {
                this.close();
            }
        });
    }
}
Nav.init();


const PostFilters = {
    shuffleInstance = null,

    init: function() {
        var Shuffle = window.Shuffle;
        var shuffleWrap = document.querySelector('.c-filter-posts');

        this.shuffleInstance = new Shuffle(shuffleWrap, {
          itemSelector: '.c-card'
        });

        const filters = document.querySelectorAll('.js-filter');
        filters.forEach((filter) => {
            filter.addEventListener('click', (e) => {
                e.preventDefault();

                filters.forEach((filter) => {
                    filter.classList.remove('is-active');
                });
                filter.classList.add('is-active');

                let cat = filter.getAttribute('data-category');
                this.shuffleInstance.filter(cat);
            });
        });
    }
}
PostFilters.init();


const LazyLoadHandler = {
    lazyLoad: null,

    init: function() {
        this.lazyLoad = new LazyLoad({
            elements_selector: '.lazy'
        });
    }
}
LazyLoadHandler.init();


const Page = {
    elems: {
        loader: document.querySelector('#loader')
    },

    init: function() {
        const swup = new Swup({
            elements:          ['#page-main'],
            animationSelector: '[class*="u-transition-"]'
        });

        swup.on('animationOutStart', () => {
            // Hide mobile menu
            Nav.close();

            let newLoader = this.elems.loader.cloneNode(true);
            this.elems.loader.parentNode.replaceChild(newLoader, this.elems.loader);
            this.elems.loader = newLoader;
        });

        swup.on('contentReplaced', () => {
            let lazyImgs = document.querySelectorAll('.lazy');
            lazyImgs.forEach((el) => {
                el.classList.remove('loaded');
                el.classList.remove('initial');
                el.classList.remove('loading');
                el.setAttribute('data-was-processed', '');
            });
        });

        swup.on('animationInDone', () => {
            LazyLoadHandler.init();
        });

        // Back button 
        swup.on('popState', () => {
            setTimeout(function() {
                let lazyImgs = document.querySelectorAll('.lazy');
                lazyImgs.forEach((el) => {
                    el.classList.add('loaded');
                });
            }, 100);
        });

        window.addEventListener('load', () => {
            setTimeout(() => {
                document.documentElement.classList.remove('is-animating', 'is-preload');
            }, 500);
        });
    }
}
Page.init();