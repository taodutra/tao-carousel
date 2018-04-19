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
        this.contentWidth = 0;
        this.startClick = 0;
        this.endClick = 0;
        this.isDragging = false;
        this.draggingHistory = [];
        this.currentSlide = 0;
        this.currentX = 0;
        this.draggingX = 0;
        this.config = {
            carouselBox: '.carousel-box',
            carouselContent: '.carousel-content',
            carouselItem: '.carousel-item',
            // current: 1,
            onUpdate: null,
            preventEvents: false,
            activeClass: 'active',
        };
        this.config =  { ...this.config, ...config }
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
        this.preventWindowScroll = this.handleWindowScroll.bind(this);
        // first execution
        this.updateSizes();
        this.addEventListeners();
        this.updateCurrentSlide();
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
    handleWindowScroll(event) {
        console.log(event);
        // event.preventDefault();
        // event.stopPropagation();
    }
    /**
     * handleMouseDown
     * @param {event} event 
     */
    handleMouseDown(event) {
        event.preventDefault();
        event.stopPropagation();
        this.isDragging = true;
        this.startClick = event.touches ? event.touches[0].pageX : event.clientX;
        console.log(this.startClick);
        window.addEventListener('mousemove',  this.onDrag);
        window.addEventListener('touchmove',  this.onDrag);
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
        this.endClick = event.clientX;
        window.removeEventListener('mousemove',  this.onDrag);
        window.removeEventListener('touchmove',  this.onDrag);
        this.handleStopDragging();
        // console.log(this.endClick, this.isDragging);
    };
    /**
     * handleDrag
     * @param {event} event 
     */
    handleDrag(event) {
        // this.$carousel.style.left = `${}`;
        if (this.isDragging) {
            const x = event.touches ? event.touches[0].pageX : event.clientX;
            this.updateContentPosition(x);
            this.draggingHistory.push(x);
            window.addEventListener('touchmove',  this.preventWindowScroll);
            // console.log('isDragging', event.clientX);
        }
    };
    /**
     * handleStopDragging
     */
    handleStopDragging() {
        const activeSlide = Math.abs(Math.round(this.draggingX / this.moduleWidth));
        this.updateCurrentSlide(activeSlide);
        this.draggingHistory = [];
    };
    /**
     * updateContentSize
     */
    updateContentSize() {
        this.contentWidth = this.moduleWidth * this.totalItems;
        this.$carouselContent.style.width = `${ this.contentWidth }px`;
    };
    /**
     * updateContentPosition
     * @param {Number} x 
     */
    updateContentPosition(x = 0) {
        this.draggingX = this.currentX + x - this.startClick;
        this.draggingX = this.draggingX > 0 ? 0 : Math.max(this.draggingX, -(this.contentWidth - this.moduleWidth));
        this.$carouselContent.style.transform = `translate3d(${ this.draggingX }px, 0, 0)`;
    };
    /**
     * goToSlide
     * @param {number} index 
     */
    goToSlide(index = 0) {
        this.$carouselContent.style.transform = `translate3d(-${ index * this.moduleWidth }px, 0, 0)`;
    };
    /**
     * updateCurrentSlide
     * @param {number} index 
     */
    updateCurrentSlide(index = 0) {
        this.currentSlide = index;
        this.currentX = index * this.moduleWidth * -1;
        this.goToSlide(index);
        this.$carouselItemList.forEach((slide, i) => {
            slide.classList[i === index ? 'add' : 'remove'](this.config.activeClass);
        });
    };
    /**
     * addEventListeners
     */
    addEventListeners() {
        this.$carousel.addEventListener('touchstart', this.onMouseDown);
        this.$carousel.addEventListener('mousedown', this.onMouseDown);
        window.addEventListener('touchend',  this.onMouseUp);
        window.addEventListener('mouseup',  this.onMouseUp);
        window.addEventListener('resize',  this.onResize);
    };
    /**
     * removeEventListeners
     */
    removeEventListeners() {
        this.$carousel.removeEventListener('touchstart', this.onMouseDown);
        this.$carousel.removeEventListener('mousedown', this.onMouseDown);
        window.removeEventListener('touchend', this.onMouseUp);
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