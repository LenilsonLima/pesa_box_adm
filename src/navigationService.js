let navigateFunction = null;

export const setNavigate = (navigate) => {
    navigateFunction = navigate;
};

export function navigate(path, params) {
    if (navigateFunction) {
        navigateFunction(path, params);
    }
}