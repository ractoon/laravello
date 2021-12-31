<?php

namespace App\Listeners;

use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Events\Registered;

class AuthenticateUser
{
    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle(Registered $event)
    {
        $guard = Auth::guard(config('sanctum.guard', 'web'));
        $guard->login($event->user);
    }
}
