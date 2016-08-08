(function() {
    mejs.MepDefaults = {
        // initial volume when the player starts (overrided by user cookie)
        startVolume: 0.8,
        // useful for <audio> player loops
        loop: false,
        // Hide controls when playing and mouse is not over the video
        alwaysShowControls: false,
        // force Android's native controls
        AndroidUseNativeControls: false,
        // features to show
        features: ['contextmenu', 'aspectRatio', 'notification', 'playlist', 'source', 'settings', 'playpause', 'stop', 'progress', 'current', 'duration', 'tracks', 'subdelay', 'subsize', 'volume', 'settingsbutton', 'info', 'help', 'fullscreen', 'drop', 'stats', 'opensubtitle', 'autosrt', 'shortcuts', 'stats'],
        
        // only for dynamic
        isVideo: true,
        
        // array of keyboard actions such as play pause
        keyActions: [
            {
                keys: [
                    32, // SPACE
                    179 // GOOGLE play/pause button
                ],
                action: function(player, keyCode, activeModifiers) {
                    if(player.isPaused() || player.isEnded())
                        player.play();
                    else
                        player.pause();
                }
            },
            {
                keys: [38], // UP
                action: function(player, keyCode, activeModifiers) {
                    if(activeModifiers.ctrl && activeModifiers.shift) {
                        player.moveCaptions(38);
                    }
                    else if(activeModifiers.ctrl) {
                        player.setVolume(Math.min(player.getVolume() + 0.1, player.options.maximumVolume));
                    }
                    else if(activeModifiers.shift) {
                        player.changeBrightness(true);
                    }
                }
            },
            {
                keys: [40], // DOWN
                action: function(player, keyCode, activeModifiers) {
                    if(activeModifiers.ctrl && activeModifiers.shift) {
                        player.moveCaptions(40);
                    }
                    else if(activeModifiers.ctrl) {
                        player.setVolume(Math.max(player.getVolume() - 0.1, 0));
                    }
                    else if(activeModifiers.shift) {
                        player.changeBrightness(false);
                    }
                }
            },
            {
                keys: [
                    37, // LEFT
                    227 // Google TV rewind
                ],
                action: function(player, keyCode, activeModifiers) {
                    if(activeModifiers.ctrl && activeModifiers.shift) {
                        player.moveCaptions(37);
                    }
                    else if(player.getSrc()) {
                        if(player.isVideo) {
                            player.showControls();
                            player.startControlsTimer();
                        }
                        
                        var seekDuration = (activeModifiers.shift && -3) ||
                                           (activeModifiers.alt && -10) ||
                                           (activeModifiers.ctrl && -60);
                        
                        if(seekDuration) {
                            player.seek(seekDuration);
                        }
                    }
                }
            },
            {
                keys: [
                    39, // RIGHT
                    228 // Google TV forward
                ],
                action: function(player, keyCode, activeModifiers) {
                    if(activeModifiers.ctrl && activeModifiers.shift) {
                        player.moveCaptions(39);
                    }
                    else if(player.getSrc()) {
                        var seekDuration = (activeModifiers.shift && 3) ||
                                           (activeModifiers.alt && 10) ||
                                           (activeModifiers.ctrl && 60);
                        
                        if(seekDuration) {
                            player.seek(seekDuration);
                        }
                    }
                }
            },
            {
                keys: [70], // f
                action: function(player, keyCode, activeModifiers) {
                    if(activeModifiers.ctrl) {
                        player.toggleFullscreen();
                    }
                }
            },
            {
                keys: [79], // o
                action: function(player, keyCode, activeModifiers) {
                    if(activeModifiers.ctrl) {
                        player.openFileForm();
                    }
                }
            },
            {
                keys: [189],  // -
                action: function(player, keyCode, activeModifiers) {
                    if(activeModifiers.ctrl) {
                        player.decCaptionSize();
                    }
                }
            },
            {
                keys: [187],  // +
                action: function(player, keyCode, activeModifiers) {
                    if(activeModifiers.ctrl) {
                        player.incCaptionSize();
                    }
                }
            },
            {
                keys: [90],  // z
                action: function(player, keyCode, activeModifiers) {
                    if(activeModifiers.ctrl) {
                        player.decCaptionDelay();
                    }
                }
            },
            {
                keys: [88],  // x
                action: function(player, keyCode, activeModifiers) {
                    if(activeModifiers.ctrl) {
                        player.incCaptionDelay();
                    }
                }
            },
            {
                keys: [190],  // ,
                action: function(player, keyCode, activeModifiers) {
                    if(activeModifiers.ctrl) {
                        player.incPlaybackRate();
                    }
                    else if(activeModifiers.alt) {
                        player.changeAudioDelay(true);
                    }
                }
            },
            {
                keys: [188],  // .
                action: function(player, keyCode, activeModifiers) {
                    if(activeModifiers.ctrl) {
                        player.decPlaybackRate();
                    }
                    else if(activeModifiers.alt) {
                        player.changeAudioDelay(false);
                    }
                }
            },
            {
                keys: [191],  // /
                action: function(player, keyCode, activeModifiers) {
                    if(activeModifiers.ctrl) {
                        player.resetPlaybackRate();
                    }
                }
            },
            {
                keys: [76],  // l
                action: function(player, keyCode, activeModifiers) {
                    if(activeModifiers.ctrl) {
                        player.toggleLoop();
                    }
                }
            },
            {
                keys: [68], // d
                action: function(player, keyCode, activeModifiers) {
                    if(activeModifiers.ctrl) {
                        player.openSubtitleLogIn();
                    }
                }
            },
            {
                keys: [65], // a
                action: function(player, keyCode, activeModifiers) {
                    if(activeModifiers.ctrl) {
                        player.cycleAspectRatio();
                    }
                }
            },
            {
                keys: [73], // i
                action: function(player, keyCode, activeModifiers) {
                    if(activeModifiers.ctrl) {
                        player.toggleInfo();
                    }
                }
            },
            {
                keys: [221],  // ]
                action: function(player, keyCode, activeModifiers) {
                    if(activeModifiers.ctrl) {
                        player.next();
                    }
                }
            },
            {
                keys: [219],  // [
                action: function(player, keyCode, activeModifiers) {
                    if(activeModifiers.ctrl) {
                        player.previous();
                    }
                }
            },
            {
                keys: [81],  // q
                action: function(player, keyCode, activeModifiers) {
                    if(activeModifiers.ctrl) {
                        player.cyclePlayType();
                    }
                }
            }
        ]
    };
})();