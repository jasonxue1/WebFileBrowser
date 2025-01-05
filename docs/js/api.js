export async function loadFiles() {
    const response = await fetch('./files.json');
    if (!response.ok) throw new Error('Failed to load files.json');
    return response.json();
}