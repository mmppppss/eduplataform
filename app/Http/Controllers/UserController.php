<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class UserController extends Controller
{
    function index()
    {
        $users = User::all();
        return  Inertia::render('listas', [
            'users' => $users
        ]);
    }

    function reports()
    {
        $users = User::all();
        return  Inertia::render('reportes', [
            'users' => $users
        ]);
    }
}
