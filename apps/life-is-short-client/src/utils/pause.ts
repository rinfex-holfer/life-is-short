export function pause(ms: number): Promise<void> {
    return new Promise(res => {
        setTimeout(res, ms);
    });
}
