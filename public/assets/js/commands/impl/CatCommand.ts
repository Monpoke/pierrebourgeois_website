import {BaseCommand} from "./BaseCommand";
import {Terminal} from "../../Terminal";

export class CatCommand extends BaseCommand {
    constructor(args: string) {
        super();

        this.init(args);
    }


    protected init(args: string): void {
        let argsList = args.split(" ");
        if (args.length == 0 || argsList.length == 0) {
            this.outputCode = 1;
            this.outputString = this.tr("commands:cat.usage");
        } else {


            // split on arguments
            for (let i = 0, s = argsList.length; i < s; i++) {

                let filename = argsList[i];
                let newFilename = filename.replace(/\//gi, ".");

                // begins by ..
                // begins by .

                // begins by /
                if(filename.charAt(0)=="/"){
                    newFilename = newFilename.substr(1,newFilename.length);
                }

                let filesContent = "files:"+newFilename;
                console.log("file="+filesContent);

                if (this.trExists(filesContent))
                    this.outputString += this.tr(filesContent)+"<br>";
                else
                    this.outputString += Terminal.escapeHtml(filename) + ": no such file";


            }


        }
    }

    output(): string {
        return this.outputString;
    }

    code(): number {
        return this.outputCode;
    }

}