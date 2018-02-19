import * as $ from "jquery";
import {CatCommand} from "./commands/impl/CatCommand";

import i18next from 'i18next';
import {CommandInterface} from "./commands/CommandInterface";
import {HelpCommand} from "./commands/impl/HelpCommand";
import {FingerCommand} from "./commands/impl/FingerCommand";


export class Terminal {

    private static username: string = "common:username-hirer";
    private static hostname: string = "common:hostname";
    private static currentPath: string = "~";

    static executeCommand(command: string) {


        // split command until each special characters
        let specialCharacters = ["&", "|"];


        let partCommand = "";
        for (let i = 0, s = command.length; i < s; i++) {

            let currentChar = command.charAt(i);

            if (specialCharacters.indexOf(currentChar) >= 0) {
                // it's special
                partCommand = "";

                // if current is &, so maybe a condition => &&
                if (currentChar === "&" && i < s - 1 && command[i + 1] === "&") {
                    console.info("next is condition");
                    i++;
                } else {
                    console.error("Background task not supported yet...");
                }


                continue;
            }

            partCommand += currentChar;

        }

        partCommand = $.trim(partCommand);
        console.info(partCommand);
        Terminal.executeDetermined(command, partCommand);

    }

    private static executeDetermined(originalCommand: string, partCommand: string) {

        let split = partCommand.split(" ");
        let askedCommand = split[0];
        delete split[0];
        let args = $.trim(split.join(" "));

        let command: CommandInterface;

        if (askedCommand == "cat") {
            command = new CatCommand(args);
            this.addLineConsole(originalCommand, command.output());
        }

        else if (askedCommand == "help") {
            command = new HelpCommand(args);
            this.addLineConsole(originalCommand, command.output());
        }
        else if (askedCommand == "finger") {
            command = new FingerCommand(args);
            this.addLineConsole(originalCommand, command.output());
        }



        else if (askedCommand === "clear") {
            Terminal.resetConsole();
        }

        else if (askedCommand.length > 0) {
            console.error(askedCommand + ": not found");
            this.addLineConsole(originalCommand, "<span class='cmdNotFound'>"+askedCommand + ": command not found</span>");
        }

        // empty line
        else {
            this.addLineConsole("", "");
        }

    }


    private static addLineConsole(original: string, outputCommand: string) {
        let headers = this.generateHeaders();

        let block = "<div class='line'>" + headers + Terminal.escapeHtml(original) + "<br>" + outputCommand + " </div>";

        $("#console").append(block);

    }

    public static resetInput() {
        $(".consoleInput .line-headers").html(this.generateHeaders());
    }

    public static resetConsole() {
        $("#console").html("");
    }

    /**
     * Generates headers.F
     * @returns {string}
     */
    private static generateHeaders() {
        let headers = "<span class='lineHeader'>" + i18next.t(this.username) + "@" + i18next.t(this.hostname) + "</span>:<span class='linePath'>" + this.currentPath + "</span>$ ";
        return headers;
    }



    public static escapeHtml(source: string) {

        let entityMap = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': '&quot;',
            "'": '&#39;',
            "/": '&#x2F;'
        };
        return String(source).replace(/[&<>"'\/]/g, s => entityMap[s]);
    }
}