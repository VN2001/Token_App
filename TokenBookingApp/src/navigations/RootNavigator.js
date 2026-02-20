  import React, { useContext } from "react";
  import { NavigationContainer } from "@react-navigation/native";
  import { AuthContext } from "../context/AuthContext";

  import AuthNavigator from "./AuthNavigator";
  import UserNavigator from "./UserNavigator";
  import AdminNavigator from "./AdminNavigator";

  const RootNavigator = () => {
    const { user } = useContext(AuthContext);

    return (
      <NavigationContainer>
        {!user ? (
          <AuthNavigator />
        ) : user.role === "admin" ? (
          <AdminNavigator />
        ) : (
          <UserNavigator />
        )}
      </NavigationContainer>
    );
  };

  export default RootNavigator;
