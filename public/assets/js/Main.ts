import * as $ from "jquery";

export class Main {

    private command : string = "";

    init() {

        var thisClass = this;

        $("body").on('keydown', function (e) {

            if(e.keyCode==17){
                return;
            }

            e.preventDefault();
            console.info(e.keyCode);

            switch(e.keyCode){

                case 8:
                    thisClass.command = thisClass.command.substring(0,-1);

                default:
                    thisClass.command += String.fromCharCode(e.keyCode);

            }

            thisClass.updateConsole();
        })
    }


    /**
     * Update the console text.
     */
    updateConsole(){
        var inConsole = $("#inConsoleDynamic");
        inConsole.text(this.command);

    }

}



