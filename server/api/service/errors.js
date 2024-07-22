class ClientNotFoundError extends Error {
    constructor(message) {
      super(message);
      this.name = 'ClientNotFoundError';
    }
  }
  
  class ProductNotFoundError extends Error {
    constructor(message) {
      super(message);
      this.name = 'ProductNotFoundError';
    }
  }
  
  class MaterialNotFoundError extends Error {
    constructor(message) {
      super(message);
      this.name = 'MaterialNotFoundError';
    }
  }
  
  class InsufficientStockError extends Error {
    constructor(message) {
      super(message);
      this.name = 'InsufficientStockError';
    }
  }
  
  export {
    ClientNotFoundError,
    ProductNotFoundError,
    MaterialNotFoundError,
    InsufficientStockError,
  };
  