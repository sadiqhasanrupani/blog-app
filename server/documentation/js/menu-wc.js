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
                                            'data-bs-target="#controllers-links-module-AppModule-7304f13db2e3c4addbeddc842752cb83e78c4050ac232a64e8e877e6f880633b863e4c9359bdadb6bd245d2846b8919f854ed3c6e27a4afff9db70dc4c6ca12f"' : 'data-bs-target="#xs-controllers-links-module-AppModule-7304f13db2e3c4addbeddc842752cb83e78c4050ac232a64e8e877e6f880633b863e4c9359bdadb6bd245d2846b8919f854ed3c6e27a4afff9db70dc4c6ca12f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-7304f13db2e3c4addbeddc842752cb83e78c4050ac232a64e8e877e6f880633b863e4c9359bdadb6bd245d2846b8919f854ed3c6e27a4afff9db70dc4c6ca12f"' :
                                            'id="xs-controllers-links-module-AppModule-7304f13db2e3c4addbeddc842752cb83e78c4050ac232a64e8e877e6f880633b863e4c9359bdadb6bd245d2846b8919f854ed3c6e27a4afff9db70dc4c6ca12f"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-7304f13db2e3c4addbeddc842752cb83e78c4050ac232a64e8e877e6f880633b863e4c9359bdadb6bd245d2846b8919f854ed3c6e27a4afff9db70dc4c6ca12f"' : 'data-bs-target="#xs-injectables-links-module-AppModule-7304f13db2e3c4addbeddc842752cb83e78c4050ac232a64e8e877e6f880633b863e4c9359bdadb6bd245d2846b8919f854ed3c6e27a4afff9db70dc4c6ca12f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-7304f13db2e3c4addbeddc842752cb83e78c4050ac232a64e8e877e6f880633b863e4c9359bdadb6bd245d2846b8919f854ed3c6e27a4afff9db70dc4c6ca12f"' :
                                        'id="xs-injectables-links-module-AppModule-7304f13db2e3c4addbeddc842752cb83e78c4050ac232a64e8e877e6f880633b863e4c9359bdadb6bd245d2846b8919f854ed3c6e27a4afff9db70dc4c6ca12f"' }>
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
                                            'data-bs-target="#controllers-links-module-AuthModule-96a77b9d9ffccabf22682f50ca73913707c6d31a3090e6bb087d999abb5fc4951b2218c1cc562ffddb8e035a8dcbb8213b6754962072e6b481c396d3505e6753"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-96a77b9d9ffccabf22682f50ca73913707c6d31a3090e6bb087d999abb5fc4951b2218c1cc562ffddb8e035a8dcbb8213b6754962072e6b481c396d3505e6753"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-96a77b9d9ffccabf22682f50ca73913707c6d31a3090e6bb087d999abb5fc4951b2218c1cc562ffddb8e035a8dcbb8213b6754962072e6b481c396d3505e6753"' :
                                            'id="xs-controllers-links-module-AuthModule-96a77b9d9ffccabf22682f50ca73913707c6d31a3090e6bb087d999abb5fc4951b2218c1cc562ffddb8e035a8dcbb8213b6754962072e6b481c396d3505e6753"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-96a77b9d9ffccabf22682f50ca73913707c6d31a3090e6bb087d999abb5fc4951b2218c1cc562ffddb8e035a8dcbb8213b6754962072e6b481c396d3505e6753"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-96a77b9d9ffccabf22682f50ca73913707c6d31a3090e6bb087d999abb5fc4951b2218c1cc562ffddb8e035a8dcbb8213b6754962072e6b481c396d3505e6753"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-96a77b9d9ffccabf22682f50ca73913707c6d31a3090e6bb087d999abb5fc4951b2218c1cc562ffddb8e035a8dcbb8213b6754962072e6b481c396d3505e6753"' :
                                        'id="xs-injectables-links-module-AuthModule-96a77b9d9ffccabf22682f50ca73913707c6d31a3090e6bb087d999abb5fc4951b2218c1cc562ffddb8e035a8dcbb8213b6754962072e6b481c396d3505e6753"' }>
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
                                            'data-bs-target="#controllers-links-module-PostModule-d98dafe89665e9bf7f9886fc60d63baf0564e8d8b7d09d5f44451786520e059709a8e0e06547c23ebff3db7131f9b11522d8cd0fb1d812becdf0ba9b1c34f209"' : 'data-bs-target="#xs-controllers-links-module-PostModule-d98dafe89665e9bf7f9886fc60d63baf0564e8d8b7d09d5f44451786520e059709a8e0e06547c23ebff3db7131f9b11522d8cd0fb1d812becdf0ba9b1c34f209"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostModule-d98dafe89665e9bf7f9886fc60d63baf0564e8d8b7d09d5f44451786520e059709a8e0e06547c23ebff3db7131f9b11522d8cd0fb1d812becdf0ba9b1c34f209"' :
                                            'id="xs-controllers-links-module-PostModule-d98dafe89665e9bf7f9886fc60d63baf0564e8d8b7d09d5f44451786520e059709a8e0e06547c23ebff3db7131f9b11522d8cd0fb1d812becdf0ba9b1c34f209"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostModule-d98dafe89665e9bf7f9886fc60d63baf0564e8d8b7d09d5f44451786520e059709a8e0e06547c23ebff3db7131f9b11522d8cd0fb1d812becdf0ba9b1c34f209"' : 'data-bs-target="#xs-injectables-links-module-PostModule-d98dafe89665e9bf7f9886fc60d63baf0564e8d8b7d09d5f44451786520e059709a8e0e06547c23ebff3db7131f9b11522d8cd0fb1d812becdf0ba9b1c34f209"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostModule-d98dafe89665e9bf7f9886fc60d63baf0564e8d8b7d09d5f44451786520e059709a8e0e06547c23ebff3db7131f9b11522d8cd0fb1d812becdf0ba9b1c34f209"' :
                                        'id="xs-injectables-links-module-PostModule-d98dafe89665e9bf7f9886fc60d63baf0564e8d8b7d09d5f44451786520e059709a8e0e06547c23ebff3db7131f9b11522d8cd0fb1d812becdf0ba9b1c34f209"' }>
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
                                            'data-bs-target="#controllers-links-module-UsersModule-a8b431770b91f862ade0a7b047b54fedd2b998c6e863c45fca7380707a1e00893d6a1106b2db6747bc9aa3033adef9c7e59ef5f84c607f3d417c035857bb5880"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-a8b431770b91f862ade0a7b047b54fedd2b998c6e863c45fca7380707a1e00893d6a1106b2db6747bc9aa3033adef9c7e59ef5f84c607f3d417c035857bb5880"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-a8b431770b91f862ade0a7b047b54fedd2b998c6e863c45fca7380707a1e00893d6a1106b2db6747bc9aa3033adef9c7e59ef5f84c607f3d417c035857bb5880"' :
                                            'id="xs-controllers-links-module-UsersModule-a8b431770b91f862ade0a7b047b54fedd2b998c6e863c45fca7380707a1e00893d6a1106b2db6747bc9aa3033adef9c7e59ef5f84c607f3d417c035857bb5880"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-a8b431770b91f862ade0a7b047b54fedd2b998c6e863c45fca7380707a1e00893d6a1106b2db6747bc9aa3033adef9c7e59ef5f84c607f3d417c035857bb5880"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-a8b431770b91f862ade0a7b047b54fedd2b998c6e863c45fca7380707a1e00893d6a1106b2db6747bc9aa3033adef9c7e59ef5f84c607f3d417c035857bb5880"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-a8b431770b91f862ade0a7b047b54fedd2b998c6e863c45fca7380707a1e00893d6a1106b2db6747bc9aa3033adef9c7e59ef5f84c607f3d417c035857bb5880"' :
                                        'id="xs-injectables-links-module-UsersModule-a8b431770b91f862ade0a7b047b54fedd2b998c6e863c45fca7380707a1e00893d6a1106b2db6747bc9aa3033adef9c7e59ef5f84c607f3d417c035857bb5880"' }>
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
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
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