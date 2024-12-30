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
exports.CreatePostDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const postType_enum_1 = require("../enums/postType.enum");
const status_enum_1 = require("../enums/status.enum");
const create_post_meta_options_dto_1 = require("./create-post-meta-options.dto");
const swagger_1 = require("@nestjs/swagger");
class CreatePostDto {
}
exports.CreatePostDto = CreatePostDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'title',
        example: 'Awesome blog',
        type: 'string',
        description: 'title should have at least 4 characters',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePostDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'postType',
        enum: postType_enum_1.postType,
        description: "postType must be the following: 'post', 'page', 'story', 'series'",
    }),
    (0, class_validator_1.IsEnum)(postType_enum_1.postType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePostDto.prototype, "postType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'slug',
        example: 'my-blog-post',
        description: "For example: 'my-url'",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[a-z0-9]+(-[a-z0-9]+)*$/, {
        message: "A slug should be all small letters and uses only '-' and without spaces. For example 'my-url'",
    }),
    __metadata("design:type", String)
], CreatePostDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'status',
        enum: status_enum_1.status,
        description: "status must be the following: 'draft', 'scheduled', 'review', 'published'",
    }),
    (0, class_validator_1.IsEnum)(status_enum_1.status),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePostDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        title: 'content',
        example: 'The post content',
        description: 'This is the content of the post',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePostDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        title: 'schema',
        description: 'Serialize your JSON object else a validation error will be thrown',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsJSON)(),
    __metadata("design:type", String)
], CreatePostDto.prototype, "schema", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        title: 'featuredImageUrl',
        description: 'Featured image for your blog post',
        example: 'http://localhost.com/images/image1.jpg',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreatePostDto.prototype, "featuredImageUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The date on which the blog post is published',
        example: '2024-03-16',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsISO8601)(),
    __metadata("design:type", Date)
], CreatePostDto.prototype, "publishOn", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Array of tags passed as string values',
        type: 'array',
        example: ['nestJs', 'typescript'],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.MinLength)(3, { each: true }),
    __metadata("design:type", Array)
], CreatePostDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: 'array',
        required: false,
        items: {
            type: 'object',
            properties: {
                key: {
                    type: 'string',
                    description: 'The key can be any string identifier for your meta option',
                    example: 'sidebarEnabled',
                },
                value: {
                    type: 'any',
                    description: 'Any value that you want to save to the key',
                    example: true,
                },
            },
        },
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_post_meta_options_dto_1.CreatePostMetaOptionsDto),
    __metadata("design:type", Array)
], CreatePostDto.prototype, "metaOptions", void 0);
//# sourceMappingURL=create-post.dto.js.map