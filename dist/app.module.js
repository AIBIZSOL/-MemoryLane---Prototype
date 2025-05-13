"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const customer_module_1 = require("./customer/customer.module");
const media_module_1 = require("./media/media.module");
const story_module_1 = require("./story/story.module");
const storyboard_module_1 = require("./storyboard/storyboard.module");
const ai_module_1 = require("./ai/ai.module");
const database_service_1 = require("./database/database.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            auth_module_1.AuthModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'uploads'),
                serveRoot: '/uploads',
            }),
            customer_module_1.CustomerModule,
            media_module_1.MediaModule,
            story_module_1.StoryModule,
            storyboard_module_1.StoryboardModule,
            ai_module_1.AiModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, database_service_1.DatabaseService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map