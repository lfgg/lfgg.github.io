const Nav = {
    elems: {
        toggle: document.querySelector('#toggle-nav')
    },

    init: function() {
        this.elems.toggle.addEventListener('click', (e) => {
            e.preventDefault();
            document.documentElement.classList.toggle('nav-open');
        });

        window.addEventListener('resize', () => {
            document.documentElement.classList.remove('nav-open');
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
            // Show loader if page load takes a bit
            setTimeout(() => {
                if (document.documentElement.classList.contains('is-animating')) {
                    // Replace loader so animation restarts
                    let newLoader = this.elems.loader.cloneNode(true);
                    this.elems.loader.parentNode.replaceChild(newLoader, this.elems.loader);
                    this.elems.loader = newLoader;
                    this.elems.loader.style.opacity = 1;
                }
            }, 500);
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