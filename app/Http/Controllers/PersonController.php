<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use app\Models\User;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use PHPUnit\Framework\TestStatus\Notice;

class PersonController extends Controller
{
    function index()
    {
        $users = User::all();
        return  Inertia::render('personas', [
            'users' => $users
        ]);
    }

}
