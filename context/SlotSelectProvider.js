import React, { createContext, useState, useEffect } from "react";

export const SlotContext = createContext()

const SlotSelectProvider = ({children}) => {
  return (
    <SlotContext.Provider>
         {{ children }}
    </SlotContext.Provider>
  );
};

export default SlotSelectProvider;
