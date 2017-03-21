"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./components/index");
var index_2 = require("./services/index");
exports.APP_ROUTES = [
    { path: '', component: index_1.HomeComponent, },
    { path: 'login', component: index_1.LoginComponent },
    { path: 'register', component: index_1.RegisterComponent },
    { path: 'profile', component: index_1.ProfileComponent, canActivate: [index_2.AuthGuardService] },
    { path: 'dashboard', component: index_1.DashboardComponent, canActivate: [index_2.AuthGuardService] }
];
//# sourceMappingURL=app.routes.js.map