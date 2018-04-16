class taoCarousel {
    /**
     * @param {*} carousel 
     * @param {*} config 
     */
    constructor(carousel, config) {
        if (!carousel) {
            return;
        }
        this.$carousel = null;
        this.$carouselBox = null;
        this.$carouselContent = null;
        this.$carouselItemList = [];
        this.totalItems = 0;
        this.moduleWidth = 0;
        this.startClick = 0;
        this.endClick = 0;
        this.isDragging = false;
        this.config = {
            carouselBox: '.carousel-box',
            carouselContent: '.carousel-content',
            carouselItem: '.carousel-item',
            current: 1,
            onUpdate: null,
            preventEvents: false,
            activeClass: 'active',
        };
        this.config = Object.assign(this.config, config); // {...this.confug, confug}
        this.$carousel = this.getElement(carousel);
        this.$carouselBox = this.getElement(this.config.carouselBox, this.$carousel);
        this.$carouselContent = this.getElement(this.config.carouselContent, this.$carouselBox);
        this.$carouselItemList = this.getElement(this.config.carouselItem, this.$carouselContent, true);
        this.totalItems = this.$carouselItemList.length;
        if (
            this.$carousel &&
            this.$carouselBox &&
            this.$carouselContent &&
            this.$carouselItemList &&
            this.totalItems
        ) {
            this.init();
        }
    };
    /**
     * init
     */
    init() {
        this.onMouseDown = this.handleMouseDown.bind(this);
        this.onMouseUp = this.handleMouseUp.bind(this);
        this.onDrag = this.handleDrag.bind(this);
        this.onResize = this.updateSizes.bind(this);
        // first execution
        this.updateSizes();
        this.addEventListeners();
        this.autoDestroy();
    };
    /**
     * getElements
     * @param {*} value 
     * @param {boolean} multiple 
     */
    getElement(value, father = document, multiple = false) {
        return typeof value === 'object' ? value : father[multiple ? 'querySelectorAll' : 'querySelector'](value)
    };
    /**
     * updateSizes
     */
    updateSizes() {
        this.moduleWidth = this.$carouselBox.clientWidth;
        this.updateContentSize();
    };
    /**
     * handleMouseDown
     * @param {event} event 
     */
    handleMouseDown(event) {
        this.isDragging = true;
        this.startClick = event.offsetX;
        window.addEventListener('mousemove',  this.onDrag);
    };
    /**
     * handleMouseUp
     * @param {event} event 
     */
    handleMouseUp(event) {
        if (!this.isDragging) {
            return;
        }
        this.isDragging = false;
        this.endClick = event.offsetX;
        window.removeEventListener('mousemove',  this.onDrag);
        console.log(this.endClick, this.isDragging);
    };
    /**
     * handleDrag
     * @param {event} event 
     */
    handleDrag(event) {
        // this.$carousel.style.left = `${}`;
        if (this.isDragging) {
            console.log('isDragging', event.clientX);
        }
    };
    /**
     * updateContentSize
     */
    updateContentSize() {
        this.$carouselContent.style.width = `${ this.moduleWidth * this.totalItems }px`;
    };
    /**
     * addEventListeners
     */
    addEventListeners() {
        console.log('addEventListeners');
        this.$carousel.addEventListener('mousedown', this.onMouseDown);
        window.addEventListener('mouseup',  this.onMouseUp);
        window.addEventListener('resize',  this.onResize);
    };
    /**
     * removeEventListeners
     */
    removeEventListeners() {
        console.log('removeEventListeners');
        this.$carousel.removeEventListener('mousedown', this.onMouseDown);
        window.removeEventListener('mouseup', this.onMouseUp);
        window.removeEventListener('resize', this.onResize);
    };
    /**
     * autoDestroy
     */
    autoDestroy() {
        this.carouselChecker = setInterval(() => {
            // TODO: refactor the checker
            if (!document.body.contains(this.$carousel)) {
                clearInterval(this.carouselChecker);
                this.destroy();
            }
        }, 100);
    };
    /**
     * destroy
     */
    destroy() {
        console.log('destroy');
        this.removeEventListeners();
    };
  };
  
  export default taoCarousel;