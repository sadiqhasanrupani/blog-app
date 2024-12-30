import { PostsService } from './providers/posts.service';
import { GetPostsParamDto } from './dtos/get-posts-param.dto';
import { CreatePostDto } from './dtos/create-post.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    findAll(getPostsParamDto: GetPostsParamDto): {
        message: string;
    };
    createPost(createPostDto: CreatePostDto): {
        postPostsBodyDto: CreatePostDto;
    };
}
