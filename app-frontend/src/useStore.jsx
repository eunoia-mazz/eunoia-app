import { create } from "zustand";

const useStore = create((set) => ({
  token: localStorage.getItem("token") || null,
  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },

  clientId: localStorage.getItem("clientId") || null,
  setClientId: (clientId) => {
    localStorage.setItem("clientId", clientId);
    set({ clientId });
  },

  firstName: localStorage.getItem("firstName") || "",
  setFirstName: (firstName) => {
    localStorage.setItem("firstName", firstName);
    set({ firstName });
  },

  lastName: localStorage.getItem("lastName") || "",
  setLastName: (lastName) => {
    localStorage.setItem("lastName", lastName);
    set({ lastName });
  },

  isAdmin: JSON.parse(localStorage.getItem("isAdmin")) || false,
  setIsAdmin: (isAdmin) => {
    localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
    set({ isAdmin });
  },
  currentChatId: null,
  setCurrentChatId: (currentChatId) => set({ currentChatId }),

  currentChat: [],
  setCurrentChat: (currentChat) => set({ currentChat }),

  addNewMessage: (newMessage) =>
    set((state) => ({ currentChat: [...state.currentChat, newMessage] })),

  clearUserData: () => {
    localStorage.clear();
    set({
      token: null,
      clientId: null,
      firstName: "",
      lastName: "",
      isAdmin: false,
      currentChatId: null,
      currentChat: [],
    });
  },
}));

export default useStore;
