import React, { useState } from 'react';

export const UserContext = React.createContext();
export const useUserContext = () => React.useContext(UserContext);

export function withUser(Component) {
    const UserComponent = props => (
        <UserContext.Consumer>
            {contexts => <Component {...props} {...contexts} />}
        </UserContext.Consumer>
    );
    return UserComponent;
}


const UserProvider = React.memo(({ children }) => {

    const [isLogin, setIsLogin] = useState(false);

    return (
        <UserContext.Provider
            value={{isLogin, setIsLogin}}
        >
            {children}
        </UserContext.Provider>
    )
});

export default UserProvider