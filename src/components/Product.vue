<template>
    <div class="container mt-3 mb-3">
        <div class="row">
            <div class="col-md-4 mt-3">
                <div class="card">
                    <div class="card-body">
                        <h1>Create product</h1>
                        <p>Please ensure to fill all data in the form to create a new prodcuct</p>
                        <div class="form-group">
                            <label>Product name</label>
                            <input type="text" v-model.trim="product" maxlength="50" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>SKU</label>
                            <input type="text" v-model.trim="sku" class="form-control" maxlength="12" minlength="12"
                                placeholder="12 characters">
                        </div>
                        <div class="form-group">
                            <label>Brand</label>
                            <input type="text" v-model.trim="brand" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Cost</label>
                            <money v-model="cost" class="form-control"></money>
                        </div>
                        <div class="form-group">
                            <label>Category</label>
                            <select class="form-control" v-model="category" @change="displaySubs()">
                                <option v-for="(item, index) in categories" :key="index" :value="item.id">
                                    {{item.category}}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Choose attributes</label>
                            <select class="form-control" v-model="subcategory">
                                <option v-for="(item, index) in subCategories" :key="index" :value="item.id">
                                    {{item.attr1}} - {{item.attr2}}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <button class="btn btn-apply btn-block" @click="createProduct()">Create product</button>
                        </div>

                        <div class="alert alert-danger" role="alert" v-if="errDisplay">
                            {{errText}}
                        </div>

                    </div>
                </div>
            </div>
            <div class="col-md-8 mt-3" v-if="paginatorComponent">
                <div class="row">
                    <div class="col-md-6 mt-3" v-for="(item, index) in products" :key="index">
                        <div class="card">
                            <div class="card-header">
                                <h3>{{item.product}}</h3>
                            </div>
                            <div class="card-body">
                                <h2 class="text-center" v-if="item.category==1">🖥️</h2>
                                <h2 class="text-center" v-if="item.category==2">💻</h2>
                                <h2 class="text-center" v-if="item.category==3">👞</h2>
                                <h3 class="text-center">{{item.brand}}</h3>
                                <ul class="list-group">
                                    <li class="list-group-item">{{item.catName}}</li>
                                    <li class="list-group-item">sku: {{item.sku}}</li>
                                    <li class="list-group-item">{{item.attr1}}</li>
                                    <li class="list-group-item">{{item.attr2}}</li>
                                    <li class="list-group-item">📅 {{moment.unix(item.createdAt).format("MM/DD/YYYY")}}
                                    </li>
                                    <li class="list-group-item">Unit price <strong class="text-danger">{{ item.cost |
                                            currency}} </strong></li>
                                </ul>

                                <button class="btn btn-primary2 btn-block mt-3 ">Utility {{ item.utility | currency}}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 mt-3">
                        <v-pagination v-model="pager" :page-count="totalPages"></v-pagination>
                    </div>
                </div>
            </div>
            <div class="col-nd-8 mt-3" v-else>
                <p class="text-muted text-center">There are no products yet!</p>
            </div>
        </div>
    </div>
</template>

<script>
    import calls from '../mixins/calls.js'
    import vPagination from 'vue-plain-pagination'
    export default {
        name: "Product",
        mixins: [calls],
        components: {
            vPagination
        },
        watch: {
            pager: function (val) {
                this.pager = val
                if(parseInt(val)>0){
                    this.mainGetProducts(val)
                }
            },

        },
        data() {
            return {
                pager: 1,
                totalPages:0,
                paginatorComponent:false,
                product: null,
                sku: null,
                brand: null,
                cost: 0.00,
                loading: null,
                errDisplay: false,
                errText: null,
                category: null,
                categories: [],
                subcategory: null,
                subCategories: [],
                products: []
            }
        },
        mounted() {
            this.getCategories().then(response => {
                this.categories = response
            });
            this.mainGetProducts(1)
        },
        methods: {
            displayError(message) {
                this.errText = message
                if (this.errDisplay) {
                    this.errDisplay = false
                }
                this.errDisplay = true
                setTimeout(() => {
                    this.errDisplay = false
                }, 5000);
            },
            async createProduct() {
                var regex = /^([A-Za-z0-9._@#$%&, ]|[á-ú]|[Á-Ú])+$/;
                if (!this.product) {
                    this.displayError("🙃 Please enter a product name");
                    return
                }

                var isValid = regex.test(this.product);
                if (!isValid) {
                    this.displayError("🙃 Product name contains special characters");
                    return
                }

                if (this.product.length > 50) {
                    this.displayError("🙃 Product name is too big");
                    return
                }

                if (!this.sku) {
                    this.displayError("🙃 Please enter the sku");
                    return
                }

                var skuRgex = /^([A-Za-z0-9])+$/;
                var isValidSku = skuRgex.test(this.sku);
                if (!isValidSku) {
                    this.displayError("🙃 Sku contains special characters");
                    return
                }

                if (this.sku.length != 12) {
                    this.displayError("🙃 Sku must contain 12 characters");
                    return
                }

                if (!this.brand) {
                    this.displayError("🙃 Please enter a brand");
                    return
                }

                var isValidBran = regex.test(this.brand);
                if (!isValidBran) {
                    this.displayError("🙃 Brand contains special characters");
                    return
                }

                if (this.brand.length > 30) {
                    this.displayError("🙃 Brand name is too big");
                    return
                }

                if (!this.cost) {
                    this.displayError("🙃 Please include the product cost");
                    return
                }

                if (this.cost == 0) {
                    this.displayError("🙃 Please include the product cost");
                    return
                }

                if (this.cost > 1000000) {
                    this.displayError("🙃 This is a huge cost, lets recosider it please!");
                    return
                }

                if (!this.category) {
                    this.displayError("🙃 Please select a category");
                    return
                }
                if (!this.subcategory) {
                    this.displayError("🙃 Please select product attributes");
                    return
                }

                const payload = {
                    product: this.product,
                    sku: this.sku,
                    brand: this.brand,
                    cost: this.cost,
                    category: this.category,
                    subcategory: this.subcategory
                };
                await this.storeProduct(payload).then(response => {
                    if (response == "ok") {
                        this.product = null
                        this.sku = null
                        this.brand = null
                        this.cost = 0
                        this.category = null
                        this.subcategory = null
                        this.mainGetProducts(1)
                        this.pager=1
                    }
                });

            },
            async displaySubs() {
                this.subcategory = null
                await this.getSubcategory(this.category).then(response => {
                    this.subCategories = response
                });
            },
            async mainGetProducts(page) {
                let vm = this
                this.paginatorComponent=false
                await this.getProducts(page).then(response => {
                    if(response){
                        this.products = response
                        setTimeout(() => {
                            vm.paginatorComponent=true
                            vm.totalPages = vm.products[0]['totalPages']
                        }, 500);
                        this.products.forEach(element => {
                            switch (element.category) {
                                case 1:
                                    element.utility = (parseFloat(element.cost) * 0.35) + parseFloat(element.cost)
                                    break;
                                case 2:
                                    element.utility = (parseFloat(element.cost) * 0.40) + parseFloat(element.cost)
                                    break;
                                case 3:
                                    element.utility = (parseFloat(element.cost) * 0.30) + parseFloat(element.cost)
                                    break;
    
                                default:
                                    break;
                            }
                        });
                    }
                })
                .catch((error)=>{
                    console.log('ERROR', error)
                    vm.paginatorComponent=false
                });
            },



        },
    };
</script>