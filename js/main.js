$(document).ready(function () {
    var simonKeys = [], speed = 900, melody, userTurn, userMelody;

    function createKeys() {
        $(".button").each(function () {
            var elementJquery = $(this);
            var key = new Key(elementJquery);
            simonKeys.push(key);
        });
    }
    createKeys();

    function increaseSpeed() {
        speed = (speed <= 200) ? 200 : (speed - 25);
    }

    function counterFn() {
        $("#count").html(melody.length);
    }

    function aVous() {
        $("#turn").html('A vous !');
    }

    function timeOrdi() {
        setTimeout(function () {
            computerTurn();

        }, 1000);
    }

    function compareMelody() {
        var i;
        for (i = 0; i < userMelody.length; i++) {
            var melodyKey = melody[i];
            var userKey = userMelody[i];
            if (userKey.id === melodyKey.id) {
                if (i === melody.length - 1) {
                    $("#result").html('Bravo !');
                    increaseSpeed();
                    counterFn();
                    timeOrdi();

                }
                continue;
            }
            userMelody = [];
            $("#result").html('Perdu !');
            break;

        }
    }

    function userClickOnKey(event) {
        if (userTurn) {
            var key = event.detail;

            userMelody.push(key);
            compareMelody();
            console.log(userMelody);
           
        };
    }

    function createKeyClickListeners() {
        simonKeys.map(function (simonKey) {
            jqueryElement = simonKey.jqueryElement;
            jqueryElement.on('customClickEvent', userClickOnKey);
        });
    }
    createKeyClickListeners();


    function getKeyRandomly() {
        var m = simonKeys.length;
        var f = Math.random() * m;
        var index = Math.floor(f);
        return simonKeys[index];
    }

    function addMelodyKey() {
        var k = getKeyRandomly();
        melody.push(k);
    }

    function playMelody() {
        var m = melody.length;
        var promises = [];
        for (var i = 0; i < m; i++) {
            var key = melody[i];
            promises.push(playNote(key, i));
        }
        return Promise.all(promises);
    }

    function playNote(key, i) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                key.play();
                resolve();
            }, speed * (i + 1));
        });
    }


    function initVariables() {
        melody = [];
        userMelody = [];
    }

    function userTurnFn() {
        userMelody = [];
        userTurn = true;
        setTimeout(function(){
            aVous()
        },700)
        
    }

    function computerTurn() {
        userTurn = false;
        setTimeout(function(){
            $("#turn").html('Au tour du PC !')
        },700)
        addMelodyKey();
        playMelody().then(function () {
            userTurnFn();
        });
    }

    function gameStart() {
        initVariables();
        computerTurn();
    }
    $("#startBtn").click(function () {
        gameStart();
    });

});
