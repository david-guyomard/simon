class Key {

    constructor(jqElement) {
        this.jqueryElement = jqElement;
        this.url = jqElement.attr('audio-src');
        this.isMuted = this.analyseKey();
        this.addClickListener();
    }

    get id() {

        return this.jqueryElement.attr('id');
    }

    get muted() {

        return this.isMuted;
    }
    set muted(mute) {
        this.isMuted = mute;
    }

    play() {
        if (this.isMuted) {

            return;
        }

        var clickEvent = new CustomEvent('customClickEvent', { 'detail': this }),
            element = this.jqueryElement[0];
        this.jqueryElement.removeClass('lighted').addClass('lighted');
        this.createSound();
        element.dispatchEvent(clickEvent);
    }
    createSound() {
        var instance = this,
            audio = new Audio(this.url);

        audio.play();
        setTimeout(function(){
            instance.stoped();
        }, 350);
    }
    stoped() {
        var instance = this;
        this.jqueryElement.fadeOut(20, function () {
            instance.jqueryElement.removeClass('lighted').show();
        });
    }
    addClickListener() {
        var instance = this,
            jqEl = instance.jqueryElement;

        jqEl.click(function () {
            instance.play();
        });
    }
    analyseKey() {
        var instance = this,
            jqEl = instance.jqueryElement;
        var muted = jqEl.attr("muted");

        return (muted && muted == "true") ? true : false;
    }
}
