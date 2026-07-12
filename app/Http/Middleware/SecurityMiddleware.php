<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SecurityMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // 1. Sanitize request inputs (SQL Injection, XSS, CRLF prevention)
        $input = $request->all();
        array_walk_recursive($input, function (&$value) {
            if (is_string($value)) {
                // Prevent CRLF Injection (Remove carriage return and line feed characters)
                $value = str_replace(["\r", "\n"], '', $value);

                // Prevent basic XSS (Strip HTML tags and encode special characters)
                $value = strip_tags($value);
                $value = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');

                // Extra safety: Detect SQL injection attempts in string values
                // (Flag SQL keyword injection, e.g., OR 1=1, UNION SELECT, etc.)
                if (preg_match('/(union\s+select|select\s+.*\s+from|insert\s+into|update\s+.*\s+set|delete\s+from|drop\s+table|alter\s+table|\'\s*or\s*\'?\d+\'?\s*=\s*\'?\d+)/i', $value)) {
                    // Replace or flag suspicious SQL syntax with sanitized strings
                    $value = preg_replace('/(union|select|insert|update|delete|drop|alter|or)/i', '', $value);
                }
            }
        });
        $request->merge($input);

        // 2. Proceed with the request
        $response = $next($request);

        // 3. Inject Security Headers
        $response->headers->set('X-Frame-Options', 'SAMEORIGIN');
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('X-XSS-Protection', '1; mode=block');
        $response->headers->set('Referrer-Policy', 'no-referrer-when-downgrade');
        
        // Relaxed Content Security Policy to support dashboard assets (Chart.js, Lucide, fonts)
        $response->headers->set('Content-Security-Policy', "default-src 'self' http://127.0.0.1:8000; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://unpkg.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self';");

        return $response;
    }
}
