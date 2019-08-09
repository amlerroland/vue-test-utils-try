import { mount } from '@vue/test-utils'
import moxios from 'moxios';
import ExampleComponent from './ExampleComponent.vue'

describe('ExampleComponent', () => {
    let wrapper;

    beforeEach(function () {
        moxios.install();

        wrapper = mount(ExampleComponent);
    })

    afterEach(function () {
        moxios.uninstall()
    })

    test('displays the example component title', () => {
        see('Example Component');
    });

    test('displays the product list', (done) => {
        expect(wrapper.find('.products').exists()).toBe(true);

        respondToMostRecent().then(() => {
            expect(wrapper.vm.products.length).toBe(10);
            see('product 1', '.products');
            see('product 2', '.products');
            done();
        });
    });

    test('page length select is on the page', () => {
        see('Page Length');
    });

    test('page length select gets me a new set of products', async () => {
        await respondToMostRecent();

        const options = wrapper.find('#page_length').findAll('option');

        await options.at(1).setSelected();

        await respondToMostRecent();

        see('product 11', '.products');
    });

    test.only('displays the correct pagination', async () => {
        await respondToMostRecent();

        expect(wrapper.find('.pagination').findAll('button').length).toBe(3);

        let button = wrapper.find('.pagination').find('button[data-page="2"]');

        await button.trigger('click');

        await respondToMostRecent();

        see('product 11', '.products');
    });

    let see = (text, selector) => {
        let wrap = selector ? wrapper.find(selector) : wrapper;

        expect(wrap.html()).toContain(text);
    };

    let respondToMostRecent = (responseData = null) => {
        let request = moxios.requests.mostRecent();

        return request.respondWith({
            status: 200,
            response: responseData || {
                recordsTotal: 25,
                products: getProducts(request.config.params.pageLength, request.config.params.currentPage)
            }
        });
    };

    let getProducts = (length, page) => {
        let start = length * (page - 1);

        return products.slice(start, length * page);
    };

    let products = [
        {id: 1, name: 'product 1', price: 101},
        {id: 2, name: 'product 2', price: 102},
        {id: 3, name: 'product 3', price: 103},
        {id: 4, name: 'product 4', price: 104},
        {id: 5, name: 'product 5', price: 105},
        {id: 6, name: 'product 6', price: 106},
        {id: 7, name: 'product 7', price: 107},
        {id: 8, name: 'product 8', price: 108},
        {id: 9, name: 'product 9', price: 109},
        {id: 10, name: 'product 10', price: 110},
        {id: 11, name: 'product 11', price: 111},
        {id: 12, name: 'product 12', price: 112},
        {id: 13, name: 'product 13', price: 113},
        {id: 14, name: 'product 14', price: 114},
        {id: 15, name: 'product 15', price: 115},
        {id: 16, name: 'product 16', price: 116},
        {id: 17, name: 'product 17', price: 117},
        {id: 18, name: 'product 18', price: 118},
        {id: 19, name: 'product 19', price: 119},
        {id: 20, name: 'product 20', price: 120},
        {id: 21, name: 'product 21', price: 121},
        {id: 22, name: 'product 22', price: 122},
        {id: 23, name: 'product 23', price: 123},
        {id: 24, name: 'product 24', price: 124},
        {id: 25, name: 'product 25', price: 125},
    ];
})
