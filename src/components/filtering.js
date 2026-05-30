export function initFiltering(elements) {
    const updateIndexes = (filterElements, indexes) => {
        Object.keys(indexes).forEach((elementName) => {
            filterElements[elementName].append(...Object.values(indexes[elementName]).map((name) => {
                const option = document.createElement('option');
                option.value = name;
                option.textContent = name;
                return option;
            }));
        });
    };

    const applyFiltering = (query, state, action) => {
        if (action?.name === 'clear') {
            const field = action.dataset.field;
            const input = action.parentElement.querySelector('input');

            if (input) {
                input.value = '';
            }

            state[field] = '';
        }

        const filter = {};
        Object.keys(elements).forEach((key) => {
            if (elements[key] && ['INPUT', 'SELECT'].includes(elements[key].tagName) && elements[key].value) {
                filter[`filter[${elements[key].name}]`] = elements[key].value;
            }
        });

        return Object.keys(filter).length ? Object.assign({}, query, filter) : query;
    };

    return {
        updateIndexes,
        applyFiltering
    };
}
