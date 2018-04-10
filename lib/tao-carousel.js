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
    },
    removeEventListeners() {
        console.log('removeEventListeners');
    },
    autoDestroy() {
        this.boxChecker = setInterval(() => {
            console.log(this.$box);
            // TODO: refactor the checker
            if (!this.$box.clientWidth) {
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
  