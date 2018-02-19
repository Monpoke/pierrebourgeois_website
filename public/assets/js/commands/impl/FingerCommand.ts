import {BaseCommand} from "./BaseCommand";
import {Terminal} from "../../Terminal";

export class FingerCommand extends BaseCommand {
    constructor(args: string) {
        super();

        this.init(args);
    }


    protected init(args: string): void {

        this.outputString = this.tr("commands:finger.text");

    }

}