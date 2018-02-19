import {BaseCommand} from "./BaseCommand";
import {Terminal} from "../../Terminal";

export class HelpCommand extends BaseCommand {
    constructor(args: string) {
        super();

        this.init(args);
    }


    protected init(args: string): void {

        if (args.length > 0) {
            let key = "commands:" + Terminal.escapeHtml(args) + ".";

            if (this.trExists(key + "help")) {
                this.outputString = this.tr(key + "help");

                if (this.trExists(key + "usage")) {
                    this.outputString += "<br>" + this.tr(key + "usage");
                }

            } else {
                this.outputString = "<span class='cmdError'>No help for command " + Terminal.escapeHtml(args) + "</span>";
            }
            return;
        }

        // list he
        this.outputString =
            this.tr("commands:help.help") + "<br>"
            + this.tr("commands:cat.help")+ "<br>"
            + this.tr("commands:finger.help")+ "<br>"
            + this.tr("commands:history.help")+ "<br>"
            + this.tr("commands:mail.help")+ "<br>"
            + this.tr("commands:clear.help")+ "<br>"
            + this.tr("commands:ping.help")+ "<br>"
            + this.tr("commands:ls.help")+ "<br>"



    }

    output(): string {
        return this.outputString;
    }

    code(): number {
        return this.outputCode;
    }

}