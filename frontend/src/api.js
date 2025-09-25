const BASE_URL = process.env.REACT_APP_API_URL;

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });

  let data = null;
  try { data = await res.json(); } catch (_) {}

  if (!res.ok) {
    const msg = (data && data.error) || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

// list patient
export function listPatients() {
  return request('/api/patients');
}

// get orders by patient
export function listOrders(patientId) {
  return request(`/api/patients/${patientId}/orders`);
}

// create order
export function createOrder(patientId, message) {
  return request('/api/orders', {
    method: 'POST',
    body: JSON.stringify({ patientId, message }),
  });
}

// modify order
export function updateOrder(id, message) {
  return request(`/api/orders/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ message }),
  });
}
