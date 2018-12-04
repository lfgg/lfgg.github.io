const Nav = {
    elems: {
        toggle: document.querySelector('#toggle-nav')
    },

    init: function() {
        this.elems.toggle.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.classList.toggle('nav-open');
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
            let newLoader = this.elems.loader.cloneNode(true);
            this.elems.loader.parentNode.replaceChild(newLoader, this.elems.loader);
            this.elems.loader = newLoader;
        });

        window.addEventListener('load', () => {
            document.documentElement.classList.remove('is-animating');
        });
    }
}

Page.init();