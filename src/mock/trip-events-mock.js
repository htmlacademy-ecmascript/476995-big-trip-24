import { getRandomValuesFromArray } from '../utils/general';

const tripEvents = [
  {
    id: 'b1cadf0d-0a40-4d40-badc-ac7dcbbf68e6',
    basePrice: 8579,
    dateFrom: '2024-09-24T06:37:09.899Z',
    dateTo: '2024-09-24T13:03:09.899Z',
    destination: '039f3178-3015-46b2-a395-fa26efb2015c',
    isFavorite: true,
    offers: [],
    type: 'sightseeing'
  },
  {
    id: '039ca718-6f6a-4157-a18c-62b32258d6c9',
    basePrice: 1294,
    dateFrom: '2024-09-25T18:41:09.899Z',
    dateTo: '2024-09-27T09:05:09.899Z',
    destination: '3a3146cf-f88f-4d1e-8bed-7eb6cef145c8',
    isFavorite: true,
    offers: [
      'dec3c29a-c5ad-4388-b49c-c1f1455f0d03',
      '2019ab0e-4e4e-4252-b9c0-d3a9f4db2923',
      'b2006f18-828a-47e7-8b36-48560d825b83'
    ],
    type: 'bus'
  },
  {
    id: 'd4f695f9-3359-4b57-8149-5d4644517bfc',
    basePrice: 1619,
    dateFrom: '2024-09-28T15:57:09.899Z',
    dateTo: '2024-09-29T03:09:09.899Z',
    destination: 'e2ddfcc3-a9b8-4db6-a811-a3828d2a829c',
    isFavorite: true,
    offers: [
      '71ae9618-d5a0-4d77-9d13-7f26805e176c'
    ],
    type: 'drive'
  },
  {
    id: '500e85e9-0224-4039-ac21-a16e83a0d279',
    basePrice: 6096,
    dateFrom: '2024-09-30T12:44:09.899Z',
    dateTo: '2024-10-01T12:11:09.899Z',
    destination: '7aa8ddd3-9ebe-45cf-8456-5377802ac252',
    isFavorite: false,
    offers: [
      'b8529b05-414e-414f-98c4-fc46a0a36ef8',
      'ac05e5bb-729e-41c4-b1cf-71087cd46806'
    ],
    type: 'flight'
  },
  {
    id: 'cb71bbf6-98f5-4580-9b43-167e14e70779',
    basePrice: 3295,
    dateFrom: '2024-10-03T06:31:09.899Z',
    dateTo: '2024-10-04T03:00:09.899Z',
    destination: '363aa35f-8cee-48da-9ff8-6d0d6c54d9b0',
    isFavorite: true,
    offers: [
      'fc347484-63f4-4b73-9dcd-805ad2192d1e',
      'f2c35098-c7cc-4870-81f8-24bbcbbd2eec',
      '0c3d09c7-3750-4ae0-89f0-b405e76ad1ed'
    ],
    type: 'train'
  },
  {
    id: '48f4467e-3109-4ce1-8f36-34b4a4e4bea0',
    basePrice: 3850,
    dateFrom: '2024-10-04T13:18:09.899Z',
    dateTo: '2024-10-06T11:45:09.899Z',
    destination: '5052c42d-c848-4f5a-bc0e-1c7a9159b55b',
    isFavorite: true,
    offers: [],
    type: 'drive'
  },
  {
    id: '33269add-6244-44e0-879f-7e5fa3b4098c',
    basePrice: 9841,
    dateFrom: '2024-10-07T20:59:09.899Z',
    dateTo: '2024-10-08T03:18:09.899Z',
    destination: '363aa35f-8cee-48da-9ff8-6d0d6c54d9b0',
    isFavorite: false,
    offers: [],
    type: 'sightseeing'
  },
  {
    id: 'f85bb454-d5d2-4b5d-a7c9-a36fcd411dc2',
    basePrice: 5566,
    dateFrom: '2024-10-08T14:35:09.899Z',
    dateTo: '2024-10-09T18:25:09.899Z',
    destination: '238dfde9-12df-43f3-ae52-52145715e238',
    isFavorite: false,
    offers: [
      'c2eae7b6-f4af-4a00-a4fe-f8a34e275ed3',
      'b8529b05-414e-414f-98c4-fc46a0a36ef8',
      'ac05e5bb-729e-41c4-b1cf-71087cd46806'
    ],
    type: 'flight'
  },
  {
    id: '298b1598-1efd-46c0-b4f4-fe617a588f17',
    basePrice: 3925,
    dateFrom: '2024-10-10T07:54:09.899Z',
    dateTo: '2024-10-11T03:40:09.899Z',
    destination: '3a3146cf-f88f-4d1e-8bed-7eb6cef145c8',
    isFavorite: false,
    offers: [
      '954cc84d-7283-482a-8b23-67924764294f',
      '9e299604-2f87-45dc-95e9-1edbfd566ab1',
      '82528155-38b1-42dd-ba2d-93f78fec7c89'
    ],
    type: 'taxi'
  },
  {
    id: '1c58d280-5de8-46d6-8b26-945b4ceb6d28',
    basePrice: 9639,
    dateFrom: '2024-10-11T21:56:09.899Z',
    dateTo: '2024-10-13T18:38:09.899Z',
    destination: 'e2ddfcc3-a9b8-4db6-a811-a3828d2a829c',
    isFavorite: false,
    offers: [
      '2019ab0e-4e4e-4252-b9c0-d3a9f4db2923',
      'b2006f18-828a-47e7-8b36-48560d825b83'
    ],
    type: 'bus'
  },
  {
    id: '3fd73361-6b5b-40a4-bc75-7fa351370050',
    basePrice: 6519,
    dateFrom: '2024-10-14T18:03:09.899Z',
    dateTo: '2024-10-16T14:40:09.899Z',
    destination: '5052c42d-c848-4f5a-bc0e-1c7a9159b55b',
    isFavorite: true,
    offers: [
      '71ae9618-d5a0-4d77-9d13-7f26805e176c'
    ],
    type: 'drive'
  },
  {
    id: '410db4ab-5a00-40bf-92e4-6a1dc8c22954',
    basePrice: 2504,
    dateFrom: '2024-10-18T10:17:09.899Z',
    dateTo: '2024-10-20T01:42:09.899Z',
    destination: 'd01a72e9-087f-4837-a146-ba6a1709ac22',
    isFavorite: true,
    offers: [
      '207e3e47-7a57-4a7d-905b-5d560ec30d59'
    ],
    type: 'restaurant'
  },
  {
    id: '6a1841e7-2879-4816-8a86-3abea10fd1ba',
    basePrice: 2636,
    dateFrom: '2024-10-21T13:41:09.899Z',
    dateTo: '2024-10-22T19:07:09.899Z',
    destination: '579b75cd-c26b-43eb-a3f9-d153690db8b9',
    isFavorite: true,
    offers: [
      'fb921a7a-4c6b-4aa2-9059-77b60e347ece',
      '71ae9618-d5a0-4d77-9d13-7f26805e176c'
    ],
    type: 'drive'
  },
  {
    id: '20d0cac6-002a-4b75-b1d1-ad4443b8dea3',
    basePrice: 7577,
    dateFrom: '2024-10-24T03:58:09.899Z',
    dateTo: '2024-10-24T18:52:09.899Z',
    destination: '579b75cd-c26b-43eb-a3f9-d153690db8b9',
    isFavorite: true,
    offers: [
      '954cc84d-7283-482a-8b23-67924764294f',
      '9e299604-2f87-45dc-95e9-1edbfd566ab1',
      '82528155-38b1-42dd-ba2d-93f78fec7c89'
    ],
    type: 'taxi'
  },
  {
    id: '121f581c-c827-4159-b468-590d76c94d50',
    basePrice: 9617,
    dateFrom: '2024-10-26T07:48:09.899Z',
    dateTo: '2024-10-27T17:42:09.899Z',
    destination: '363aa35f-8cee-48da-9ff8-6d0d6c54d9b0',
    isFavorite: true,
    offers: [
      'fb921a7a-4c6b-4aa2-9059-77b60e347ece',
      '71ae9618-d5a0-4d77-9d13-7f26805e176c'
    ],
    type: 'drive'
  },
  {
    id: 'b63aeac1-1021-4a0b-b2a5-25ff53849f02',
    basePrice: 2211,
    dateFrom: '2024-10-28T01:29:09.899Z',
    dateTo: '2024-10-29T02:17:09.899Z',
    destination: '238dfde9-12df-43f3-ae52-52145715e238',
    isFavorite: false,
    offers: [
      'b8529b05-414e-414f-98c4-fc46a0a36ef8',
      'ac05e5bb-729e-41c4-b1cf-71087cd46806'
    ],
    type: 'flight'
  },
  {
    id: 'fbb56df9-752c-49d3-bd57-b97b024fdf6f',
    basePrice: 5769,
    dateFrom: '2024-10-29T10:56:09.899Z',
    dateTo: '2024-11-01T07:00:09.899Z',
    destination: '5052c42d-c848-4f5a-bc0e-1c7a9159b55b',
    isFavorite: true,
    offers: [
      '9f523857-6d81-489c-8ec3-41dc9c67c01d',
      '0416f625-1e61-4088-a7ea-b2f1f6769268',
      '954cc84d-7283-482a-8b23-67924764294f',
      '9e299604-2f87-45dc-95e9-1edbfd566ab1',
      '82528155-38b1-42dd-ba2d-93f78fec7c89'
    ],
    type: 'taxi'
  },
  {
    id: '04989fc8-256f-480a-94f0-a4f838679571',
    basePrice: 8717,
    dateFrom: '2024-11-01T20:10:09.899Z',
    dateTo: '2024-11-02T18:58:09.899Z',
    destination: '039f3178-3015-46b2-a395-fa26efb2015c',
    isFavorite: false,
    offers: [
      'b2006f18-828a-47e7-8b36-48560d825b83'
    ],
    type: 'bus'
  },
  {
    id: '8e1aa189-4465-4879-b2d4-9af992b5f2f6',
    basePrice: 7400,
    dateFrom: '2024-11-04T07:15:09.899Z',
    dateTo: '2024-11-04T21:29:09.899Z',
    destination: 'd01a72e9-087f-4837-a146-ba6a1709ac22',
    isFavorite: true,
    offers: [
      'e71488f0-af79-4c1d-b864-cf07ce0d9ee4',
      '52ceefd8-2c4f-4620-9465-44ced8a5693c',
      'fbd3d2b4-1cf5-4b47-b210-c0e11f6f5b0b',
      'f30d0ade-6e37-4627-88e6-c6819e1730a6'
    ],
    type: 'check-in'
  },
  {
    id: '2632161e-97cf-48a0-9be3-595616d88d5c',
    basePrice: 7898,
    dateFrom: '2024-11-05T11:49:09.899Z',
    dateTo: '2024-11-06T05:52:09.899Z',
    destination: '7aa8ddd3-9ebe-45cf-8456-5377802ac252',
    isFavorite: false,
    offers: [],
    type: 'flight'
  },
  {
    id: '930f9fcf-e159-4fcb-8962-6712810b9f23',
    basePrice: 4863,
    dateFrom: '2024-11-06T15:34:09.899Z',
    dateTo: '2024-11-07T01:25:09.899Z',
    destination: 'e2ddfcc3-a9b8-4db6-a811-a3828d2a829c',
    isFavorite: true,
    offers: [
      'fc347484-63f4-4b73-9dcd-805ad2192d1e',
      'f2c35098-c7cc-4870-81f8-24bbcbbd2eec',
      '0c3d09c7-3750-4ae0-89f0-b405e76ad1ed'
    ],
    type: 'train'
  },
  {
    id: 'c3e4b350-468a-4eec-ab73-1435a546d8d7',
    basePrice: 4723,
    dateFrom: '2024-11-09T01:48:09.899Z',
    dateTo: '2024-11-10T07:43:09.899Z',
    destination: 'e2ddfcc3-a9b8-4db6-a811-a3828d2a829c',
    isFavorite: false,
    offers: [
      'fe102690-c3f7-4620-9eed-1be6e5515bb1',
      '98dc10ed-69b8-4829-811e-b8c89f220e90',
      '4859058d-caa6-4747-be06-c31841f6f8dd',
      '1807bf59-1021-41a2-a409-155962017348',
      '56b06cbf-bbef-45cc-bedf-04175e6e0d8f'
    ],
    type: 'ship'
  },
  {
    id: '353ffc64-8044-4c8f-88cb-e47384ed5a45',
    basePrice: 5216,
    dateFrom: '2024-11-11T15:29:09.899Z',
    dateTo: '2024-11-12T23:28:09.899Z',
    destination: '039f3178-3015-46b2-a395-fa26efb2015c',
    isFavorite: false,
    offers: [
      '954cc84d-7283-482a-8b23-67924764294f',
      '9e299604-2f87-45dc-95e9-1edbfd566ab1',
      '82528155-38b1-42dd-ba2d-93f78fec7c89'
    ],
    type: 'taxi'
  },
  {
    id: '7ebdbfca-fd79-4640-ba35-0634411d85a1',
    basePrice: 8413,
    dateFrom: '2024-11-14T16:23:09.899Z',
    dateTo: '2024-11-16T05:52:09.899Z',
    destination: '7aa8ddd3-9ebe-45cf-8456-5377802ac252',
    isFavorite: false,
    offers: [
      '71ae9618-d5a0-4d77-9d13-7f26805e176c'
    ],
    type: 'drive'
  },
  {
    id: '43354479-9800-4463-bbec-646c32e4c673',
    basePrice: 6061,
    dateFrom: '2024-11-17T03:51:09.899Z',
    dateTo: '2024-11-18T04:57:09.899Z',
    destination: 'd01a72e9-087f-4837-a146-ba6a1709ac22',
    isFavorite: false,
    offers: [
      'b2006f18-828a-47e7-8b36-48560d825b83'
    ],
    type: 'bus'
  }
];

const getRandomMockTripEvents = (amount = 1) => getRandomValuesFromArray(tripEvents, amount);

export { getRandomMockTripEvents };
