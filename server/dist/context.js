export function createContext({ req }) {
    return {
        requestId: req.header("x-request-id") ?? null,
    };
}
