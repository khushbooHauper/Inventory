import React, { createContext, useContext } from 'react';

interface Product {
  id: number;
  name: string;
  weight: number;
  price: number;
  quantity: number;
}

interface InventoryContextProps {
  products: Product[];
}
const defaultInventoryContext: InventoryContextProps = {
    products: [],
  };

 export const InventoryContext = createContext<InventoryContextProps>(defaultInventoryContext);

export const useInventoryContext = (): InventoryContextProps => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventoryContext must be used within an InventoryProvider');
  }
  return context;
};




interface InventoryProviderProps {
  children: React.ReactNode;
}

export const InventoryProvider: React.FC<InventoryProviderProps> = ({ children }) => {
  // Assuming you have an array of products
  const products: Product[] = [
    { id: 1, name: 'Product 1', weight: 10, price: 100, quantity: 5 },
    { id: 2, name: 'Product 2', weight: 5, price: 50, quantity: 10 },
    // ...
  ];

  const inventoryContextValue: InventoryContextProps = {
    products,
  };

  return (
    <InventoryContext.Provider value={inventoryContextValue}>
      {children}
    </InventoryContext.Provider>
  );
};


