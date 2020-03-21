

class Validator {

    
    static validateEmail(email:string) {

        console.log(email.length)
    }

    static validateFirstname(firstname: string) {
        this.validateTextShort(firstname);
    }

    static validateLastname(lastname: string) {
        this.validateTextShort(lastname);
    }

    static validateZipcode(zipcode:number) {
        this.validateNumber(zipcode);
        if(zipcode.toString().length > 5)
        {
            throw "Bitte nicht mehr als fünf  Zeichen eingeben"
        }
    }

    static validateCity(city: string) {
        this.validateTextShort(city);
    }

    static validateStreet(street: string) {
        this.validateTextShort(street);
    }

    static validatePhone(phone) {
        let regexpPhone = new RegExp('^[0-9+]+$');
        if(!regexpPhone.test(phone))
        {
            throw "Telefonnummer bitte in der Form +49931123 oder 12344 eingeben ohne Leerzeichen, - oder /";
        }
    }

    static validateDescription(description) {
        this.validateTextLong(description);
    }

    static validateRNAExctractionHours(hours) {
        this.validateNumber(hours);
    }

    static validateRTPCRHours(hours) {
        this.validateNumber(hours);
    }

    static validateHoursPerWeek(hours) {
        this.validateNumber(hours);
    }


    private static validateTextShort(text: string) {
        if(text.length > 200)
        {
            throw "Nicht mehr als 200 Zeichen eingeben";
        }
    }

    private static validateTextLong(text: string) {
        if(text.length > 2000)
        {
            throw "Nicht mehr als 2000 Zeichen eingeben";
        }
    }

    private static validateNumber(number) {
        if(!Number.isInteger(number))
        {
            throw "Bitte eine Zahl eingeben";
        }
    }
}


export default Validator