import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    isLoggedIn: boolean;
    constructor(
        private userService: UserService,
        private router: Router
    ) { }

    ngOnInit() {
    }
    onLogout() {
        this.userService.logout();
        this.router.navigate(['/login']);
    }
}
