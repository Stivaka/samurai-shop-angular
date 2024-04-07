import { AbstractControl } from "@angular/forms"

export const passwordMatch = (pass:string, rePass:string) => {


    const validator = (form :AbstractControl) => {
        const passControl = form.get(pass);
        const rePassControl = form.get(rePass);

        if (!passControl || !rePassControl) return;

        if (passControl.value !== rePassControl.value){
            rePassControl.setErrors({notMatch: true});
        } else {
            const errors = rePassControl.errors;
            if(!errors) return;

            delete errors['notMatch'];
            rePassControl.setErrors(errors);
        }

    }

    return validator;
}