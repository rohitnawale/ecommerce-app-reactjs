/*
 Common functions which are used among various components are defined here
*/

//common function to update state in redux 

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};
