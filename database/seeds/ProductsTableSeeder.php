<?php

use App\Product;
use Faker\Generator as Faker;
use Illuminate\Database\Seeder;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = new Faker;

        for ($i = 0; $i < 100; $i++) {
            factory(Product::class)->create([
                'name' => 'product' . ($i + 1),
            ]);
        }
    }
}
