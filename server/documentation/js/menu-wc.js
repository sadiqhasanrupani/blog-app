'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nest-first-app documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-8d7a17444ce15b03fa42c53fa4577a0a5e66b8a14b63e523a3f89e3b4204e43e0c83c1ee28f8153922a08fc203b617d298ad0dbf26cd282633d7345fa237c54a"' : 'data-bs-target="#xs-controllers-links-module-AppModule-8d7a17444ce15b03fa42c53fa4577a0a5e66b8a14b63e523a3f89e3b4204e43e0c83c1ee28f8153922a08fc203b617d298ad0dbf26cd282633d7345fa237c54a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-8d7a17444ce15b03fa42c53fa4577a0a5e66b8a14b63e523a3f89e3b4204e43e0c83c1ee28f8153922a08fc203b617d298ad0dbf26cd282633d7345fa237c54a"' :
                                            'id="xs-controllers-links-module-AppModule-8d7a17444ce15b03fa42c53fa4577a0a5e66b8a14b63e523a3f89e3b4204e43e0c83c1ee28f8153922a08fc203b617d298ad0dbf26cd282633d7345fa237c54a"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-8d7a17444ce15b03fa42c53fa4577a0a5e66b8a14b63e523a3f89e3b4204e43e0c83c1ee28f8153922a08fc203b617d298ad0dbf26cd282633d7345fa237c54a"' : 'data-bs-target="#xs-injectables-links-module-AppModule-8d7a17444ce15b03fa42c53fa4577a0a5e66b8a14b63e523a3f89e3b4204e43e0c83c1ee28f8153922a08fc203b617d298ad0dbf26cd282633d7345fa237c54a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-8d7a17444ce15b03fa42c53fa4577a0a5e66b8a14b63e523a3f89e3b4204e43e0c83c1ee28f8153922a08fc203b617d298ad0dbf26cd282633d7345fa237c54a"' :
                                        'id="xs-injectables-links-module-AppModule-8d7a17444ce15b03fa42c53fa4577a0a5e66b8a14b63e523a3f89e3b4204e43e0c83c1ee28f8153922a08fc203b617d298ad0dbf26cd282633d7345fa237c54a"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-60d1fbeb39448879964069ce0712fb197833c5cd660a5dcf3f68ad870224cefc1af45890c3a62452c7498c6f1c9d259499595d57f6921d464eed3c26a515b269"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-60d1fbeb39448879964069ce0712fb197833c5cd660a5dcf3f68ad870224cefc1af45890c3a62452c7498c6f1c9d259499595d57f6921d464eed3c26a515b269"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-60d1fbeb39448879964069ce0712fb197833c5cd660a5dcf3f68ad870224cefc1af45890c3a62452c7498c6f1c9d259499595d57f6921d464eed3c26a515b269"' :
                                            'id="xs-controllers-links-module-AuthModule-60d1fbeb39448879964069ce0712fb197833c5cd660a5dcf3f68ad870224cefc1af45890c3a62452c7498c6f1c9d259499595d57f6921d464eed3c26a515b269"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-60d1fbeb39448879964069ce0712fb197833c5cd660a5dcf3f68ad870224cefc1af45890c3a62452c7498c6f1c9d259499595d57f6921d464eed3c26a515b269"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-60d1fbeb39448879964069ce0712fb197833c5cd660a5dcf3f68ad870224cefc1af45890c3a62452c7498c6f1c9d259499595d57f6921d464eed3c26a515b269"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-60d1fbeb39448879964069ce0712fb197833c5cd660a5dcf3f68ad870224cefc1af45890c3a62452c7498c6f1c9d259499595d57f6921d464eed3c26a515b269"' :
                                        'id="xs-injectables-links-module-AuthModule-60d1fbeb39448879964069ce0712fb197833c5cd660a5dcf3f68ad870224cefc1af45890c3a62452c7498c6f1c9d259499595d57f6921d464eed3c26a515b269"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostModule.html" data-type="entity-link" >PostModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostModule-5b68e5e017d5578c5d7e50b27f5b44f3ecc880b53244188bbd1bd78d89b501866a4fb9c51192adf64eaf5acdbc497f983877ba2eb3e16d1ccda250d96e0fe611"' : 'data-bs-target="#xs-controllers-links-module-PostModule-5b68e5e017d5578c5d7e50b27f5b44f3ecc880b53244188bbd1bd78d89b501866a4fb9c51192adf64eaf5acdbc497f983877ba2eb3e16d1ccda250d96e0fe611"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostModule-5b68e5e017d5578c5d7e50b27f5b44f3ecc880b53244188bbd1bd78d89b501866a4fb9c51192adf64eaf5acdbc497f983877ba2eb3e16d1ccda250d96e0fe611"' :
                                            'id="xs-controllers-links-module-PostModule-5b68e5e017d5578c5d7e50b27f5b44f3ecc880b53244188bbd1bd78d89b501866a4fb9c51192adf64eaf5acdbc497f983877ba2eb3e16d1ccda250d96e0fe611"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostModule-5b68e5e017d5578c5d7e50b27f5b44f3ecc880b53244188bbd1bd78d89b501866a4fb9c51192adf64eaf5acdbc497f983877ba2eb3e16d1ccda250d96e0fe611"' : 'data-bs-target="#xs-injectables-links-module-PostModule-5b68e5e017d5578c5d7e50b27f5b44f3ecc880b53244188bbd1bd78d89b501866a4fb9c51192adf64eaf5acdbc497f983877ba2eb3e16d1ccda250d96e0fe611"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostModule-5b68e5e017d5578c5d7e50b27f5b44f3ecc880b53244188bbd1bd78d89b501866a4fb9c51192adf64eaf5acdbc497f983877ba2eb3e16d1ccda250d96e0fe611"' :
                                        'id="xs-injectables-links-module-PostModule-5b68e5e017d5578c5d7e50b27f5b44f3ecc880b53244188bbd1bd78d89b501866a4fb9c51192adf64eaf5acdbc497f983877ba2eb3e16d1ccda250d96e0fe611"' }>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-10d630bb6045e612c1a83eb730f31a925f361ce38d6e8f6f56632695f6a927ff161b1342c74c5dd80ac891ce03f44c4bcf31041e46a8e80f227d384bf87ed85d"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-10d630bb6045e612c1a83eb730f31a925f361ce38d6e8f6f56632695f6a927ff161b1342c74c5dd80ac891ce03f44c4bcf31041e46a8e80f227d384bf87ed85d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-10d630bb6045e612c1a83eb730f31a925f361ce38d6e8f6f56632695f6a927ff161b1342c74c5dd80ac891ce03f44c4bcf31041e46a8e80f227d384bf87ed85d"' :
                                            'id="xs-controllers-links-module-UsersModule-10d630bb6045e612c1a83eb730f31a925f361ce38d6e8f6f56632695f6a927ff161b1342c74c5dd80ac891ce03f44c4bcf31041e46a8e80f227d384bf87ed85d"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-10d630bb6045e612c1a83eb730f31a925f361ce38d6e8f6f56632695f6a927ff161b1342c74c5dd80ac891ce03f44c4bcf31041e46a8e80f227d384bf87ed85d"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-10d630bb6045e612c1a83eb730f31a925f361ce38d6e8f6f56632695f6a927ff161b1342c74c5dd80ac891ce03f44c4bcf31041e46a8e80f227d384bf87ed85d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-10d630bb6045e612c1a83eb730f31a925f361ce38d6e8f6f56632695f6a927ff161b1342c74c5dd80ac891ce03f44c4bcf31041e46a8e80f227d384bf87ed85d"' :
                                        'id="xs-injectables-links-module-UsersModule-10d630bb6045e612c1a83eb730f31a925f361ce38d6e8f6f56632695f6a927ff161b1342c74c5dd80ac891ce03f44c4bcf31041e46a8e80f227d384bf87ed85d"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostMetaOptionsDto.html" data-type="entity-link" >CreatePostMetaOptionsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetPostsParamDto.html" data-type="entity-link" >GetPostsParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersParamDto.html" data-type="entity-link" >GetUsersParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchPostDto.html" data-type="entity-link" >PatchPostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});