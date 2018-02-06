/* global Terminal, escapeHtml, Config */

Commands = {
    /**
     * Execute a command
     * @param {type} command
     * @returns {undefined}
     */
    execute: function (commands) {

        commands = commands.toLowerCase();

        /**
         * Caution
         */
        if (commands.match("\\&\\&") || commands.match("\\|\\|")) {
            return Commands.out(t("global.orAnd"));
        }

        var a = commands.split("|");

        for (var i = 0, max = a.length; i < max; i++) {
            var all = escapeHtml(a[i]);
            all = $.trim(all).split(" ");
            var command = all[0];
            delete all[0];


            // CLEAR
            if (command === t("commands.clear.cmd")) {
                Commands.clear();
            }
            // HELP
            else if (command === t("commands.help.cmd")) {
                Commands.help();
            }
            // STARTX 
            else if (command === t("commands.startx.cmd")) {
                Commands.startx();
            }
            // PING 
            else if (command === t("commands.ping.cmd")) {
                Commands.ping(all);
            }
            // MAIL 
            else if (command === t("commands.mail.cmd")) {
                Commands.mail();
            }
            // CV 
            else if (command === t("commands.download.cmd")) {
                Commands.downloadCV();
            }
            // CV 
            else if (command === t("commands.echo.cmd")) {
                Commands.echo();
            }
            // List project
            else if (command === t("commands.ls.cmd")) {
                Commands.list();
            } 
            // history
            else if (command === t("commands.history.cmd")) {
                Commands.history();
            }
            // history
            else if (command === t("commands.finger.cmd")) {
                Commands.man();
            }
            // lang
            else if (command === "lang") {
                Commands.switchLanguage(all);
            }
            else if (Commands.egg.indexOf(command) !== -1) {
                return  Commands.out(t("global.notok", {cmd: command}));
            }
            else {
                return Commands.out(t("global.notfound", {cmd: command}));
            }
        }
    },
    out: function (msg) {
        Terminal.addLine(msg + "<br/>");
    },
    cout: function (msg) {
        var s = "<span class='cmd'>" + msg + "</span>";
        while (s.match("\n")) {
            s = s.replace("\n", "<br />");
        }
        return Commands.out(s);
    },
    egg: ["ifconfig", "passwd", "chmod", "cd", "reboot","halt","sudo","su","mkdir"],
    /**
     * ALL COMMANDS
     */
    clear: function () {
        $("#consoleMsgs").html("");
        Terminal.resetType();
        Terminal.updateType();
    },
    /**
     * HELP Commands
     */
    help: function () {
        Commands.cout(t("commands.help.text"));
        return true;
    },
    /**
     * Lunch graphical interface
     * @returns {undefined}
     */
    startx: function () {
        Commands.cout(t("commands.startx.text", {'link': Config.link}));
        Terminal.blockType = true;
        openLink(Config.link);
        return true;
    },
    /**
     * Coordonnées
     * @param {type} args
     * @returns {Boolean}
     */
    ping: function (args) {
        var allArgs = $.trim(args.join(" "));
        var
                all = false,
                skype = allArgs.match("skype"),
                twitter = allArgs.match("twitter"),
                phone = allArgs.match("phone"),
                mail = allArgs.match("mail");


        if (allArgs.length === 0) {
            all = true;
        }

        var output = t("commands.ping.text") + "\n\n";

        if (all || mail) {
            output += t("commands.ping.email") + " <a class='info' href='" + Config.dev.emailLink + "'>" + Config.dev.email + "</a>\n";
        }
        if (all || phone) {
            output += t("commands.ping.phone") + " <span class='info'>" + Config.dev.phone + "</span>\n";
        }
        if (all || twitter) {
            output += t("commands.ping.twitter") + " <a class='info' target='_blank' href='" + Config.dev.twitterLink + "'>" + Config.dev.twitter + "</a>\n";
        }
        if (all || skype) {
            output += t("commands.ping.skype") + " <a class='info' href='" + Config.dev.skypeLink + "'>" + Config.dev.skype + "</a>\n";
        }
        

        Commands.cout(output);
        return true;
    },
    /**
     * Me contacter
     * @returns {Boolean}
     */
    mail: function () {
        Commands.cout(t("commands.mail.text", {'link': Config.dev.emailLink}));
        openLink(Config.dev.emailLink, true);
        return true;
    },
    /**
     * Download my CV
     * @returns {Boolean}
     */
    downloadCV: function () {
        Commands.cout(t("commands.download.text", {'link': Config.cvDownloadLink}));
        openLink(Config.cvDownloadLink);
        return true;
    },
    /**
     * Download my CV
     * @returns {Boolean}
     */
    echo: function () {
        Commands.cout(t("commands.echo.text", {'link': Config.cvLink}));
        openLink(Config.cvLink, true);
       // Terminal.blockType = true;
        return true;
    },
    history: function () {
        Commands.cout(t("commands.history.text"));
        return true;
    },
    man: function () {
        Commands.cout(t("commands.finger.text"));
        return true;
    },
    /**
     * Switch language
     * @param {type} alls
     * @returns {Boolean}
     */
    switchLanguage: function (alls) {

        if (alls[1] === "en" || alls[1] === "fr") {
            Terminal.blockType = true;
            $.i18n.setLng(alls[1], function (t) {
                Commands.cout(t("global.switchLanguage"));
                Terminal.blockType = false;
            });
        }
        else {
            Commands.cout(t("global.switchNoLanguage"));
        }
        return true;

    },
    list: function () {
        Commands.cout(t("commands.ls.text"));
        return true;
    }


};