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

            // Show loader if page load takes a bit
            setTimeout(() => {
                if (document.documentElement.classList.contains('is-animating')) {
                    // Replace loader so animation restarts
                    let newLoader = this.elems.loader.cloneNode(true);
                    this.elems.loader.parentNode.replaceChild(newLoader, this.elems.loader);
                    this.elems.loader = newLoader;
                    this.elems.loader.style.opacity = 1;
                }
            }, 1000);
        });

        swup.on('animationInDone', () => {
            this.elems.loader.style.opacity = 0;
        });

        window.addEventListener('load', () => {
            document.documentElement.classList.remove('is-animating');
            this.elems.loader.style.opacity = 0;
        });
    }
}
Page.init();