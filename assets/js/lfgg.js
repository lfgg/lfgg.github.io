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

        window.addEventListener('load', () => {
            setTimeout(() => {
                document.documentElement.classList.remove('is-animating', 'is-preload');
            }, 500);
        });

        var myLazyLoad = new LazyLoad({
            elements_selector: '.lazy',
            load_delay: 500
        });
    }
}
Page.init();