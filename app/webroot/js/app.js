$(function () {
    $("#noScript").hide();


    // useless for mobiles devices
    $.device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));

    if ($.device) {
        $("#mobileDevice").show();
    } else {
        $.i18n.init({
            detectLngQS: 'lang',
            lngWhitelist: ['en', 'fr'],
            resGetPath: '/js/translations/__lng__.json'
        }).done(function (t) {
            Terminal.init();
        });
    }

});

function t(key, opts) {
    return $.t(key, opts);
}

Terminal = {
    /**
     * VARIABLES
     */
    currentUser: "",
    currentMachine: "",
    currentPath: "~",
    currentCursorIdx: 0,
    currentTyping: "",
    blockType: false,
    blocked: function () {
        return Terminal.blockType;
    },
    /**
     * First function called
     * @returns {undefined}
     */
    init: function () {
        // init
        Terminal.currentUser = t("custom.username");
        Terminal.currentMachine = t("custom.machine");

        // welcome
        Terminal.addConsole(t("global.welcome"));
        Terminal.updateType();
        $("html").on("keypress", Terminal.callbackKey);
        $(document).keypress(Terminal.callbackKey);
        $(document).bind("keydown keypress", Terminal.backKey);
    },
    /**
     * Adds a message to terminal
     * @param {type} msg
     * @returns {undefined}
     */
    addConsole: function (msg, safe) {
        msg = $.trim(msg);
        if (msg.length <= 0) {
            return;
        } else if (typeof safe !== 'undefined' && safe === false) {
            msg = escapeHtml(msg);
        }

        Terminal.addLine(Terminal.printHeader() + msg);
    },
    addLine: function (msg) {
        $("#consoleMsgs").append(msg + "<br/>");
        location.href = "#in";
    },
    printHeader: function () {
        return Terminal.currentUser + "@" + Terminal.currentMachine + ":" + Terminal.currentPath + "$ ";
    },
    removeLastTyping: function () {
        var or = Terminal.currentTyping;
        or = or.substring(0, or.length - 1);
        Terminal.currentTyping = or;
        Terminal.currentCursorIdx--;
        Terminal.chkCursor();
        Terminal.updateType();
    },
    /**
     * Called on enter key
     * @returns {undefined}
     */
    validateTyping: function () {
        if (Terminal.currentTyping.length <= 0) {
            return;
        }
        Terminal.addConsole(Terminal.currentTyping, false);
        $("#in").text("");

        Commands.execute(Terminal.currentTyping);

        Terminal.resetType();
        Terminal.updateType();
    },
    // reset the type
    resetType: function () {
        Terminal.currentTyping = "";
        Terminal.currentCursorIdx = 0;
    },
    callbackKey: function (e) {
        if (Terminal.blocked()) {
            return;
        } else if (e.which === 13) {
            return Terminal.validateKey(e);
        }

        var char = String.fromCharCode(e.keyCode);
        Terminal.currentTyping += char;
        Terminal.currentCursorIdx++;
        Terminal.currentTyping = $.trim(Terminal.currentTyping);

        if (char === " ") {
            Terminal.currentTyping += " ";
        }
        Terminal.updateType();
    },
    /**
     * Handle back key
     * @param {type} e
     * @returns {undefined}
     */
    backKey: function (e) {

        /*
         * Terminal swallows backspace keys on any non-input element.
         * stops backspace -> back
         */
        var rx = /INPUT|SELECT|TEXTAREA/i;

        if (Terminal.blocked()) {
            return;
        } else if (e.which === 8) { // 8 == backspace
            if (!rx.test(e.target.tagName) || e.target.disabled || e.target.readOnly) {
                e.preventDefault();
                // delete one character
                Terminal.removeLastTyping();
            }
        }
    },
    validateKey: function (e) {
        Terminal.validateTyping();
    },
    /**
     * Update the type
     * @returns {undefined}
     */
    updateType: function () {
        var final = "";
        for (var i = 0; i < Terminal.currentCursorIdx; i++) {
            final += Terminal.currentTyping.charAt(i);
        }
        $("#tra1").text(final);

        // add cursor
        var cursor = "<span class='typed-cursor'></span>";

        var final2 = "";
        for (var i = Terminal.currentCursorIdx; i < Terminal.currentTyping.length; i++) {
            final2 += Terminal.currentTyping.charAt(i);
        }
        $("#tra2").text(final2);


        Terminal.addInput(escapeHtml($("#tra1").text()) + cursor + escapeHtml($("#tra2").text()));

    },
    /**
     * Add text to user input
     * @param {type} msg
     * @returns {undefined}
     */
    addInput: function (msg) {
        $("#in").html(Terminal.printHeader() + msg);
    },
    /**
     * Check the cursor position
     * @returns {undefined}
     */
    chkCursor: function () {
        if (Terminal.currentCursorIdx < 0) {
            Terminal.currentCursorIdx = 0;
        }
    }
};

var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
};

function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
        return entityMap[s];
    });
}


function openLink(link, newTab) {
    setTimeout(function () {
        if (newTab !== true) {
            newTab = false;
        }

        if (!newTab || !window.open(link, "open")) {
            location.href = link;
        }

    }, 1000);

}