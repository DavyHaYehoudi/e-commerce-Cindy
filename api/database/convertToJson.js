// Conversion au format json des mocks
import { writeFileSync } from 'fs';
import { clientsMock } from '../mocks/clientsMock.js';
import { ordersMock } from '../mocks/ordersMock.js';
import { productsByOrderMock } from '../mocks/productsByOrderMock.js';
import { productMock } from '../mocks/productMock.js';
import { creditMock } from '../mocks/creditMock.js';

const jsonDataClients = JSON.stringify(clientsMock, null, 2);
const jsonDataOrders = JSON.stringify(ordersMock, null, 2);
const jsonDataProductsByOrderMock = JSON.stringify(productsByOrderMock, null, 2);
const jsonDataProductMock = JSON.stringify(productMock, null, 2);
const jsonDataCreditMock = JSON.stringify(creditMock, null, 2);

// writeFileSync('clientsMock.json', jsonDataClients);
// writeFileSync('ordersMock.json', jsonDataOrders);
// writeFileSync('productsByOrderMock.json', jsonDataProductsByOrderMock);
// writeFileSync('productMock.json', jsonDataProductMock);
// writeFileSync('creditMock.json', jsonDataCreditMock);
console.log('Conversion terminée. Le fichier mock.json a été créé.');