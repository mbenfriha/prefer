<?php

namespace App\Http\Controllers;

use App\Prefer;

use Laravel\Lumen\Routing\Controller as BaseController;

class Controller extends BaseController
{


    public function getRandomPrefer()
    {
        return Prefer::all()->random(1);
    }

    public function setChoice($id_prefer, $choice)
    {
        $prefer = Prefer::where([
            ['id', "=", $id_prefer],
        ])->first();
        if($choice == 1) {
            $prefer->first_vote += 1;
        }
        else {
            $prefer->second_vote += 1;
        }

        $prefer->save();

        return $prefer;
    }
}
