import { Injectable } from '@angular/core';

import { FormControl, AbstractControl } from '@angular/forms';

@Injectable()
export class ValidatorService {
    passwordValidator = (control: AbstractControl): { [key: string]: boolean } => {
        const password = control.get('password');
        const confirm = control.get('confirm');

        if (!password || !confirm) {
            return null;
        }
        if (password.value === confirm.value) {
            return null;
        } else {
            return { noMatch: true };
        }
    }

    emailValidator = (control: FormControl): {[key: string]: boolean } => {
        if (!control) {
            return null;
        }
        const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

         if (regex.test(control.value)) {
            return null;
        } else {
            return {
                noMatch: true
            };
        }
    }

}
