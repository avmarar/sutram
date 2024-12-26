import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware

const isPublicRoute = createRouteMatcher(['/api/webhook/clerk', '/api/uploadthing']);

export default clerkMiddleware(async (auth, req) => {
    if (isPublicRoute(req)) return; // if it's a public route, do nothing
    await auth.protect(); // for any other route, require auth
});

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
};
