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
    }
}

Page.init();