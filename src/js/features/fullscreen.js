(function($) {
    $.extend(mejs.MepDefaults, {
        fullscreenText: mejs.i18n.t('Fullscreen')
    });
    
    MediaElementPlayer.prototype.buildfullscreen = function() {
        var t = this,
            fullscreenBtn = mejs.Utility.createNestedElement('<div class="mejs-button mejs-fullscreen-button">' +
                    '<button type="button" title="' + this.options.fullscreenText + '" aria-label="' + this.options.fullscreenText + '"></button>' +
                '</div>');
        
        fullscreenBtn.addEventListener('click', function() {
            t.toggleFullscreen();
        });
        
        t.rightControls[0].appendChild(fullscreenBtn);
        
        document.addEventListener("webkitfullscreenchange", function() {
            fullscreenBtn.classList.toggle('mejs-unfullscreen-button');
        }, false);
    };
    
    MediaElementPlayer.prototype.toggleFullscreen = function() {
        document.webkitIsFullScreen ? document.webkitCancelFullScreen() : this.container[0].webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    };
})(mejs.$);