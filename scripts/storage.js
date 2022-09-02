"use strict";

// Get from local storage
const getFromStorage = (key) => {
  return JSON.parse(localStorage.getItem(key)) || [];
};

// Remove from local storage
const removeFromStorage = (key) => {
  localStorage.removeItem(key);
};

// Save to local storage
const saveToStorage = (key, val) => {
  localStorage.setItem(key, JSON.stringify(val));
};
