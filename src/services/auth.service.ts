const isAuthenticated = () => localStorage.getItem('user') !== null;

export default { isAuthenticated };