import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ValidatorService } from '../../services/validator.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;

    constructor(
        private userService: UserService,
        private fb: FormBuilder,
        private vs: ValidatorService,
        private router: Router
        ) { }

    ngOnInit() {
        this.registerForm = this.fb.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', [ Validators.required, this.vs.emailValidator]],
            username: ['', Validators.required],
            password: ['', Validators.required],
            confirm: ['', Validators.required]
        },
        { validator: this.vs.passwordValidator});
    }

    onSubmit() {
        delete this.registerForm.value.confirm;
        this.userService.register(this.registerForm.value).subscribe();
        this.router.navigate(['/profile']);
    }


}
