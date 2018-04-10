export default {
    $box: null,
    config: {
        current: 1,
        onUpdate: null,
        preventEvents: false,
        activeClass: 'active',
    },
    render(box, config) {
        if (!box) {
            return;
        }
        this.$box = typeof box === 'object' ? box : document.querySelector(box);
        this.addEventListeners();
        this.autoDestroy();
    },
    addEventListeners() {
        console.log('addEventListeners');
        // this.$box.addEventListener('DOMNodeRemoved', () => this.destroy());
    },
    removeEventListeners() {
        console.log('removeEventListeners');
    },
    autoDestroy() {
        this.boxChecker = setInterval(() => {
            // TODO: refactor the checker
            if (!document.body.contains(this.$box)) {
                clearInterval(this.boxChecker);
                this.destroy();
            }
        }, 100);
    },
    destroy() {
        console.log('destroy');
        this.removeEventListeners();
    },
  };
  