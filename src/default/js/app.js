window.lmtcb = Object.create({
    selector:'#comebacker',
    events:['mouseout','blur','popstate'],
    once:true,
    show:0,
    register: function() {
        if(typeof cbk_options === 'object') {
            Object.assign(this, cbk_options);
        }
        this.cbk_container = window.document.querySelectorAll(this.selector);
        if(this.cbk_container === undefined || this.cbk_container[0] === undefined) {
            console.warn('Comebaker container not found in document! Change your container id to default or create an object "cbk_options" with valid css selector in "selector" property');
            return false;
        }
        if(this.cbk_container.length > 1) {
            console.warn('There are more than 1 comebacker container in document! Only first will be used.', this.cbk_container);
        }
        this.cbk_container = this.cbk_container[0];
        if(Array.isArray(this.events)) {
            if(this.events.indexOf('mouseout') !== -1) {
                window.addEventListener('mouseout',()=>{
                    if(this.once && this.shown > 0) return;
                    this.cbk_container.style.display = 'block';
                });
            }
            if(this.events.indexOf('blur') !== -1) {
                window.addEventListener('blur',()=>{
                    if(this.once && this.shown > 0) return;
                    this.cbk_container.style.display = 'block';
                },true);
            }
            if(this.events.indexOf('popstate') !== -1) {
                history.replaceState({foo:'bar'},'bar');
                window.addEventListener('popstate',()=>{
                    if(this.once && this.shown > 0) return;
                    this.cbk_container.style.display = 'block';
                });
            }
        }
    }
})
window.lmtcb.register();
