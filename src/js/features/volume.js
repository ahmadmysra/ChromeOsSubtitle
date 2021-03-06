(function() {
    MediaElementPlayer.prototype.volume = function() {
        var audioContext = new window.AudioContext(),
            source = audioContext.createMediaElementSource(this.media);
        
        this.gainNode = audioContext.createGain();
        this.delayNode = audioContext.createDelay(2.0);
        
        source.connect(this.delayNode);
        this.delayNode.connect(this.gainNode);
        this.gainNode.connect(audioContext.destination);
        
        var t = this,
            mute = $('<div class="mejs-button mejs-volume mejs-mute">' +
                        '<button type="button" title="' + t.muteText + '"></button>' +
                        '<progress id="volumeBar" value="' + t.startVolume + '" max="' + t.maximumVolume + '"></progress>' +
                    '</div>')
                        .appendTo(t.rightControls),
            volumeBar = mute.find('#volumeBar')
                            .on('mousedown', function(e) {
                                handleVolumeMove(e);
                                volumeBar.on('mousemove', handleVolumeMove);
                            })
                            .on('mouseup mouseleave', function() {
                                volumeBar.off('mousemove', handleVolumeMove);
                            }),
            handleVolumeMove = function(e) {
                var volume = null,
                    totalOffset = volumeBar.offset();
                
                // calculate the new volume based on the mouse position
                // height is width becuase we have rotated the progress bar
                var newY = e.pageY - totalOffset.top,
                    railHeight = volumeBar.outerWidth();
                
                volume = (railHeight - newY) / railHeight;
                
                // ensure the volume isn't outside 0-2
                // set the media object (this will trigger the volumechanged event)
                t.setVolume(Math.max(0, Math.min(volume * 2, t.maximumVolume)));
            };
        
        mute.find('button')
            .on('click', function() {
                t.setMuted(!t.isMuted());
            });
        
        // listen for volume change events from other sources
        t.media.addEventListener('volumechange', function(e) {
            if(t.isMuted()) {
                volumeBar.attr({ 'value': 0 });
                mute.addClass('mejs-unmute');
            } else {
                volumeBar.attr({ 'value': t.getVolume() });
                mute.removeClass('mejs-unmute');
            }
        }, false);
        
        t.setVolume(t.startVolume);
    };
})();
