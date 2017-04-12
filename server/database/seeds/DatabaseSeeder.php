<?php

use App\Prefer;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $prefers = [
            ["first_choice" => "Le chocolat", "second_choice" => "La fraise"],
            ["first_choice" => "Lire des livres", "second_choice" => "Regarder des films"],
            ["first_choice" => "Batman", "second_choice" => "Superman"],
        ];

        foreach($prefers as $prefer)
            Prefer::create($prefer);
    }
}
