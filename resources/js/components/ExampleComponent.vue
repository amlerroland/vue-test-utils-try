<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Example Component</div>

                    <div class="card-body">
                        <ul class="products">
                            <li v-for="product in products" :key="product.id" v-text="product.name"></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return {
            products: [],
        };
    },
    methods: {
        get() {
            axios.get('/api/products', {
                params: {

                }
            }).done(response => {
                this.products = response.data.products;
            });
        }
    },
    mounted() {
        // console.log('Component mounted.')
    }
}
</script>
