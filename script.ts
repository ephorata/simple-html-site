// Debounce utility
const debounce = (callback: (...args: any[]) => void, delay: number): (...args: any[]) => void => {
    let timer: NodeJS.Timeout | null = null;
    return (...args: any[]) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => callback(...args), delay);
    };
};

// Function to fetch search suggestions using fetch
const fetchSuggestions = async (query: string): Promise<string[]> => {
    const url = `http://localhost:3001/search?query=${encodeURIComponent(query)}`;

    console.log(`Request: GET ${url}`);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = (await response.json()) as { name: string }[];
        console.log('Response:', data);
        return data.map((item) => item.name);
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        return [];
    }
};


// Function to render suggestions to the UI
const renderSuggestions = (suggestions: string[], query: string): void => {
    const resultsContainer = document.getElementById('results');
    if (resultsContainer) {
        if (!query) {
            resultsContainer.innerHTML = ''; // Clear suggestions if the query is empty
        } else {
            resultsContainer.innerHTML = suggestions.length
                ? suggestions.map((name) => `<li class="result-item">${name}</li>`).join('')
                : '<li class="no-results">No results found</li>'; // Show "No results found" if no suggestions
        }
    }
};

// Initialize search functionality
const initializeSearch = (): void => {
    const searchInput = document.getElementById('search-input') as HTMLInputElement | null;

    if (!searchInput) {
        console.warn('Search input element not found');
        return;
    }

    searchInput.addEventListener(
        'keyup',
        debounce(async (e: KeyboardEvent) => {
            const query = (e.target as HTMLInputElement).value.trim();
            console.log(query);

            if (!query) {
                renderSuggestions([],''); // Clear suggestions on empty input
                return;
            }

            const suggestions = await fetchSuggestions(query);
            renderSuggestions(suggestions,query);
        }, 300) // 300ms debounce delay
    );
};

// Run the search initialization on page load
initializeSearch();
