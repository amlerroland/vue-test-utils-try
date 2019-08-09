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

    test('displays the correct pagination', async () => {
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

    let generateProducts = () => {
        let products = [];

        for (let index = 1; index <= 100; index++) {
            products.push({id: index, name: `product ${index}`, price: 100 + index});
        }

        return products;
    }

    let products = generateProducts();
})
