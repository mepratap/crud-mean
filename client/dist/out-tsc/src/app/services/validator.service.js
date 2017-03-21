"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ValidatorService = (function () {
    function ValidatorService() {
        this.passwordValidator = function (control) {
            var password = control.get('password');
            var confirm = control.get('confirm');
            if (!password || !confirm) {
                return null;
            }
            if (password.value === confirm.value) {
                return null;
            }
            else {
                return { noMatch: true };
            }
        };
        this.emailValidator = function (control) {
            if (!control) {
                return null;
            }
            var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (regex.test(control.value)) {
                return null;
            }
            else {
                return {
                    noMatch: true
                };
            }
        };
    }
    return ValidatorService;
}());
ValidatorService = __decorate([
    core_1.Injectable()
], ValidatorService);
exports.ValidatorService = ValidatorService;
//# sourceMappingURL=validator.service.js.map