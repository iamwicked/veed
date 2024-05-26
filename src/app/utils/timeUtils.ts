export function formatTime(seconds: number) {
    const date = new Date(0);
    date.setSeconds(seconds);
    return date.toISOString().substring(14, 19); // Returns hh:mm:ss format
}
