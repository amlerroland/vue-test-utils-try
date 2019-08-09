<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header" v-text="title"></div>

                    <div class="card-body">
                        <div>
                            <label for="page_length">Page Length</label>
                            <select name="page_length" id="page_length" v-model="pageLength" @change="changeLength">
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </div>
                        <ul class="products">
                            <li v-for="product in products" :key="product.id" v-text="product.name" class="product"></li>
                        </ul>
                        <div class="pagination">
                            <button v-for="n in pages" :key="n" v-text="n" :data-page="n" @click="changePage(n)"></button>
                        </div>
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
            title: 'Example Component',
            pageLength: '10',
            currentPage: 1,
            recordsTotal: 0
        };
    },
    methods: {
        changeLength() {
            this.currentPage = 1;
            this.get();
        },
        changePage(page) {
            this.currentPage = page;
            this.get();
        },
        async get() {
            let response = await axios.get('/api/products', {
                params: {
                    pageLength: this.pageLength,
                    currentPage: this.currentPage,
                    recordsTotal: 0
                }
            });

            this.products = response.data.products;
            this.recordsTotal = response.data.recordsTotal;
        }
    },
    computed: {
        pages() {
            return Math.ceil(this. recordsTotal / this.pageLength);
        },
    },
    created() {
        this.get();
    },
    mounted() {
        // console.log('Component mounted.')
    }
}
</script>
