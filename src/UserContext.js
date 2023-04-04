import React from 'react';

// create a context object
// a context as the name states us a data type of an object that can be used to store information that can be shared to other components within the app
// this is a different approach to passing information between components and allows easier access by avoiding the use of prop-drilling

const UserContext = React.createContext();

// Provider allows other components to consume/use the context object and supply the necessary information needed to the context object

export const UserProvider = UserContext.Provider;

export default UserContext;
