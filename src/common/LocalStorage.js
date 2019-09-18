export const loadFromLocalStorage = () => {
    try {
      const serializedState = localStorage.getItem("state");
      if (serializedState === null) {
        return null;
      }
  
      return JSON.parse(serializedState);
    } catch (e) {
      return null;
    }
  };

  export const saveToLocalStorage = state => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("state", serializedState);
    } catch (e) {
      console.log("Could not save state");
    }
  };

  export const deleteFromLocalStorage = () => {
    try{
      localStorage.removeItem('state');
    }catch(e){
      console.log('Couldn`t delete state')
    }
  }
  
  