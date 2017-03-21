import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ValidatorService } from '../../services/validator.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loginValidate: boolean = true;
    message: string;
    constructor(
        private userService: UserService,
        private validatorService: ValidatorService,
        private formBuilder: FormBuilder,
        private router: Router
    ) { }


    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        this.userService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(data => {
            if (data.success) {
                this.userService.storeUserToken(data.token, data.user);
                this.router.navigate(['/dashboard']);
            } else {
                this.loginValidate = false;
                this.message = data.message;
            }
        });
    }
}
