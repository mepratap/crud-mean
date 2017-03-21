"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var angular2_jwt_1 = require("angular2-jwt");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var UserService = (function () {
    function UserService(http) {
        this.http = http;
    }
    UserService.prototype.register = function (user) {
        var jsonUser = JSON.stringify(user);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var requestOptions = new http_1.RequestOptions({ headers: headers });
        return this.http.post('http://localhost:3000/users/register', jsonUser, requestOptions)
            .map(function (res) { return res.json(); })
            .catch(function (err) { return Observable_1.Observable.throw(err); });
    };
    UserService.prototype.login = function (username, password) {
        var loginDetails = {
            'username': username,
            'password': password
        };
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var requestOptions = new http_1.RequestOptions({ headers: headers });
        return this.http.post('http://localhost:3000/users/login', loginDetails, requestOptions)
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.profile = function () {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var requestOptions = new http_1.RequestOptions({ headers: headers });
        headers.append('Authorization', localStorage.getItem('token_id'));
        return this.http.get('http://localhost:3000/users/profile', requestOptions)
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.storeUserToken = function (token, user) {
        this.token = localStorage.setItem('token_id', token);
        this.user = localStorage.setItem('user', JSON.stringify(user));
    };
    UserService.prototype.logout = function () {
        this.token = null;
        this.user = null;
        localStorage.clear();
    };
    UserService.prototype.loggedIn = function () {
        return angular2_jwt_1.tokenNotExpired('token_id');
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map