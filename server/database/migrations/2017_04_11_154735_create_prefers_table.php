<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePrefersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('prefers', function($table)
        {
            $table->engine = 'InnoDB';

            $table->increments('id')->unique();
            $table->string('first_choice');
            $table->string('second_choice');
            $table->integer('second_vote');
            $table->integer('first_vote');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('prefers');
    }
}
