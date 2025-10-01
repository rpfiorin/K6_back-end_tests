export const BULK = {
  vu: 1,
  time: '12s',
};

export const LIMITS = {
  // Define criterios de êxito
  req_duration: ['p(95)<2000'],
  req_failed: ['rate<0.01']
}