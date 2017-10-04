<?php

namespace App\Http\Controllers;

use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\JWTAuth;
use Illuminate\Support\Facades\Input;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\User;

class AuthController extends Controller
{
    /**
     * @var \Tymon\JWTAuth\JWTAuth
     */
    protected $jwt;

    public function __construct(JWTAuth $jwt)
    {
        $this->jwt = $jwt;
    }

    public function loginPost(Request $request)
    {
        $this->validate($request, [
            'email'    => 'required|email|max:255',
            'password' => 'required',
        ]);

        try {
            if (! $token = $this->jwt->attempt($request->only('email', 'password'))) {
                return response()->json(['user_not_found'], 404);
            }
        } catch (TokenExpiredException $e) {
            return response()->json(['token_expired'], $e->getStatusCode());
        } catch (TokenInvalidException $e) {
            return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (JWTException $e) {
            return response()->json(['token_absent' => $e->getMessage()], $e->getStatusCode());
        }

        $user = User::where('email', $request->email)->firstOrFail();

        return response()->json(compact('token', 'user'));
    }

    public function facebookLogin(Request $request) {

    }

    public function registerPost()
    {

        $messages = [
            'required'  => 'Le champ :attribute est requis.',
            'unique'    => ":attribute est déjà pris",
            'email'     => "L'email n'est pas une adresse mail valide"
        ];

        $rules = [
            'email'     => 'required|email|unique:users|max:255',
            'username'  => 'required|unique:users|string',
            'password'  => 'required|string',
            'birthdate' => 'required|date'
        ];

        $validator = Validator::make(Input::all(), $rules, $messages);

        if($validator->fails()){
            return response()->json(['error' => true, 'message' => $validator->errors()]);
        }


        $age = intval(date('Y', time() - strtotime(Input::get('birthdate')))) - 1970;
        $adult = $age >= 18 ? true : false;

        try{
            $user = new User();
            $user->email = Input::get('email');
            $user->username = Input::get('username');
            $user->birthdate = Input::get('birthdate');
            $user->adult = $adult;
            $user->password = app('hash')->make(Input::get('password'));
            $user->save();
            return response()->json($user);
        }
        catch(\Exception $e){
            return response()->json(["error" => true, "message" => $e]);
        }


    }
}