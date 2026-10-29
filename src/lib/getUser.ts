import { authClient } from "./auth-client";

export const getUser = async () => {
    // 1. Await the getSession promise
    const { data: session } = await authClient.getSession();
    
    // 2. Return the user object (or null if not logged in)
    return session?.user ?? null;
};