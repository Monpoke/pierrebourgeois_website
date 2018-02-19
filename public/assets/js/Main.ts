import * as $ from "jquery";
import {Terminal} from "./Terminal";

import i18next from 'i18next';

import * as Backend from 'i18next-xhr-backend';
import * as i18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';


export class Main {

    private command: string = "";

    init() {

        this.initTranslation();

        var thisClass = this;

        // SPECIAL KEYS
        $('body').on(' keydown',function (e) {
            if (e.keyCode == 8) thisClass.removeKeyCallback();
            else if(e.keyCode===13) thisClass.validateKeyCallback();
        });

        $("body").on('keypress', function (e) {
            e.preventDefault();


            thisClass.command += String.fromCharCode(e.keyCode);

            thisClass.updateConsole();
        });
    }

    private initTranslation() {

        let thisClass = this;

        i18next
            .use(Backend)
            .use(i18nextBrowserLanguageDetector)
            .init({
            ns: ["common","commands","files"],
            defaultNS: "common",
            lng: 'fr_FR',
            fallbackLng: 'fr_FR',
            debug: true,

            backend: {
                loadPath: '/assets/langs/{{lng}}/{{ns}}.json',
            },

            saveMissing: true,
            missingKeyHandler: function(lng, ns, key, fallbackValue) {
                console.info("missing key!", lng,ns,key,fallbackValue);
            }
        }, function(err, t) {

                // reset console
                thisClass.initConsole();
                console.info("Console initied");
        });

    }

    /**
     * This is called when the console is initied..
     */
    private initConsole() {

        this.updateConsole();
    }


    validateKeyCallback() {
        Terminal.executeCommand(this.command);
        this.command="";
        this.updateConsole();
    }


    removeKeyCallback(){
        this.command = this.command.substring(0, this.command.length-1);
        this.updateConsole();
    }

    /**
     * Update the console text.
     */
    updateConsole() {
        var inConsole = $("#inConsoleDynamic");
        this.command = (this.command);
        inConsole.text(this.command);
        Terminal.resetInput();
    }

}



