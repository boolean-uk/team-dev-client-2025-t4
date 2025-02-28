import { API_URL } from './constants';

async function login(email, password) {
  return await post('login', { email, password }, false);
}

async function register(email, password) {
  await post('users', { email, password }, false);
  return await login(email, password);
}

async function createProfile(userId, firstName, lastName, githubUrl, bio) {
  return await patch(`users/${userId}`, { firstName, lastName, githubUrl, bio });
}

async function getPosts() {
  const res = await get('posts');
  return res.data.posts;
}

async function getUser(id) {
  const res = await get(`users/${id}`);
  return res.data.user;
}

async function getUsers() {
  const res = await get('users');
  if (res.status === 401) {
    throw new Error('Unauthorized');
  }
  return res.data.users;
}

async function getUsersTest() {
  const res = await fetch(API_URL + '/users');
  if (res.status === 401) {
    throw new Error('Unauthorized (Likely expired token)');
  }
  return res.data.users;
}

async function post(endpoint, data, auth = true) {
  return await request('POST', endpoint, data, auth);
}

async function patch(endpoint, data, auth = true) {
  return await request('PATCH', endpoint, data, auth);
}

async function get(endpoint, auth = true) {
  return await request('GET', endpoint, null, auth);
}

async function request(method, endpoint, data, auth = true) {
  const opts = {
    headers: {
      'Content-Type': 'application/json'
    },
    method
  };

  if (method.toUpperCase() !== 'GET') {
    opts.body = JSON.stringify(data);
  }

  if (auth) {
    opts.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  }

  const response = await fetch(`${API_URL}/${endpoint}`, opts);

  // In the case of your auth token expiring, this error will be caught in posts and  trigger a LogOut.
  // This works because refreshing the page will autmatically navigate to "/" where posts
  // are fetched. (a little messy but it works (?))
  // Without this, the user would be stuck in a loop of trying to fetch posts and getting a 401.
  // without beeing able to navigate to Login to refresh their token.
  if (response.status === 401) {
    throw new Error('Unauthorized (Likely expired token)');
  }

  return response.json();
}

export { login, getPosts, getUser, getUsers, getUsersTest, register, createProfile };
