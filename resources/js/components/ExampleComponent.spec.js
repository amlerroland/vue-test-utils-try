import { mount } from '@vue/test-utils'
import moxios from 'moxios';
import ExampleComponent from './ExampleComponent.vue'

describe('ExampleComponent', () => {
    beforeEach(function () {
        // import and pass your custom axios instance to this method
        moxios.install()
    })

    afterEach(function () {
        // import and pass your custom axios instance to this method
        moxios.uninstall()
    })

    test('displays the product list', () => {
        const wrapper = mount(ExampleComponent);

        moxios.stubRequest('/api/products', {
            status: 200,
            response: {
                products: [
                    {id: 1, name: 'product1', price: 100},
                ]
            }
        });

        expect(wrapper.find('.products').exists()).toBe(true);

        expect(wrapper.find('.product').exists()).toBe(true);
    })
})
