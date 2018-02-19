import {CommandInterface} from "../CommandInterface";

import i18next from 'i18next';


export abstract class BaseCommand implements CommandInterface {


    protected outputString:string ="";
    protected outputCode : number = 1;


    protected init(command: string): void {
        throw new Error("Method not implemented.");
    }
    output():  string {
        return this.outputString;
    }
    code() : number {
       return this.outputCode;
    }

    protected tr(key:string){
        return i18next.t(key);
    }

    protected trExists(key:string){
        return i18next.exists(key);
    }
}