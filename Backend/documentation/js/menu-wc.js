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
                    <a href="index.html" data-type="index-link">ASE_Project documentation</a>
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
                                            'data-bs-target="#controllers-links-module-AppModule-2619e26037647615f1a129cd53e6fc2338a29388bfb5a82b506e80e892e1025e5342c383cea06deb18153edc8753833ab9fb5deb6abe163087b2599315037c67"' : 'data-bs-target="#xs-controllers-links-module-AppModule-2619e26037647615f1a129cd53e6fc2338a29388bfb5a82b506e80e892e1025e5342c383cea06deb18153edc8753833ab9fb5deb6abe163087b2599315037c67"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-2619e26037647615f1a129cd53e6fc2338a29388bfb5a82b506e80e892e1025e5342c383cea06deb18153edc8753833ab9fb5deb6abe163087b2599315037c67"' :
                                            'id="xs-controllers-links-module-AppModule-2619e26037647615f1a129cd53e6fc2338a29388bfb5a82b506e80e892e1025e5342c383cea06deb18153edc8753833ab9fb5deb6abe163087b2599315037c67"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/CustomerController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomerController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/ProductController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/PurchaseOrderController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PurchaseOrderController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-2619e26037647615f1a129cd53e6fc2338a29388bfb5a82b506e80e892e1025e5342c383cea06deb18153edc8753833ab9fb5deb6abe163087b2599315037c67"' : 'data-bs-target="#xs-injectables-links-module-AppModule-2619e26037647615f1a129cd53e6fc2338a29388bfb5a82b506e80e892e1025e5342c383cea06deb18153edc8753833ab9fb5deb6abe163087b2599315037c67"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-2619e26037647615f1a129cd53e6fc2338a29388bfb5a82b506e80e892e1025e5342c383cea06deb18153edc8753833ab9fb5deb6abe163087b2599315037c67"' :
                                        'id="xs-injectables-links-module-AppModule-2619e26037647615f1a129cd53e6fc2338a29388bfb5a82b506e80e892e1025e5342c383cea06deb18153edc8753833ab9fb5deb6abe163087b2599315037c67"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CustomerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomerService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GeofencingService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GeofencingService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProductService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PurchaseOrderService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PurchaseOrderService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CustomerModule.html" data-type="entity-link" >CustomerModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/GeofencingModule.html" data-type="entity-link" >GeofencingModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-GeofencingModule-35fdf955370a32a9d692914c5bae5ba5e5031b143c26039bc5d30ddd3bf1d786caacec597dc5045ac7fd275643ee631b1fce11d96cca0ebba522c8cd84ad2493"' : 'data-bs-target="#xs-controllers-links-module-GeofencingModule-35fdf955370a32a9d692914c5bae5ba5e5031b143c26039bc5d30ddd3bf1d786caacec597dc5045ac7fd275643ee631b1fce11d96cca0ebba522c8cd84ad2493"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-GeofencingModule-35fdf955370a32a9d692914c5bae5ba5e5031b143c26039bc5d30ddd3bf1d786caacec597dc5045ac7fd275643ee631b1fce11d96cca0ebba522c8cd84ad2493"' :
                                            'id="xs-controllers-links-module-GeofencingModule-35fdf955370a32a9d692914c5bae5ba5e5031b143c26039bc5d30ddd3bf1d786caacec597dc5045ac7fd275643ee631b1fce11d96cca0ebba522c8cd84ad2493"' }>
                                            <li class="link">
                                                <a href="controllers/GeofencingController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GeofencingController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-GeofencingModule-35fdf955370a32a9d692914c5bae5ba5e5031b143c26039bc5d30ddd3bf1d786caacec597dc5045ac7fd275643ee631b1fce11d96cca0ebba522c8cd84ad2493"' : 'data-bs-target="#xs-injectables-links-module-GeofencingModule-35fdf955370a32a9d692914c5bae5ba5e5031b143c26039bc5d30ddd3bf1d786caacec597dc5045ac7fd275643ee631b1fce11d96cca0ebba522c8cd84ad2493"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-GeofencingModule-35fdf955370a32a9d692914c5bae5ba5e5031b143c26039bc5d30ddd3bf1d786caacec597dc5045ac7fd275643ee631b1fce11d96cca0ebba522c8cd84ad2493"' :
                                        'id="xs-injectables-links-module-GeofencingModule-35fdf955370a32a9d692914c5bae5ba5e5031b143c26039bc5d30ddd3bf1d786caacec597dc5045ac7fd275643ee631b1fce11d96cca0ebba522c8cd84ad2493"' }>
                                        <li class="link">
                                            <a href="injectables/GeofencingService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GeofencingService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LockerModule.html" data-type="entity-link" >LockerModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PrismaModule.html" data-type="entity-link" >PrismaModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PrismaModule-612833b7d102a4d3e11519c3dd0474733878f1503f42aa5187cf6305e534fe39c523bb66986b064e2b4941edc4cde9cbfd1288b75bacea358c7c2fe9f48d0e69"' : 'data-bs-target="#xs-injectables-links-module-PrismaModule-612833b7d102a4d3e11519c3dd0474733878f1503f42aa5187cf6305e534fe39c523bb66986b064e2b4941edc4cde9cbfd1288b75bacea358c7c2fe9f48d0e69"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrismaModule-612833b7d102a4d3e11519c3dd0474733878f1503f42aa5187cf6305e534fe39c523bb66986b064e2b4941edc4cde9cbfd1288b75bacea358c7c2fe9f48d0e69"' :
                                        'id="xs-injectables-links-module-PrismaModule-612833b7d102a4d3e11519c3dd0474733878f1503f42aa5187cf6305e534fe39c523bb66986b064e2b4941edc4cde9cbfd1288b75bacea358c7c2fe9f48d0e69"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductModule.html" data-type="entity-link" >ProductModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProductModule-00678015b744bddd96c35b4ca082b2e703edb86119ebb750e52b0499cc3d63915276ea2a48f4e4fbce86e4f16c603b0ca50816ee0a70a42b7958179a30185faa"' : 'data-bs-target="#xs-injectables-links-module-ProductModule-00678015b744bddd96c35b4ca082b2e703edb86119ebb750e52b0499cc3d63915276ea2a48f4e4fbce86e4f16c603b0ca50816ee0a70a42b7958179a30185faa"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductModule-00678015b744bddd96c35b4ca082b2e703edb86119ebb750e52b0499cc3d63915276ea2a48f4e4fbce86e4f16c603b0ca50816ee0a70a42b7958179a30185faa"' :
                                        'id="xs-injectables-links-module-ProductModule-00678015b744bddd96c35b4ca082b2e703edb86119ebb750e52b0499cc3d63915276ea2a48f4e4fbce86e4f16c603b0ca50816ee0a70a42b7958179a30185faa"' }>
                                        <li class="link">
                                            <a href="injectables/ProductService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PurchaseOrderModule.html" data-type="entity-link" >PurchaseOrderModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PurchaseOrderModule-a688ecde17764a1afaf4dc76b6e9ef67ab00f4272592ed268b4c018106f3fe903a8a67f5278c84e7d4f34e657d843eaa3e42bfe61760c740d9efe107c1ade1b7"' : 'data-bs-target="#xs-injectables-links-module-PurchaseOrderModule-a688ecde17764a1afaf4dc76b6e9ef67ab00f4272592ed268b4c018106f3fe903a8a67f5278c84e7d4f34e657d843eaa3e42bfe61760c740d9efe107c1ade1b7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PurchaseOrderModule-a688ecde17764a1afaf4dc76b6e9ef67ab00f4272592ed268b4c018106f3fe903a8a67f5278c84e7d4f34e657d843eaa3e42bfe61760c740d9efe107c1ade1b7"' :
                                        'id="xs-injectables-links-module-PurchaseOrderModule-a688ecde17764a1afaf4dc76b6e9ef67ab00f4272592ed268b4c018106f3fe903a8a67f5278c84e7d4f34e657d843eaa3e42bfe61760c740d9efe107c1ade1b7"' }>
                                        <li class="link">
                                            <a href="injectables/GeofencingService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GeofencingService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PurchaseOrderService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PurchaseOrderService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-2f6cb13d06cdc366d2bb3d071457e4aac589c3493ca98e3073d4a85889c5b4c3f1bfd98f4f6b5e1594e65706fc66795131cea490cb6fc83db8e8195fec999035"' : 'data-bs-target="#xs-injectables-links-module-UserModule-2f6cb13d06cdc366d2bb3d071457e4aac589c3493ca98e3073d4a85889c5b4c3f1bfd98f4f6b5e1594e65706fc66795131cea490cb6fc83db8e8195fec999035"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-2f6cb13d06cdc366d2bb3d071457e4aac589c3493ca98e3073d4a85889c5b4c3f1bfd98f4f6b5e1594e65706fc66795131cea490cb6fc83db8e8195fec999035"' :
                                        'id="xs-injectables-links-module-UserModule-2f6cb13d06cdc366d2bb3d071457e4aac589c3493ca98e3073d4a85889c5b4c3f1bfd98f4f6b5e1594e65706fc66795131cea490cb6fc83db8e8195fec999035"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CustomerController.html" data-type="entity-link" >CustomerController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/GeofencingController.html" data-type="entity-link" >GeofencingController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ProductController.html" data-type="entity-link" >ProductController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PurchaseOrderController.html" data-type="entity-link" >PurchaseOrderController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserController.html" data-type="entity-link" >UserController</a>
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
                                <a href="classes/CreateCustomerDto.html" data-type="entity-link" >CreateCustomerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeliveryPreferenceDto.html" data-type="entity-link" >DeliveryPreferenceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GeoFencingDto.html" data-type="entity-link" >GeoFencingDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderEntriesDto.html" data-type="entity-link" >OrderEntriesDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrdersDto.html" data-type="entity-link" >OrdersDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductDto.html" data-type="entity-link" >ProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SendSMSDto.html" data-type="entity-link" >SendSMSDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignInDto.html" data-type="entity-link" >SignInDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignUpDto.html" data-type="entity-link" >SignUpDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCustomerDto.html" data-type="entity-link" >UpdateCustomerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateOrdersDto.html" data-type="entity-link" >UpdateOrdersDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UsersDto.html" data-type="entity-link" >UsersDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CustomerService.html" data-type="entity-link" >CustomerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GeofencingService.html" data-type="entity-link" >GeofencingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PrismaService.html" data-type="entity-link" >PrismaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductService.html" data-type="entity-link" >ProductService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PurchaseOrderService.html" data-type="entity-link" >PurchaseOrderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
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
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
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